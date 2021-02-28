import React, {useRef} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {TimeSpanPickerWrapper} from "./TimePickerWrapper";
import axios from "axios";
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {saveState} from "../LocalStorage";
import {HttpUrls, StorageKeys} from "../../constants";
import {getReduxData} from "@funcUtils/getReduxData";
import {ReducerAutomationState} from "@redux/modules/ControlAutomation";
import SettingExplanation from "./SettingExplanation";
import {RangeSlider} from "./RangeSlider";
import AutoSwitchWrapper from "./AutoSwitchWrapper";
import {AvailableMachines} from "@interfaces/main";
import '@styles/components/automation_stepper.scss';
import {currentUser} from "@funcUtils/currentUser";

const autoSwitchDisable = (index: number, len: number) => {
    return index === 0 || index === len -1;
}

const getLabels = (steps: string[], translationTable: Record<string,string>) => {
  return steps.map((step, index) => {
    if(index === 0){ return '현재 설정' }
    else if(index === steps.length - 1){ return '적용' }
    else { return `${translationTable[step]}` }
  });
}

export interface TaskNextButtonRef {
  handleNextStep: () => void
}
export interface CustomStepperProp {
  modalClose: () => void;
}
export default function CustomStepper({modalClose}: CustomStepperProp): JSX.Element {
  const {Translations} = require('../../values/translations')
  const machines: string[] = getReduxData(StorageKeys.MACHINE);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps: string[] = ['head',...machines, 'tail'];
  const labels: string[] = getLabels(steps, Translations);
  const nextButtonRef = useRef<TaskNextButtonRef>(null);

  const stepperComponents: Record<string, JSX.Element> = {
    'head' : <SettingExplanation key={'head'} position={'head'} />,
    'led' : <RangeSlider key={'led'} machine={'led'} ref={nextButtonRef} />,
    'heater' : <RangeSlider key={'heater'} machine={'heater'} ref={nextButtonRef} />,
    'cooler' : <RangeSlider key={'cooler'} machine={'cooler'} ref={nextButtonRef} />,
    'fan' : <TimeSpanPickerWrapper key={'fan'} machine={'fan'} outerSize={150} ref={nextButtonRef} />,
    'waterpump' : <TimeSpanPickerWrapper key={'waterpump'} machine={'waterpump'} outerSize={150} ref={nextButtonRef} />,
    'tail' : <SettingExplanation key={'tail'} position={'tail'} />,
  }

  function StepperRenderer (): JSX.Element {
    return (
      <Stepper className='stepper' activeStep={activeStep} alternativeLabel>
          {labels.map((label: string) => (
            <Step key={label}>
              <StepLabel classes={{
                alternativeLabel: 'alternativeLabel',
                active : 'active',
                completed : 'completed',
                iconContainer : 'iconContainer',
              }} StepIconProps={{
                classes : {
                  active : 'iconActive',
                  completed : 'iconCompleted',
                }
              }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
    )
  }

  function ContentRenderer({children}: any): JSX.Element {
    return (
      <div>
        <div className='content'>
          {stepperComponents[steps[activeStep]]}
        </div>
        <div className='content-bottom'>
          {children}
        </div>
      </div>
    )
  }

  function AutoSwitch (): JSX.Element {
    return (
      <div className='auto-switch-wrapper' >
          {autoSwitchDisable(activeStep, steps.length)
            ? null
            : <FormControlLabel
              value=""
              control={
                <AutoSwitchWrapper
                  key={steps[activeStep]}
                  machine={steps[activeStep] as AvailableMachines} /> }
              label=""
              labelPlacement="top"
              classes={{ label:'button-label' }}
            />
          }
      </div>
    )
  }

  function NextSaveButton (): JSX.Element {
    function handleNext () {
      setActiveStep((prevActiveStep) => ++prevActiveStep );
      if ( nextButtonRef.current !== null ) {
        nextButtonRef.current.handleNextStep();
      }
    }

    const handleApply = async () => {
      const controlledBy: string = currentUser() as string;
      const automationsDto: ReducerAutomationState = getReduxData(StorageKeys.AUTO);
      saveState(StorageKeys.AUTO, automationsDto);
      await axios.post(`${HttpUrls.AUTOMATION_CREATE}/${controlledBy}`, automationsDto)
        .then(()=>{
          modalClose();
        })
    };

    return (
      <>
      {activeStep === steps.length - 1
        ? (<Button className='next-button' onClick={handleApply}>
          저장
          </Button>)
        : (<Button className='next-button' onClick={handleNext}>
          다음
          </Button>)}
      </>
      )
  }

  function BackButton (): JSX.Element {
    const handleBack = () => {
      setActiveStep((prevActiveStep) => --prevActiveStep );
    };
    return (
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className='back-button'
      >
        뒤로
      </Button>
    )
  }

  function CloseIconButton (): JSX.Element {
    return (
      <div className='close-icon-wrapper'>
        <CloseIcon
          onClick={modalClose}
          className='close-icon' />
      </div>
    )
  }

  return (
    <div className='stepper-root'>
      <div className='wrapper'>
        <CloseIconButton />
        <StepperRenderer />
        <ContentRenderer>
            <BackButton />
            <AutoSwitch />
            <NextSaveButton />
        </ContentRenderer>
      </div>
    </div>
  );
}

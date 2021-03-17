import React, {useEffect, useState} from 'react';
import AppBar from '@components/AppBar/Appbar';
import {checkLogin} from "@funcUtils/checkLogin";
import {Redirect} from "react-router-dom";
import {Grid} from "@material-ui/core";
import SwitchController from "../components/SwitchController";
import {useDispatch} from "react-redux";
import {saveAutomation} from "@redux/modules/ControlAutomation";
import { ResponseAutomationRead} from "@interfaces/Automation";
import {ResponseSwitchesReadLast} from "@interfaces/Switch";
import {ReducerSaveSwitchesDto, saveSwitch} from "@redux/modules/ControlSwitch";
import {saveMachines} from "@redux/modules/ControlMachine";
import {groupBy} from "../utils/groupBy";
import '../styles/layouts/dashboard.scss';
import CCTV from "@components/CCTV";
import MachineHistory from "@components/MachinesHistory";
import StatusDisplay from "@components/StatusDisplay";
import {currentPage} from "@funcUtils/currentPage";
import EnvironmentsHistoryComponent from "@components/EnvironmentsHistroy";
import {ResponseEnvSectionRead, ResponseMachineRead} from "@interfaces/Machine";
import {saveSections} from "@redux/modules/ControlSection";
import {Loader} from "@compUtils/Loader";
import {Environments} from "../reference/environments";
import {Environment} from "@interfaces/Environment.class";
import {
  getAutomation,
  getAvailableMachines,
  getAvailableSections, getLastAllEnvironments,
  getLastEnvironment,
  getSwitches
} from "../handler/httpHandler";
import {ReducerEnvironmentDto, saveEnvironment} from "@redux/modules/ControlEnvironment";
import useChangeEnvironmentStatus from "@hooks/useChangeEnvironmentStatus";

interface DashboardProps {
  page: string;
}

export default function Dashboard({page}: DashboardProps) {
  const dispatch = useDispatch();

  const [machineLoaded, setMachineLoaded] = useState(false);
  const [sectionLoaded, setSectionLoaded] = useState(false);
  const [switchLoaded, setSwitchLoaded] = useState(false);
  const [automationLoaded, setAutomationLoaded] = useState(false);
  const [environmentLoaded, setEnvironmentLoaded] = useState(false);

  const [eSections, setESections] = useState<string[]>([]);
  const environments = new Environments().getEnvironments();
  const machineSection: string = currentPage();

  useEffect(() => {
    getAvailableMachines(machineSection)
      .then(({data}) => {
        dispatch( saveMachines(data as ResponseMachineRead[]) )
        setMachineLoaded(true)
      })

    getAvailableSections(machineSection)
      .then(({data}) => {
        dispatch( saveSections( data as ResponseEnvSectionRead[] ) );
        const sections: string[] = data.map((m: ResponseEnvSectionRead) => {
          return m.e_section;
        })
        setESections(sections)
        setSectionLoaded(true)
        }
      )

    getLastAllEnvironments(machineSection)
      .then(({data}) => {
        dispatch( saveEnvironment( data ))
        setEnvironmentLoaded(true);
      }
    )

    getSwitches(machineSection)
      .then(({data}) => {
          const grouped: ReducerSaveSwitchesDto = groupBy(data as ResponseSwitchesReadLast[], 'machine');
          dispatch( saveSwitch(grouped) )
          setSwitchLoaded(true)
        }
      )

    getAutomation(machineSection)
      .then(({data}) => {
          const {lastAutomations}: ResponseAutomationRead = data;
          const groupedAutomations = groupBy(lastAutomations, 'machine');
          dispatch( saveAutomation( groupedAutomations ) );
          setAutomationLoaded(true)
        }
      )

    return () => {
      setMachineLoaded(false);
      setSwitchLoaded(false);
      setAutomationLoaded(false);
      setSectionLoaded(false);
      setEnvironmentLoaded(false);
    }
  }, [ dispatch, machineSection ]);

  return (
    checkLogin()
      ? machineLoaded && sectionLoaded && automationLoaded && switchLoaded && environmentLoaded
        ? <div className='dashboard-root'>
            <AppBar page={page}/>
            <Grid container className='grid-container'>
              <Grid item xs={12} sm={12} md={4} className='item'>
                <SwitchController/>
              </Grid>
              <Grid item xs={12} sm={12} md={4} className='cctv-item'>
                <CCTV/>
              </Grid>
              <Grid item xs={12} sm={12} md={4} className='item'>
                <MachineHistory/>
              </Grid>
              {eSections.map((section: string) => {
                return(
                  <Grid key={section} item xs={12} sm={12} md={4} className='status-display-item' >
                    <StatusDisplay environmentSection={section} />
                  </Grid>)
                })}
              {environments.map((environment: typeof Environment) => {
                const name = new environment().name;
                return (
                  <Grid key={name} item xs={12} sm={12} md={12} lg={4} xl={4}  className='item' >
                    <EnvironmentsHistoryComponent environment={name} />
                  </Grid>)
                })}
            </Grid>
          </div>
        : <Loader />
      : <Redirect to='/'/>
  )
}

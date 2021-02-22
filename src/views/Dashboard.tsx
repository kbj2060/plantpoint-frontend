import React from 'react';
import AppBar from '../components/AppBar/appbar';
import {CheckLogin} from "../utils/CheckLogin";
import {Redirect} from "react-router-dom";
import {Grid} from "@material-ui/core";
import SwitchController from "../components/SwitchController";
import '../styles/layouts/dashboard.scss';

/*
const timezone = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
*/

type DashboardProps = {
  page: string;
}

export default function Dashboard({page}: DashboardProps) {
/*
  const {environments, sections, machines} = require('root/values/preferences.json')
  const {auto:defaultSetting, switches:defaultMachineStatus} = require('root/values/defaults.json');
  const {autoItem} = require('root/values/preferences.json');
  const dispatch = useDispatch();
  const [isLoadingSwitch, setIsLoadingSwitch] = React.useState(true);
  const [isLoadingAuto, setIsLoadingAuto] = React.useState(true);

  const current_section = getCurrentPage();

  const getControlAuto = async () => {
    await axios.get('/api/get/auto', {
      params: {
        selects : ['machine', 'enable', 'duration', 'type'],
        where : autoItem[current_section],
        section : current_section
      }
    }).then(({data}) => {
      if(Object.keys(data).length === Object.keys(defaultSetting).length){
        dispatch(saveSetting(data))
        saveState("auto", data)
      } else {
        dispatch(saveSetting(defaultSetting));
        saveState("auto", defaultSetting)
      }
      setIsLoadingAuto(false);
    })
  }

  const getControlSwitches = async () => {
      await axios.get('/api/get/switch/now',{
        params: {
          section : current_section
        }
      }).then(({data}) => {
          if(checkEmpty(data)){
            dispatch(saveSwitch(defaultMachineStatus[current_section]))
            saveState("switches", defaultMachineStatus[current_section])
          } else {
            let status = {}
            machines[current_section].forEach((machine) => {
              status[machine] = data[current_section].includes(machine)
            })
            dispatch(saveSwitch(status))
            saveState("switches", status)
          }
        setIsLoadingSwitch(false);
      })
  }

  useEffect(() => {
      getControlSwitches();
      getControlAuto();
      return () => {
        setIsLoadingSwitch(true);
        setIsLoadingAuto(true);
      }
  }, []);

  if(isLoadingAuto || isLoadingSwitch) {
    return null
  }
*/

  return (
    CheckLogin() ?
        <div className='dashboard-root' >
          <AppBar page={page}/>
          <Grid container className='grid-container'>
            <Grid item xs={12} sm={12} md={4} className='item'>
              <SwitchController />
            </Grid>
            {/*<Grid item xs={12} sm={12} md={4} className={classes.item}>
              <CCTV />
            </Grid>
            <Grid item xs={12} sm={12} md={4} className={classes.item}>
              <MachinesHistoryCard />
            </Grid>
            {sections.map(section => { return(
                <Grid key={section.toString()} item xs={12} sm={12} md={4} className={classes.item} >
                  <StatusDisplay plant={section} />
                </Grid>)
              })}
            {environments.map(env => { return (
              <Grid key={env.toString()} item xs={12} sm={12} md={12} lg={4} xl={4}  className={classes.item}>
                <EnvironmentsHistroy environment={env} />
              </Grid>)
              })}*/}
          </Grid>
        </div>
        : <Redirect to='/' />
  )
}

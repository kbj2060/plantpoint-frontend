import React, {useCallback, useEffect, useState} from 'react';
import AppBar from '@components/AppBar/Appbar';
import {checkLogin} from "@funcUtils/checkLogin";
import {Redirect} from "react-router-dom";
import {Grid} from "@material-ui/core";
import SwitchController from "../components/SwitchController";
import CCTV from "@components/CCTV";
import MachineHistory from "@components/MachinesHistory";
import StatusDisplay from "@components/StatusDisplay";
import {currentPage} from "@funcUtils/currentPage";
import EnvironmentsHistoryComponent from "@components/EnvironmentsHistroy";
import {Loader} from "@compUtils/Loader";
import {Environments} from "../reference/environments";
import {Environment} from "@interfaces/Environment.class";
import { MachinesCollector, SectionsCollector, EnvironmentsCollector, SwitchesCollector, AutomationsCollector, CurrentsCollector } from '../collector/Collector.class';
import '../styles/layouts/dashboard.scss';

interface DashboardProps {
  page: string;
}

export default function Dashboard({page}: DashboardProps) {
  const [machineLoaded, setMachineLoaded] = useState(false);
  const [sectionLoaded, setSectionLoaded] = useState(false);
  const [switchLoaded, setSwitchLoaded] = useState(false);
  const [automationLoaded, setAutomationLoaded] = useState(false);
  const [environmentLoaded, setEnvironmentLoaded] = useState(false);
  const [eSections, setESections] = useState<string[]>([]);

  const environments = new Environments().getEnvironments();
  const machineSection: string = currentPage();

  const  StatusDisplayWrapper = useCallback((): JSX.Element  =>{
    const elements: JSX.Element[] = eSections.map((section: string) => {
      return(
        <Grid key={section} item xs={12} sm={12} md={4} className='status-display-item' >
          <StatusDisplay environmentSection={section} />
        </Grid>)
      })
    
    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    )
  }, []);

  const EnvironmentHistoryWrapper = useCallback((): JSX.Element => {
    const elements: JSX.Element[] = environments.map((environment: typeof Environment) => {
      const name = new environment().name;
      return (
        <Grid key={name} item xs={12} sm={12} md={12} lg={4} xl={4}  className='item' >
          <EnvironmentsHistoryComponent environment={name} />
        </Grid>)
      })

    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    )
  }, []);

  useEffect(() => {
    const { Time } = require('@values/time');

    new MachinesCollector(machineSection).execute().then( (isSucceed) => setMachineLoaded(isSucceed) )
    new SectionsCollector(machineSection).execute().then(({data, isSucceed}) => { setESections(data); setSectionLoaded(isSucceed); })
    new EnvironmentsCollector(machineSection).execute().then( (isSucceed) => setEnvironmentLoaded(isSucceed) );
    new SwitchesCollector(machineSection).execute().then( (isSucceed) => setSwitchLoaded(isSucceed) );
    new AutomationsCollector(machineSection).execute().then( (isSucceed) => setAutomationLoaded(isSucceed) )

    const eInterval = setInterval(() => {
      new EnvironmentsCollector(machineSection).execute();
    }, parseInt(Time.statusUpdateTime));

    const cInterval = setInterval(() => {        
      new CurrentsCollector(machineSection).execute();
    }, parseInt(Time.currentUpdateTime));

    return () => {
      clearInterval(eInterval);
      clearInterval(cInterval)
      setMachineLoaded(false);
      setSwitchLoaded(false);
      setAutomationLoaded(false);
      setSectionLoaded(false);
      setEnvironmentLoaded(false);
    }
  }, [ machineSection ]);

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
              <StatusDisplayWrapper />
              <EnvironmentHistoryWrapper />
            </Grid>
          </div>
        : <Loader />
      : <Redirect to='/'/>
  )
}

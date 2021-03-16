import React, {useEffect, useState} from 'react';
import AppBar from '@components/AppBar/Appbar';
import {checkLogin} from "@funcUtils/checkLogin";
import {Redirect} from "react-router-dom";
import {Grid} from "@material-ui/core";
import SwitchController from "../components/SwitchController";
import {useDispatch} from "react-redux";
import axios from "axios";
import {HttpUrls, Reports} from "../constants";
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

interface DashboardProps {
  page: string;
}

export default function Dashboard({page}: DashboardProps) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [eSections, setESections] = useState([]);
  const environments = new Environments().getEnvironments();

  useEffect(() => {
    const current_section: string = currentPage();
    async function getAvailableMachines (machineSection: string) {
      return await axios.get(`${HttpUrls.MACHINES_READ}/${machineSection}`)
        .then(
          ({data}) => {
            dispatch( saveMachines(data as ResponseMachineRead[]) );
          }
        )
    }
    async function getAvailableSections (machineSection: string) {
      return await axios.get(`${HttpUrls.ENV_SECTION_READ}/${machineSection}`)
        .then(
          ({data}) => {
            setESections( data.map((m: ResponseEnvSectionRead) => { return m.e_section }) )
            dispatch( saveSections( data as ResponseEnvSectionRead[] ) );
          }
        )
    }
    async function getSwitches () {
        await axios.get(`${HttpUrls.SWITCHES_READ_LAST}/${current_section}`)
          .then(
            ({data}) => {
              const grouped: ReducerSaveSwitchesDto =
                groupBy(data as ResponseSwitchesReadLast[], 'machine');
              dispatch(saveSwitch(grouped))
            }
          )
    }
    async function getAutomation () {
      await axios.get(`${HttpUrls.AUTOMATION_READ}/${current_section}`)
        .then(
          ({data}) => {
            const {lastAutomations}: ResponseAutomationRead = data;
            const groupedAutomations = groupBy(lastAutomations, 'machine');
            dispatch(saveAutomation(groupedAutomations));
          }
        )
    }

    getAvailableMachines(current_section).then(() => console.log(Reports.MACHINES_LOADED));
    getAvailableSections(current_section).then(() => console.log(Reports.ENV_SECTIONS_LOADED));
    getSwitches().then(() => console.log(Reports.SWITCH_LOADED));
    getAutomation().then(() => setLoaded(true));
  }, [ dispatch ]);

  return (
    checkLogin()
      ? loaded
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
                    <StatusDisplay plant={section} />
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

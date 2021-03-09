import React, {useEffect} from 'react';
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
import {ResponseMachineRead} from "@interfaces/machine";
import {environments, environmentSections} from "@values/defaults";

interface DashboardProps {
  page: string;
}

export default function Dashboard({page}: DashboardProps) {
  const dispatch = useDispatch();

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
    getSwitches().then(() => console.log(Reports.SWITCH_LOADED));
    getAutomation().then(() => console.log(Reports.AUTOMATION_LOADED));
  }, [ dispatch ]);

  return (
    checkLogin()
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
            {environmentSections.map(section => {
              return(
                <Grid key={section.toString()} item xs={12} sm={12} md={4} className='status-display-item' >
                  <StatusDisplay plant={section} />
                </Grid>)
              })}
            {environments.map((environment) => {
              return (
                <Grid key={environment.toString()} item xs={12} sm={12} md={12} lg={4} xl={4}  className='item' >
                  <EnvironmentsHistoryComponent environment={environment} />
                </Grid>)
              })}
          </Grid>
        </div>
      : <Redirect to='/'/>
  )
}

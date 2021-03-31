import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@components/AppBar/Appbar';
import {checkLogin} from "@funcUtils/checkLogin";
import {Redirect} from "react-router-dom";
import {Calendar} from "@components/CustomScheduler/Calendar";
import {CustomLocale} from "@components/CustomScheduler/CustomLocale";
import {ScheduleTable} from "@components/CustomScheduler/ScheduleTable";
import ScheduleAdd from "@components/CustomScheduler/SchdeuleAdd";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "@redux/modules";
import {SchedulerDate} from "@interfaces/Scheduler";
import '@styles/components/scheduler.scss';

export default function Scheduler() {
  const [selectedDay, setSelectedDay] = useState<SchedulerDate|null>(null);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const month = useSelector((state: RootState) => state['date'].month ,shallowEqual)

  const handleAddSchedule = () => {
    setIsAdd(true);
  }

  const handleAddFinish = () => {
    setIsAdd(false);
    setSelectedDay(null);
  }

  const handleRefresh = () => {
    setSelectedDay(null);
    setIsAdd(false);
  }

  const renderFooter = () => (
    <ButtonGroup color="secondary">
      <Button onClick={handleAddSchedule}>일정 추가</Button>
      <Button onClick={handleRefresh}>{month}월 일정</Button>
    </ButtonGroup>
  )

  const ScheduleHelper = (): JSX.Element => {
    return (
      isAdd
        ? <ScheduleAdd selectedDay={selectedDay} handleAddFinish={handleAddFinish} />
        : <ScheduleTable selectedDay={selectedDay}/>
    )
  }

  const cleanup = () => {
    setSelectedDay(null);
    setIsAdd(false);
  }

  useEffect(() => {
    setSelectedDay(null)
    return () => cleanup()
	}, [month])

  useEffect(() => {
    setIsAdd(false);
  }, [selectedDay])

  return (
    !checkLogin()
      ? <Redirect to={'/'} />
      : <div className='scheduler-root'>
          <AppBar page={'일정'} />
          <CssBaseline />
          <Grid container className='scheduler-container'>
            <Grid item xs={12} sm={12} md={5} className='item'>
              <Calendar value={selectedDay}
                        colorPrimary="#595957"
                        colorPrimaryLight="rgba(59, 59, 57, 0.2)"
                        locale={CustomLocale}
                        onChange={setSelectedDay}
                        isDatepicker={false}
                        renderFooter={renderFooter}
                        shouldHighlightWeekends />
            </Grid>
            <Grid item xs={12} sm={12} md={4} className='item'>
              <ScheduleHelper />
            </Grid>
          </Grid>
        </div>
      );
    }

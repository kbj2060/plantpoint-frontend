import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import DatePicker from "./DatePicker";
import {CustomLocale} from "./CustomLocale";
import {OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {checkEmpty} from "@funcUtils/checkEmpty";
import axios from "axios";
import moment from "moment";
import {HttpUrls, Reports} from "../../reference/constants";
import {currentUser} from "@funcUtils/currentUser";
import '@styles/components/schedule_add.scss';
import {CreateScheduleDto, SchedulerDate} from "@interfaces/Scheduler";

interface ScheduleAddProps {
  selectedDay: SchedulerDate | null;
  handleAddFinish: () => void;
}

function ScheduleAdd (
  {selectedDay, handleAddFinish}: ScheduleAddProps
) {
  const [selectedDays, setSelectedDays] = useState<SchedulerDate[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleContentChange = <T extends BaseSyntheticEvent>(e: T) => {
    setContent(e.target.value)
  }

  const handleTitleChange = <T extends BaseSyntheticEvent>(e: T) => {
    setTitle(e.target.value)
  }

  const date2moment = (date: SchedulerDate | string) => {
    if (checkEmpty(date))
      return null
    if(typeof(date) === "object")
      return moment(new Date(date.year,date.month - 1, date.day)).format('YYYY-MM-DD')
    else {
      return moment(new Date(date)).format('YYYY-MM-DD')
    }
  }

  const getToday = () => {
    const today = new Date();
    return {"day": today.getDate(), "month": today.getMonth()+1, "year": today.getFullYear()};
  }

  const renderCustomInput = ({ ref }: any) => {
    let value: string
    if ( selectedDays.length > 1 ) {
      value = `${date2moment(selectedDays[0])} 외 ${selectedDays.length - 1}일`
    } else if ( selectedDays.length === 1 ) {
      value = `${date2moment(selectedDays[0])}`
    } else {
      value = "날짜 설정"
    }
    return (
      <input readOnly ref={ref} value={value} className='input' />
    )
  }

  const postSaveSchedules = async () => {
    await axios.post(HttpUrls.SCHEDULES_CREATE, {
      date: selectedDays.map((day) => date2moment(day)),
      title: title,
      content : content,
      createdBy : currentUser(),
    } as CreateScheduleDto)
  }

  const handleAddSave = () => {
    postSaveSchedules().then(() => { console.log( Reports.SCHEDULES_CREATED ) })
    handleAddFinish();
  }

  useEffect(() => {
    selectedDay
      ? setSelectedDays([selectedDay])
      : setSelectedDays([getToday()])
  }, [selectedDay])

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center" className='schedule-grid-container'  >
        <Grid item className='date-header' >
          <DatePicker
            value={selectedDays}
            onChange={setSelectedDays}
            locale={CustomLocale}
            colorPrimary="#595957"
            renderInput={renderCustomInput}
            inputPlaceholder="날짜 설정하기"
            shouldHighlightWeekends
          />
        </Grid>
        <Grid item className='grid-item'>
          <OutlinedInput
            value={title}
            onChange={handleTitleChange}
            classes={{root: 'text-field',
                      notchedOutline: 'notched-outline'}}
            placeholder={"제목"}
            color="secondary"
          />
        </Grid>
        <Grid item className='grid-item'>
          <OutlinedInput
            color="secondary"
            classes={{root: 'text-field',
                      notchedOutline: 'notched-outline'}}
            placeholder={"내용"}
            value={content}
            onChange={handleContentChange}
            multiline={true}
            rows={8}
          />
        </Grid>
        <Grid item className='button-grid'>
          <Button onClick={handleAddSave} className='button' variant="outlined">
            저장
          </Button>
          <Button onClick={handleAddFinish} className='button' variant="outlined">
            취소
          </Button>
        </Grid>
      </Grid>
  )
}

export default React.memo(ScheduleAdd);
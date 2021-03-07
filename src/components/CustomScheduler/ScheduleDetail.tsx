import React, {BaseSyntheticEvent, useCallback, useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from "@material-ui/core/Typography";
import DatePicker from "./DatePicker";
import Grid from "@material-ui/core/Grid";
import {CustomLocale} from "./CustomLocale";
import {OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import {HttpUrls} from "../../constants";
import '@styles/components/schedule_detail.scss';
import {Row, SchedulerDate} from "@interfaces/Scheduler";

interface ScheduleDetailProps {
  toggleDrawer: () => void;
  selectedRow: Row;
  updateRow: <T extends Row>({id, date, title, content, binding}: T) => void;
}

function ScheduleDetail(
  {toggleDrawer, selectedRow, updateRow}: ScheduleDetailProps
) {
  const [selectedDays, setSelectedDays] = useState<SchedulerDate[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open] = useState(true);

  const closeDrawer = () => {
    toggleDrawer();
  }

  const handleContentChange = useCallback(<T extends BaseSyntheticEvent>(e: T) => {
    setContent(e.target.value)
  }, []);

  const handleTitleChange = useCallback(<T extends BaseSyntheticEvent>(e: T) => {
    setTitle(e.target.value)
  }, []);

  const obj2moment = <T extends SchedulerDate>(collection: T) => {
    return moment(
      new Date(collection.year, collection.month - 1, collection.day)
    ).format('YYYY-MM-DD')
  }

  const renderCustomInput = ({ ref }: any) => {
    const start = obj2moment(selectedDays[0]);
    const len = selectedDays.length - 1;
    return(
      <input
        readOnly
        ref={ref}
        value={selectedDays.length ? `${start} 외 ${len}일` : "날짜 설정"}
        className='detail-input'
      />
    )
  }

  const updateSchedule = async () => {
    const dto = {
      id : selectedRow.id,
      date : selectedDays.map((day) => obj2moment(day)),
      title : title,
      content : content
    }
    await axios.post(HttpUrls.SCHEDULES_UPDATE, dto)
  }

  const handleSaveClick = () => {
    updateSchedule()
      .then(() => {
        const updatedRow: Row = {
          id : selectedRow.id,
          date : selectedDays.map((day) => obj2moment(day)),
          title : title,
          content : content,
          binding: selectedDays.length,
        }
        console.log(updatedRow)
        updateRow( updatedRow );
      })
    closeDrawer();
  }

  const cleanup = () => {
    setTitle("")
    setContent("")
    setSelectedDays([]);
  }

  useEffect(() => {
    setContent(selectedRow.content);
    setTitle(selectedRow.title);
    setSelectedDays(
      selectedRow.date
      ? selectedRow.date.map((date: string) => {
          const [year, month, day] = date.split('-')
          return {"year": parseInt(year), "month":parseInt(month), "day":parseInt(day)}
        })
      : []
    );
    return () => {
      cleanup();
    }
  }, [selectedRow])

  const scheduleDetail = () => (
    <Grid container direction="column" justify="flex-start" alignItems="center" className='detail-grid-container'  >
      <Grid item className='grid-item' >
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
      <Grid item className='grid-item' >
        <OutlinedInput
          value={title}
          onChange={handleTitleChange}
          classes={{root:'detail-text-field'}}
          color="secondary"
        />
      </Grid>
      <Grid item className='grid-item'>
        <OutlinedInput
          classes={{root:'detail-text-field'}}
          value={content}
          color="secondary"
          onChange={handleContentChange}
          multiline={true}
          rows={10}
        />
      </Grid>
      <Grid item className='button-grid' >
        <Button onClick={handleSaveClick}  className='button' variant="outlined">
          저장
        </Button>
        <Button onClick={closeDrawer} className='button' variant="outlined">
          취소
        </Button>
      </Grid>
    </Grid>
  );

  return (
      <Drawer classes={{ paper: 'drawer-paper' }} anchor={'right'} open={open} onClose={closeDrawer}>
        <Typography className='header'>일정 세부 내역</Typography>
        {scheduleDetail()}
      </Drawer>
  );
}

export default React.memo(ScheduleDetail);
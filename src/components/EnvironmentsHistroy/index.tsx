import React, {useCallback, useEffect} from 'react';
import CustomLine from './CustomLine';
import TimerIcon from '../../assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import '@styles/components/environment_history.scss';
import {Reports} from "../../reference/constants";
import _ from "lodash";
import {changeToKoreanDate} from "@funcUtils/changeToKoreanDate";
import {EnvironmentsHistory,
        EnvironmentHistoryUnit,
        EnvironmentHistoryReadDto,
        ResponseEnvironmentHistoryRead } from "@interfaces/Environment";
import {checkEmpty} from "@funcUtils/checkEmpty";
import {getHistoryEnvironment} from "../../handler/httpHandler";

interface EnvironmentsHistoryProps {
  environment : string;
}

export default function EnvironmentsHistoryComponent({ environment }: EnvironmentsHistoryProps) {
  const {Translations} = require('@values/translations');
  const [history, setHistory] = React.useState<EnvironmentsHistory>({} as EnvironmentsHistory);
  const [lastUpdate, setLastUpdate] = React.useState<string>('');

  const fetchHistory = useCallback(async () => {
    const current_page: string = decodeURI(window.location.pathname.replace('/',''));

    function groupBy<T extends EnvironmentHistoryUnit, U extends keyof T>(
      xs: T[], key: U
    ) {
      return xs.reduce((rv: any, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }

    const dto: EnvironmentHistoryReadDto = {
      section : current_page,
      name : environment,
    }

    getHistoryEnvironment(dto.section, dto.name)
      .then(({data})=> {
        const { histories }: ResponseEnvironmentHistoryRead = data;
        if ( checkEmpty(histories) ) { return; }
        const grouped: EnvironmentsHistory = groupBy<EnvironmentHistoryUnit, string> (
          histories, 'environmentSection'
        );
        const lastUpdated = _.sortBy( histories, 'created' )[ histories.length - 1 ].created;
        setLastUpdate( changeToKoreanDate(lastUpdated) );
        setHistory( grouped );
      })
      .catch((err) => {
        console.log("HISTORY FETCH ERROR!");
        console.log(err);
      })
  }, [environment])


  const cleanup = () => {
    setHistory({} as Record<string, EnvironmentHistoryUnit[]>);
    setLastUpdate('');
  }

  useEffect(() => {
    const {Time} = require('@values/time');

    fetchHistory().then(() => { console.log(Reports.ENVIRONMENTS_HISTORY_LOADED) });
    const interval = setInterval(() => {
      fetchHistory().then(() => { console.log(Reports.ENVIRONMENTS_HISTORY_LOADED) });
    }, parseInt(Time.historyUpdateTime));

    return () => {
      clearInterval(interval)
      cleanup();
    };
  }, [fetchHistory]);

  return (
    <div className='foreground'>
      <Typography className='title'> { Translations[ environment ] } </Typography>
      <CustomLine
        environment={environment}
        history={history}
        width={5} height={2} />
      <div className='update-info'>
        <TimerIcon />
        <Typography variant="inherit" className='update-time'> 마지막 업데이트 : {lastUpdate} </Typography>
      </div>
      </div>
    )
  }

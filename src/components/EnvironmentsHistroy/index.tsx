import React, {useCallback, useEffect} from 'react';
import CustomLine from './CustomLine';
import TimerIcon from '../../assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import '@styles/components/environment_history.scss';
import {EnvironmentsHistory,
        EnvironmentHistoryUnit, } from "@interfaces/Environment";
import { EnvironmentHistoryCollector } from '../../collector/HistoryCollector.class';

interface EnvironmentsHistoryProps {
  environment : string;
}

export default function EnvironmentsHistoryComponent({ environment }: EnvironmentsHistoryProps) {
  const {Translations} = require('@values/translations');
  const [history, setHistory] = React.useState<EnvironmentsHistory>({} as EnvironmentsHistory);
  const [lastUpdate, setLastUpdate] = React.useState<string>('');
  
  const fetchHistory = useCallback(async () => {
    const mSection: string = decodeURI(window.location.pathname.replace('/',''));
    const collector: EnvironmentHistoryCollector = new EnvironmentHistoryCollector(mSection);
    collector.execute( environment )
      .then((isSucceed) => {
        if (!isSucceed) { return; }
        setHistory(collector.getHistory());
        setLastUpdate(collector.getLastUpdatedTime());
      })
  }, [environment])


  const cleanup = () => {
    setHistory({} as Record<string, EnvironmentHistoryUnit[]>);
    setLastUpdate('');
  }

  useEffect(() => {
    const {Time} = require('@values/time');

    fetchHistory();

    const interval = setInterval(() => {
      fetchHistory();
    }, parseInt(Time.historyUpdateTime));

    return () => {
      clearInterval(interval)
      cleanup();
    };
  }, [ fetchHistory, environment ]);

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

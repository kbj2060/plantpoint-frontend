import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '@styles/components/status_figure.scss';
import {HttpUrls, Reports} from "../../constants";
import axios from "axios";
import EnvironmentText from "@components/StatusDisplay/EnvironmentText";
import { ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";
import useChangeEnvironmentStatus from "@hooks/useChangeEnvironmentStatus";
import {AvailableEnvironment, AvailableEnvironmentSection} from "@interfaces/main";

interface FiguresProps {
  plant: string;
}

export default function Figures({ plant }: FiguresProps) {
  const { Translations } = require('@values/translations');
  const {defaultEnvironment} = require('@values/defaults');
  const changeEnvironmentStatus = useChangeEnvironmentStatus();

  useEffect(() => {
    const {Time} = require('@values/time');
    const getCurrentStatus = async () => {
      await axios.get(`${HttpUrls.ENVIRONMENTS_READ_LAST}/${plant}`)
        .then(({data}) => {
          const environmentDto: ReducerEnvironmentDto = {
            ...data,
            environmentSection: plant
          }
          changeEnvironmentStatus(environmentDto);
        });
    }

    getCurrentStatus()
      .then(() => console.log(Reports.ENVIRONMENTS_LOADED));

    const interval = setInterval(() => {
      getCurrentStatus()
        .then(() => console.log(Reports.ENVIRONMENTS_LOADED));
    }, parseInt(Time.statusUpdateTime));

    return () => {
      clearInterval(interval)
    };
  }, [plant, changeEnvironmentStatus]);

  return (
    <div className='figures-wrapper'>
      {
        Object.keys(defaultEnvironment).map((environmentName: string) => {
          return (
            <div key={environmentName}>
              <Typography className='title'>{Translations[environmentName]}</Typography>
              <Paper className='figure' >
                <EnvironmentText
                  section={plant as AvailableEnvironmentSection}
                  name={environmentName as AvailableEnvironment} />
              </Paper>
            </div>
            )
        })
      }
    </div>
  );
}

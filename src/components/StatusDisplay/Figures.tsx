import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '@styles/components/status_figure.scss';
import {HttpUrls, Reports} from "../../constants";
import axios from "axios";
import EnvironmentText from "@components/StatusDisplay/EnvironmentText";
import { ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";
import useChangeEnvironmentStatus from "@hooks/useChangeEnvironmentStatus";
import {Environments} from "../../reference/environments";
import {Environment} from "@interfaces/Environment.class";

interface FiguresProps {
  plant: string;
}

export default function Figures({ plant }: FiguresProps) {
  const { Translations } = require('@values/translations');
  const changeEnvironmentStatus = useChangeEnvironmentStatus();
  const environments = new Environments().getEnvironments();

  useEffect(() => {
    const { Time } = require('@values/time');
    const getCurrentStatus = async () => {
      await axios.get(`${HttpUrls.ENVIRONMENTS_READ_LAST}/${plant}`)
        .then(({data}) => {
          const dto: ReducerEnvironmentDto = {
            ...data,
            environmentSection: plant
          }
          changeEnvironmentStatus( dto );
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
        environments.map((environment: typeof Environment) => {
          const name = new environment().name
          return (
            <div key={name}>
              <Typography className='title'>{Translations[name]}</Typography>
              <Paper className='figure' >
                <EnvironmentText
                  section={plant}
                  name={name} />
              </Paper>
            </div>
            )
        })
      }
    </div>
  );
}

import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '@styles/components/status_figure.scss';
import {Reports} from "../../reference/constants";
import EnvironmentText from "@components/StatusDisplay/EnvironmentText";
import { ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";
import useChangeEnvironmentStatus from "@hooks/useChangeEnvironmentStatus";
import {Environments} from "../../reference/environments";
import {Environment} from "@interfaces/Environment.class";
import {getLastEnvironment} from "../../handler/httpHandler";

interface FiguresProps {
  environmentSection: string;
}

export default function Figures({ environmentSection }: FiguresProps) {
  const { Translations } = require('@values/translations');
  const changeEnvironmentStatus = useChangeEnvironmentStatus();
  const environments = new Environments().getEnvironments();

  useEffect(() => {
    const { Time } = require('@values/time');
    const getCurrentStatus = async () => {
      getLastEnvironment(environmentSection)
        .then(({data}) => {
          const dto: ReducerEnvironmentDto = {
            ...data,
            section: environmentSection
          }
          changeEnvironmentStatus( dto );
        });
    }

    const interval = setInterval(() => {
      getCurrentStatus()
        .then(() => console.log(Reports.ENVIRONMENTS_LOADED));
    }, parseInt(Time.statusUpdateTime));

    return () => {
      clearInterval(interval)
    };
  }, [environmentSection, changeEnvironmentStatus]);

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
                  section={environmentSection}
                  name={name} />
              </Paper>
            </div>
            )
        })
      }
    </div>
  );
}

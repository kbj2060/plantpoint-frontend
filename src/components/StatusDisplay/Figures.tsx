import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '@styles/components/status_figure.scss';
import {LogMessage} from "../../reference/constants";
import EnvironmentText from "@components/StatusDisplay/EnvironmentText";
import { ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";
import useChangeEnvironmentStatus from "@hooks/useChangeEnvironmentStatus";
import {Environments} from "../../reference/environments";
import {Environment} from "@interfaces/Environment.class";
import {getLastEnvironment} from "../../handler/httpHandler";
import {customLogger} from "../../logger/Logger";

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
        .then(() => {
          customLogger.success(`${environmentSection} : `+LogMessage.SUCCESS_GET_CURRENT_ENVIRONMENT, 'Figure' as string)
        })
        .catch((err) => {
          console.log(err)
          customLogger.error(LogMessage.FAILED_GET_CURRENT_ENVIRONMENT, 'Figure' as string)
        })
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

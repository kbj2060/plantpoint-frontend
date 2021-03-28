import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '@styles/components/status_figure.scss';
import EnvironmentText from "@components/StatusDisplay/EnvironmentText";
import {Environments} from "../../reference/environments";
import {Environment} from "@interfaces/Environment.class";

interface FiguresProps {
  environmentSection: string;
}

export default function Figures({ environmentSection }: FiguresProps) {
  const { Translations } = require('@values/translations');
  const environments = new Environments().getEnvironments();

  const EnvironmentCircleDisplay = () => {
    const elements = environments.map((environment: typeof Environment) => {
      const name = new environment().name
      return (
        <div key={name}>
          <Typography className='title'>{Translations[name]}</Typography>
          <Paper className='figure' >
            <EnvironmentText section={environmentSection} name={name} />
          </Paper>
        </div>
        )})

    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    )
  }

  return (
    <div className='figures-wrapper'>
      <EnvironmentCircleDisplay />
    </div>
  );
}

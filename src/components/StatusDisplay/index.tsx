import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Figures from "./Figures";

interface StatusDisplayProps {
  environmentSection: string;
}

export default function StatusDisplay({environmentSection}: StatusDisplayProps) {
  const {Translations} = require('@values/translations');

  const FigureTitle = () => {
    return (
      <Typography className='figure-title' >
        {Translations[environmentSection]}
      </Typography>
    )
  }

  return (
    <Card className='figure-card' >
      <FigureTitle />
      <Figures environmentSection={environmentSection}/>
    </Card>
  );
}
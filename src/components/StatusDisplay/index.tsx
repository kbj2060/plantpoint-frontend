import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Figures from "./Figures";

interface StatusDisplayProps {
  plant: string;
}

export default function StatusDisplay({plant}: StatusDisplayProps) {
  const {Translations} = require('@values/translations');

  const FigureTitle = () => {
    return (
      <Typography className='figure-title' >
        {Translations[plant]}
      </Typography>
    )
  }

  return (
    <Card className='figure-card' >
      <FigureTitle />
      <Figures plant={plant}/>
    </Card>
  );
}
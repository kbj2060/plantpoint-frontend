import {Line} from 'react-chartjs-2';
import React from "react";
import {checkEmpty} from "@funcUtils/checkEmpty";
import {EnvironmentChart, EnvironmentsHistory} from "@interfaces/Environment";
import {options} from "@components/EnvironmentsHistroy/EnvironmentHistoryOptions";
import { EnvironmentHistoryCollector } from '../../collector/HistoryCollector.class';
import { currentPage } from '@funcUtils/currentPage';

interface CustomLineProps {
  environment: string;
  width: number;
  height: number;
  history: EnvironmentsHistory;
}

function CustomLine({ environment, history, width, height }: CustomLineProps) {
  const mSection: string = currentPage();
  let state: EnvironmentChart = {
    labels: [],
    datasets: []
  }

  if ( checkEmpty(history) ){
    return <Line options={options} data={state} width={width} height={height}/>
  }

  state.datasets = new EnvironmentHistoryCollector(mSection).makeDataset(history, environment);
  state.labels = new EnvironmentHistoryCollector(mSection).makeLabels(history);

  return <Line options={options} data={state} width={width} height={height}/>
}

export default React.memo(CustomLine);


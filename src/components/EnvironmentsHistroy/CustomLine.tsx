import {Line} from 'react-chartjs-2';
import React from "react";
import {checkEmpty} from "@funcUtils/checkEmpty";
import {EnvironmentChart, EnvironmentsHistory} from "@interfaces/Environment";
import {options} from "@components/EnvironmentsHistroy/EnvironmentHistoryOptions";
import {getReduxData} from "@funcUtils/getReduxData";
import {StorageKeys} from "../../reference/constants";
import { EnvironmentHistoryCollector } from '../../collector/HistoryCollector.class';

interface CustomLineProps {
  environment: string;
  width: number;
  height: number;
  history: EnvironmentsHistory;
}

function CustomLine({ environment, history, width, height }: CustomLineProps) {
  let state: EnvironmentChart = {
    labels: [],
    datasets: []
  }

  if ( checkEmpty(history) ){
    return <Line options={options} data={state} width={width} height={height}/>
  }

  state.datasets = new EnvironmentHistoryCollector(history, environment).makeDataset();
  state.labels = new EnvironmentHistoryCollector(history, environment).makeLabels();

  return <Line options={options} data={state} width={width} height={height}/>
}

export default React.memo(CustomLine);


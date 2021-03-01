import {Line} from 'react-chartjs-2';
import React from "react";
import {checkEmpty} from "@funcUtils/checkEmpty";
import {changeToKoreanDate} from "@funcUtils/changeToKoreanDate";
import {AvailableEnvironment, AvailableEnvironmentSection} from "@interfaces/main";
import {EnvironmentChart, EnvironmentsHistory} from "@interfaces/Environment";
import {options} from "@components/EnvironmentsHistroy/EnvironmentHistoryOptions";

interface CustomLineProps {
  environment: AvailableEnvironment;
  width: number;
  height: number;
  history: EnvironmentsHistory;
}

export default function CustomLine({ environment, history, width, height }: CustomLineProps) {
    const {Translations} = require('@values/translations');
    const {Colors} = require('@values/colors');
    const sections = ['d1', 'd2', 'd3'];
    const primarySection = sections[0];
    let state: EnvironmentChart = {
        labels: [],
        datasets: []
    }

    if ( checkEmpty(history) ){
      return <Line options={options} data={state} width={width} height={height}/>
    }

    function makeDataset<T extends number>(n_sections: T) {
      let datasets = []
      for(let n = 0; n < n_sections; n++){
        const section = sections[n] as AvailableEnvironmentSection;
        const data = history[section] === undefined
                      ? []
                      : history[section].map((h) => h[environment])
        datasets.push({
          label: Translations[section],
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#efcf76',
          borderColor: `${Colors[section]}`,
          borderWidth: 2,
          pointRadius: 0,
          data: data
        })
      }
      return datasets
    }

    state.datasets = makeDataset<number>(sections.length);
    state.labels = history[primarySection as AvailableEnvironmentSection].map( (h ) => changeToKoreanDate(h.created) );

    return <Line options={options} data={state} width={width} height={height}/>
}


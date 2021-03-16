import {Line} from 'react-chartjs-2';
import React from "react";
import {checkEmpty} from "@funcUtils/checkEmpty";
import {changeToKoreanDate} from "@funcUtils/changeToKoreanDate";
import {EnvironmentChart, EnvironmentsHistory} from "@interfaces/Environment";
import {options} from "@components/EnvironmentsHistroy/EnvironmentHistoryOptions";
import {getReduxData} from "@funcUtils/getReduxData";
import {StorageKeys} from "../../reference/constants";

interface CustomLineProps {
  environment: string;
  width: number;
  height: number;
  history: EnvironmentsHistory;
}

export default function CustomLine({ environment, history, width, height }: CustomLineProps) {
    const {Translations} = require('@values/translations');
    const {Colors} = require('@values/colors');
    const environmentSections = getReduxData(StorageKeys.SECTION);
    const primarySection = environmentSections[0]

    let state: EnvironmentChart = {
        labels: [],
        datasets: []
    }

    if ( checkEmpty(history) ){
      return <Line options={options} data={state} width={width} height={height}/>
    }

    function makeDataset <T extends number> (n_sections: T) {
      let datasets = []
      for(let n = 0; n < n_sections; n++){
        const section = environmentSections[n];
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
          data: data,
          spanGaps: true,
        })
        console.log(data.length)
      }
      return datasets
    }

    state.datasets = makeDataset<number>(environmentSections.length);
    state.labels = history[primarySection].map( (h ) => changeToKoreanDate(h.created) );

    return <Line options={options} data={state} width={width} height={height}/>
}


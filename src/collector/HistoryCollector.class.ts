import { changeToKoreanDate } from '@funcUtils/changeToKoreanDate';
import { ResponseSwitchHistoryRead, SingleSwitchHistory } from '@interfaces/MachineHistory';
import { updatedDiff } from 'deep-object-diff';
import { customLogger } from '../logger/Logger';
import { LogMessage, StorageKeys } from '../reference/constants';
import { getHistorySwitches } from '../handler/httpHandler';
import { getReduxData } from '@funcUtils/getReduxData';
import { EnvironmentsHistory } from '@interfaces/Environment';

export class EnvironmentHistoryCollector {
  environmentSections: Array<string>; history: EnvironmentsHistory; environment: string; primarySection: string;
  constructor( history: EnvironmentsHistory, environment: string ) {
    this.environmentSections = getReduxData(StorageKeys.SECTION);
    this.history = history;
    this.environment = environment;
    this.primarySection = this.environmentSections[0];
  }

  makeDataset () {
    const {Translations} = require('@values/translations');
    const {Colors} = require('@values/colors');
    let datasets = []

    for(let n = 0; n < this.environmentSections.length; n++){
      const section = this.environmentSections[n];
      const data = this.history[section] === undefined ? [] : this.history[section].map((h) => h[this.environment])

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
    }
    return datasets
  }

  makeLabels () {
    return this.history[this.primarySection].map( ( h ) => changeToKoreanDate(h.created) );
  }
}


export interface UpdatedRow {
  machine: string;
  status: number;
}
export class MachineHistoryCollector {
  mSection: string;
  constructor(mSection: string) {
    this.mSection = mSection
  }

  handleDateLocale (sw: SingleSwitchHistory) {
    sw.created = changeToKoreanDate(sw.created);
    return sw;
  }

  extractUpdatedRow <T extends object> (prevRefresh: T, refresh: T): UpdatedRow | null {
    const entries: Array<any> = Object.entries( updatedDiff(prevRefresh , refresh) );
		if ( entries.length !== 1 ) { return null; }
		const [machine, status] = entries.flat();
    return { machine: machine, status: status }
  }

  async execute (): Promise<Record<string, any>> {
    let isSucceed = false;
    let result: SingleSwitchHistory[] = [] as SingleSwitchHistory[];
    await getHistorySwitches(this.mSection)
      .then(({data}) => {
        const { switchHistory }: ResponseSwitchHistoryRead = data;
        result = switchHistory.map(this.handleDateLocale)
        isSucceed = true;
        customLogger.success(LogMessage.SUCCESS_GET_SWITCHES_HISTORY, 'MachineHistory' as string)
      })
      .catch((err) => {
        console.log(err)
        customLogger.error(LogMessage.FAILED_GET_SWITCHES_HISTORY,'MachineHistory' as string);
      })
    return { data: result, isSucceed: isSucceed };
  }
}
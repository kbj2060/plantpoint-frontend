import { changeToKoreanDate } from '@funcUtils/changeToKoreanDate';
import { ResponseSwitchHistoryRead, SingleSwitchHistory } from '@interfaces/MachineHistory';
import { updatedDiff } from 'deep-object-diff';
import { customLogger } from '../logger/Logger';
import { LogMessage, StorageKeys } from '../reference/constants';
import { getHistoryEnvironment, getHistorySwitches } from '../handler/httpHandler';
import { getReduxData } from '@funcUtils/getReduxData';
import { EnvironmentHistoryUnit, EnvironmentsHistory, ResponseEnvironmentHistoryRead } from '@interfaces/Environment';
import { checkEmpty } from '@funcUtils/checkEmpty';
import _ from 'lodash';

export class EnvironmentHistoryCollector {
  environmentSections: Array<string>; lastUpdated: string; history: EnvironmentsHistory; mSection: string;
  constructor(mSection: string ) {
    this.mSection = mSection;
    this.environmentSections = getReduxData(StorageKeys.SECTION);
    this.lastUpdated = "";
    this.history = {};
  }

  groupBy <T extends EnvironmentHistoryUnit, U extends keyof T> (
    xs: T[], key: U
  ) {
    return xs.reduce((rv: any, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  async execute <T extends string>( environment: T ): Promise<boolean> {
    let isSucceed = false
    await getHistoryEnvironment(this.mSection, environment)
      .then(({data})=> {
        const { histories }: ResponseEnvironmentHistoryRead = data;
        if ( checkEmpty(histories) ) { return; }
        this.history = this.groupBy<EnvironmentHistoryUnit, string> (
          histories, 'environmentSection'
        );
        this.lastUpdated = changeToKoreanDate(_.sortBy( histories, 'created' )[ histories.length - 1 ].created);
        customLogger.success(`${environment} : `+LogMessage.SUCCESS_GET_ENVIRONMENTS_HISTORY, 'EnvironmentsHistory' as string)
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err)
        customLogger.error(LogMessage.FAILED_GET_ENVIRONMENTS_HISTORY, 'EnvironmentsHistory' as string)
      })
    return isSucceed;
  }

  getLastUpdatedTime () {
    return this.lastUpdated;
  }

  getHistory () {
    return this.history;
  }

  makeDataset (history: EnvironmentsHistory, environment: string) {
    const {Translations} = require('@values/translations');
    const {Colors} = require('@values/colors');
    let datasets = []

    for(let n = 0; n < this.environmentSections.length; n++){
      const section = this.environmentSections[n];
      const data = history[section] === undefined ? [] : history[section].map((h) => h[environment])

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

  makeLabels ( history: EnvironmentsHistory ) {
    const primarySection = this.environmentSections[1];
    return history[primarySection].map( ( h ) => changeToKoreanDate(h.created) );
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
import { changeToKoreanDate } from '@funcUtils/changeToKoreanDate';
import { groupBy } from '@funcUtils/groupBy';
import { ResponseAutomationRead } from '@interfaces/Automation';
import { ResponseEnvSectionRead, ResponseMachineRead } from '@interfaces/Machine';
import { ResponseSwitchHistoryRead, SingleSwitchHistory } from '@interfaces/MachineHistory';
import { ResponseSwitchesReadLast } from '@interfaces/Switch';
import { saveAutomation } from '@redux/modules/ControlAutomation';
import { saveCurrent } from '@redux/modules/ControlCurrent';
import { saveEnvironment } from '@redux/modules/ControlEnvironment';
import { saveMachines } from '@redux/modules/ControlMachine';
import { saveSections } from '@redux/modules/ControlSection';
import { ReducerSaveSwitchesDto, saveSwitch } from '@redux/modules/ControlSwitch';
import { store } from '@redux/store';
import { updatedDiff } from 'deep-object-diff';
import { getAllMachinesCurrent, getAutomation, getAvailableMachines, getAvailableSections, getHistorySwitches, getLastAllEnvironments, getSwitches } from '../handler/httpHandler';
import { customLogger } from '../logger/Logger';
import { LogMessage } from '../reference/constants';

export class BaseCollector {
  mSection: string;
  constructor(mSection: string) {
    this.mSection = mSection
  }
  execute (): void { }
}

export class MachinesCollector extends BaseCollector {
  async execute (): Promise<boolean> {
    let isSucceed = false;
    await getAvailableMachines(this.mSection)
      .then(({data}) => {
        store.dispatch( saveMachines(data as ResponseMachineRead[]) );
        customLogger.success(LogMessage.SUCCESS_GET_MACHINES, "Dashboard" as string);
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err);
        customLogger.error(LogMessage.FAILED_GET_MACHINES, "Dashboard" as string);
      })
    return isSucceed;
  }
}

export class SectionsCollector extends BaseCollector {
  async execute (): Promise<Record<string, any>> {
    let isSucceed = false;
    let result: ResponseEnvSectionRead[] = [] as ResponseEnvSectionRead[];
    await getAvailableSections(this.mSection)
      .then(({data}) => {
        result = data;
        store.dispatch( saveSections( data as ResponseEnvSectionRead[] ) );
        customLogger.success(LogMessage.SUCCESS_GET_SECTIONS, "Dashboard" as string)
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err)
        customLogger.error(LogMessage.FAILED_GET_SECTIONS, "Dashboard" as string)
      })
    return { data: result.map((m: ResponseEnvSectionRead) =>  m.e_section ), isSucceed: isSucceed }
  }
}

export class EnvironmentsCollector extends BaseCollector {
  async execute (): Promise<boolean> {
    let isSucceed = false;
    await getLastAllEnvironments(this.mSection)
      .then(({data}) => {
        store.dispatch( saveEnvironment( data ))
        customLogger.success(LogMessage.SUCCESS_GET_ENVIRONMENTS, "Dashboard" as string)
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err)
        customLogger.error(LogMessage.FAILED_GET_ENVIRONMENTS, "Dashboard" as string)
      })
    return isSucceed;
  }
}

export class SwitchesCollector extends BaseCollector {
  async execute (): Promise<boolean> {
    let isSucceed = false;
    await getSwitches(this.mSection)
      .then(({data}) => {
        const grouped: ReducerSaveSwitchesDto = groupBy(data as ResponseSwitchesReadLast[], 'machine');
        store.dispatch( saveSwitch( grouped ));
        customLogger.success(LogMessage.SUCCESS_GET_SWITCHES, "Dashboard" as string)
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err)
        customLogger.error(LogMessage.FAILED_GET_SWITCHES, "Dashboard" as string)
      })
    return isSucceed;
  }
}

export class AutomationsCollector extends BaseCollector {
  async execute (): Promise<boolean> {
    let isSucceed = false;
    await getAutomation(this.mSection)
      .then(({data}) => {
        const {lastAutomations}: ResponseAutomationRead = data;
        const groupedAutomations = groupBy( lastAutomations, 'machine' );
        store.dispatch( saveAutomation( groupedAutomations ) );
        customLogger.success( LogMessage.SUCCESS_GET_AUTOMATIONS, "Dashboard" as string )
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err)
        customLogger.error( LogMessage.FAILED_GET_AUTOMATIONS, "Dashboard" as string )
      })
    return isSucceed;
  }
}

export class CurrentsCollector extends BaseCollector {
  async execute (): Promise<boolean> {
    let isSucceed = false;
    await getAllMachinesCurrent(this.mSection)
      .then(({data}) => {
        store.dispatch( saveCurrent( data ));
        customLogger.success(LogMessage.SUCCESS_GET_CURRENTS, "Dashboard" as string);
        isSucceed = true;
      })
      .catch((err) => {
        console.log(err);
        customLogger.error(LogMessage.FAILED_GET_CURRENTS, "Dashboard" as string);
      });
    return isSucceed;
  }
}

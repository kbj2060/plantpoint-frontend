import {store} from "../redux/store";

export function getReduxData(key: string): any {
  return store.getState()[key];
}
import {loadState} from "@components/LocalStorage";

export function currentUser (): string | undefined {
  if ( !loadState('authentication') ) {
    return undefined;
  } else {
    return loadState('authentication')['status']['currentUser']
  }
}
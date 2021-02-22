import {loadState} from "../components/LocalStorage";

export default function getCurrentUser () {
    return loadState('authentication')['status']['currentUser'];
  }

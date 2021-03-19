import {store} from "@redux/store";

export const checkLogin = () => {
  return store.getState()['authentication']['login']['status'] === "SUCCESS"
}
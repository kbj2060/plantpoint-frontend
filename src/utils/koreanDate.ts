import moment from "moment";
import "moment/locale/ko";

export function koreanDate (): string {
  return moment(new Date()).format('LLLL').toString();
}
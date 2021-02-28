import moment from "moment";
import "moment/locale/ko";

export function changeToKoreanDate (date: string | Date) {
  return moment(date).format('LLLL').toString();
}
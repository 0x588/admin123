/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

export function curTimeStatus(start: number, end: number): string {
  const now = dayjs().unix();
  if(start > now) {
    return "未开始"
  } else if (start < now && end > now) {
    return "进行中"
  } else {
    return "已结束"
  }
}

export const dateUtil = dayjs;

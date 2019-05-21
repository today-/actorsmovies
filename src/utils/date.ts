import {distanceInWordsToNow, format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en';
import {i18n} from '~/i18n';

export type AnyDate = string | number | Date;

export const SERVER_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function toHuman(date: AnyDate) {
  return distanceInWordsToNow(date, {
    locale: i18n.language === 'ru' ? ru : en,
    addSuffix: true,
    includeSeconds: false
  });
}

export function toServer(date: AnyDate = new Date()) {
  return format(date, SERVER_FORMAT);
}

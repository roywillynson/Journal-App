import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat);


export const getDayString = (date) =>  dayjs(date).format('dddd');
export const getCardinalDay = (date) => dayjs(date).format('Do');
export const getDateExtend = (date) => dayjs(date).format('DD [de] MMMM YYYY ');

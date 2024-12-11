import { ColorValue } from 'react-native';

import moment from 'moment';

import theme from 'src/themes';

export const DATE_FORMAT_HHMM = 'HH:mm';
export const DATE_FORMAT_DDMMYYYY = 'DD/MM/YYYY';
export const DATE_FORMAT_DDMMYYYYTHHMMSS = "YYYY-MM-DD'T'HH:mm:ss";
export const DATE_FORMAT_DDMMYYYYTHHMMSS_DAY_FILTER = 'YYYY-MM-DDTHH:mm:ss';
export const DATE_FORMAT_DDMMYYYYTHHMM = 'DD-MM-YYYY HH:mm';
export const DATE_FORMAT_HHMMDDMMYYYY = 'HH:mm DD/MM/YYYY';

export const DATE_FORMAT_DDMMYYYYHHMM = 'DD/MM/YYYY - HH:mm';

export const formatDate = (date: Date | string, format: string): string => {
  return moment(date).format(format);
};

export const getRemainingTimes = (
  endDate: string,
): { time: string; color: ColorValue } => {
  const LIMIT_MINUTES = 60;

  const LIMIT_HOURS = LIMIT_MINUTES * 24;

  const LIMIT_DAYS = LIMIT_HOURS * 5;

  const remainingMinutes = moment(endDate).diff(moment(new Date()), 'minutes');

  if (remainingMinutes < 0)
    return {
      time: 'Đã kết thúc',
      color: theme.colors.error,
    };

  if (remainingMinutes < LIMIT_MINUTES)
    return {
      time: `Kết thúc trong ${remainingMinutes} phút`,
      color: theme.colors.warning,
    };

  if (remainingMinutes < LIMIT_HOURS)
    return {
      time: `Kết thúc trong ${Math.floor(remainingMinutes / 60)} giờ`,
      color: theme.colors.warning,
    };

  if (remainingMinutes < LIMIT_DAYS)
    return {
      time: `Kết thúc trong ${Math.floor(remainingMinutes / 60 / 24)} ngày`,
      color: theme.colors.textNormal,
    };

  return {
    time: `Kết thúc: ${formatDate(endDate, DATE_FORMAT_HHMMDDMMYYYY)}`,
    color: theme.colors.textNormal,
  };
};

interface TimeToAdd {
  minutes?: number;
  seconds?: number;
  hours?: number;
}

// export const plusDate = (date: Date, timeToAdd: TimeToAdd = {}): Date => {
//   const newDate = new Date(date);

//   const { minutes = 0, seconds = 0, hours = 0 } = timeToAdd;

//   newDate.setMinutes(newDate.getMinutes() + minutes);
//   newDate.setSeconds(newDate.getSeconds() + seconds);
//   newDate.setHours(newDate.getHours() + hours);

//   return newDate;
// };

export const plusDate = (date: Date, timeToAdd: TimeToAdd = {}): Date => {
  const newDate = new Date(date);

  const { minutes = 0, seconds = 0, hours = 0 } = timeToAdd;

  const totalMinutes = newDate.getMinutes() + minutes;

  const roundedMinutes = Math.round(totalMinutes / 15) * 15;

  const additionalHours = Math.floor(roundedMinutes / 60);

  newDate.setMinutes(roundedMinutes % 60);
  newDate.setSeconds(newDate.getSeconds() + seconds);
  newDate.setHours(newDate.getHours() + hours + additionalHours);

  return newDate;
};

interface DaysAhead {
  dayOfWeek: string;
  formattedDate: string;
  date: Date;
}
export const getDaysAhead = (number: number) => {
  const days = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];

  const today = new Date();

  const results: DaysAhead[] = [];

  for (let i = 0; i <= number; i++) {
    const nextDay = new Date();

    nextDay.setDate(today.getDate() + i);
    const dayOfWeek = days[nextDay.getDay()];

    const formattedDate = `${nextDay.getDate()}/${nextDay.getMonth() + 1}`;

    results.push({
      dayOfWeek,
      formattedDate,
      date: nextDay,
    });
  }

  return results;
};

export const getHourList = (
  openHour: number,
  openMinute: number,
  closeHour: number,
  closeMinute: number,
) => {
  const hourList: string[] = [];

  for (let h = openHour; h <= closeHour; h++) {
    const startMin = h === openHour ? openMinute : 0;

    const endMin = h === closeHour ? closeMinute : 59;

    for (let m = startMin; m <= endMin; m += 30) {
      const hour = h.toString().padStart(2, '0');

      const minute = m.toString().padStart(2, '0');

      hourList.push(`${hour}:${minute}`);
    }
  }

  return hourList;
};

export const isCurrentTimeGreater = (hour: string) => {
  const now = new Date();

  const currentHour = now.getHours();

  const currentMinute = now.getMinutes();

  const [inputHour, inputMinute] = hour.split(':').map(Number);

  if (currentHour > inputHour) {
    return true;
  } else if (currentHour === inputHour && currentMinute > inputMinute) {
    return true;
  }

  return false;
};

export const checkUpComing = (startDate?: string) => {
  if (startDate) {
    const startDateLocal = new Date(startDate);

    const now = new Date();

    return startDateLocal.getTime() > now.getTime();
  }

  return false;
};

export const convertStrHhmmssToHhmm = (timeStr?: string) => {
  if (!timeStr) {
    return '';
  }

  const [hours, minutes] = timeStr.split(':');

  return `${hours}:${minutes}`;
};

export const isCurrentTimeInRange = (
  startTime?: string,
  endTime?: string,
  now?: Date,
): boolean => {
  if (!startTime || !endTime || !now) {
    return false;
  }

  const currentHours = now.getHours();

  const currentMinutes = now.getMinutes();

  const [startHours, startMinutes] = startTime.split(':').map(Number);

  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  const startTotalMinutes = startHours * 60 + startMinutes;

  const endTotalMinutes = endHours * 60 + endMinutes;

  return (
    currentTotalMinutes >= startTotalMinutes &&
    currentTotalMinutes <= endTotalMinutes
  );
};

export const timeAgo = (publishDate: string) => {
  const now = moment();

  const then = moment(publishDate);

  const diffInMinutes = now.diff(then, 'minutes');

  const diffInHours = now.diff(then, 'hours');

  const diffInDays = now.diff(then, 'days');

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 30) {
    return `${diffInHours} days ago`;
  } else if (diffInHours < 365) {
    return `${Math.floor(diffInDays / 30)} months ago`;
  } else {
    return `${diffInDays} years ago`;
  }
};

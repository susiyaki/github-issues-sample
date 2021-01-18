import dayjs from 'dayjs';

export const pastTimeFormat = (date: Date): string => {
  const event = dayjs(date);
  const now = dayjs();

  const diffYears = now.diff(event, 'year');
  if (diffYears >= 1) {
    return diffYears === 1 ? 'last year' : `${diffYears} years ago`;
  }

  const diffMonths = now.diff(event, 'month');
  if (diffMonths >= 1) {
    return diffMonths === 1 ? 'last month' : `${diffMonths} months ago`;
  }

  const diffDays = now.diff(event, 'day');
  if (diffDays >= 1) {
    return diffDays === 1 ? 'yesterday' : `${diffDays} days ago`;
  }

  const diffHours = now.diff(event, 'hour');
  if (diffHours >= 1) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  }

  const diffMinutes = now.diff(event, 'minute');
  if (diffMinutes >= 1) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  }

  const diffSecounds = now.diff(event, 'second');
  return diffSecounds <= 10 ? 'now' : `${diffSecounds} seconds ago`;
};

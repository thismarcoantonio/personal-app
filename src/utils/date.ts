import dayjs from "dayjs";

interface Options {
  humanize?: boolean;
}

const DATE_FORMAT = "MM/DD/YYYY";
const DATE_TIME_FORMAT = `${DATE_FORMAT} [•] HH:MM`;
const DATE_FORMAT_HUMANIZED = "dddd, MMMM DD";
const DATE_TIME_FORMAT_HUMANIZED = `${DATE_FORMAT_HUMANIZED} [•] HH:MM`;

export function formatDate(value?: string | number, options: Options = {}) {
  if (!value) return "";
  return dayjs(value).format(
    options.humanize ? DATE_FORMAT_HUMANIZED : DATE_FORMAT
  );
}

export function formatDateTime(value?: string | number, options: Options = {}) {
  if (!value) return "";
  return dayjs(value).format(
    options.humanize ? DATE_TIME_FORMAT_HUMANIZED : DATE_TIME_FORMAT
  );
}

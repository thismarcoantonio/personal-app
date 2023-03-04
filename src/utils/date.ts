import dayjs from "dayjs";

interface Options {
  humanize?: boolean;
}

const DATE_FORMAT = "MM/DD/YYYY";
const DATE_TIME_FORMAT = `${DATE_FORMAT} [•] hh:mm A`;
const DATE_FORMAT_HUMANIZED = "dddd, MMMM DD";
const DATE_TIME_FORMAT_HUMANIZED = `${DATE_FORMAT_HUMANIZED} [•] hh:mm A`;

export function formatDate(
  value?: string | number | null,
  options: Options = {}
) {
  if (!value) return "";
  return dayjs(value).format(
    options.humanize ? DATE_FORMAT_HUMANIZED : DATE_FORMAT
  );
}

export function formatDateTime(
  value?: string | number | null,
  options: Options = {}
) {
  if (!value) return "";
  return dayjs(value).format(
    options.humanize ? DATE_TIME_FORMAT_HUMANIZED : DATE_TIME_FORMAT
  );
}

import dayjs, { Dayjs } from 'dayjs';

interface Props {
  value: any;
  options?: {
    format: string;
  };
}

export default function GetDate({ value, options = { format: 'lll' } }: Props): Dayjs | string {
  const { format } = options;

  const result = dayjs(isNaN(value) ? value : value * 1000);

  if (format) {
    return result.format(format);
  }

  return result;
}

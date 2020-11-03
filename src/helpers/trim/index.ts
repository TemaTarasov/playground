export default function Trim<P>(value: string | P, force?: boolean): string | P {
  return value && typeof value === 'string' ? value.trim().replace(/ +/g, force ? '' : ' ') : value;
}

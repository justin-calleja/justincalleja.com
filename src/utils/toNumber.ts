export function toNumber(x: any) {
  if (Array.isArray(x)) return parseInt(x[0]);
  if (x === undefined) return 0;
  if (typeof x === 'string') return parseInt(x);

  return 0;
}

export default toNumber;

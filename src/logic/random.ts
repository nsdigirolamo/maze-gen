/** Generate random integer between [min, max) */
export function genRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * > 0 means sort b before a
 * < 0 means sort a before b
 * 0 means keep original order
 *
 * @param {string} [dateStrA]
 * @param {string} [dateStrB]
 * @returns number
 */

export const sortStringDates = (dateStrA: string, dateStrB: string) => {
  if (!dateStrA) {
    // If B is defined but A isn't; A before B to keep drafts first
    return !dateStrB ? 0 : -1;
  }

  // at this point, A is defined, so if B isn't, then B before A to keep drafts first
  if (!dateStrB) {
    return 1;
  }

  return new Date(dateStrA) < new Date(dateStrB) ? 1 : -1;
};

export default sortStringDates;

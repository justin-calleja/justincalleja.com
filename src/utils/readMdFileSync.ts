import type { GrayMatterFile } from 'gray-matter';

import { readFileSync } from 'fs';
import matter from 'gray-matter';

export const readMdFileSync = (filePath: string): GrayMatterFile<string> => {
  const txt = readFileSync(filePath, 'utf8');
  return matter(txt);
};

export default readMdFileSync;

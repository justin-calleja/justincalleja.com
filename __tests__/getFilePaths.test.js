const { getFilePaths } = require('../src/utils/getFilePaths');
const { join } = require('path');

test('Gets all files under given dir when no extensions is given', () => {
  const result = getFilePaths(join(__dirname, 'mockDir'));
  expect(result.length).toBe(7);
  expect(result[0].endsWith('mockDir/2020/post-a/index.mdx')).toBe(true);
});

test('Only gets files with the given extension when extensions is given', () => {
  const result = getFilePaths(join(__dirname, 'mockDir'), ['.mdx', '.md']);
  expect(result.length).toBe(5);
  for (res of result) {
    expect(res.endsWith('.mdx') || res.endsWith('.md')).toBe(true);
  }
});

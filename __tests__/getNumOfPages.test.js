import getNumOfPages from '../src/utils/getNumOfPages';

test('basic sanity check', () => {
  expect(
    getNumOfPages({
      postsOnFirstPage: 2,
      postsPerPage: 4,
      total: 20,
    }),
  ).toBe(6);

  expect(
    getNumOfPages({
      postsOnFirstPage: 2,
      postsPerPage: 4,
      total: 18,
    }),
  ).toBe(5);

  expect(
    getNumOfPages({
      postsOnFirstPage: 2,
      postsPerPage: 4,
      total: 2,
    }),
  ).toBe(1);

  expect(
    getNumOfPages({
      postsOnFirstPage: 2,
      postsPerPage: 4,
      total: 1,
    }),
  ).toBe(1);

  expect(
    getNumOfPages({
      postsOnFirstPage: 2,
      postsPerPage: 4,
      total: 4,
    }),
  ).toBe(2);

  expect(
    getNumOfPages({
      postsOnFirstPage: 2,
      postsPerPage: 4,
      total: 11,
    }),
  ).toBe(4);
});

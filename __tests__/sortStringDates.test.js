import sortStringDates from '../src/utils/sortStringDates';

test('...', () => {
  const posts = [
    { dateCreated: '2019-01-01T05:35:07.322Z' },
    { dateCreated: undefined },
    { dateCreated: '2019-01-20T05:35:07.322Z' },
    { dateCreated: '2019-05-06T05:35:07.322Z' },
    { dateCreated: '2019-01-03T05:35:07.322Z' },
    { dateCreated: '2020-02-02T05:35:07.322Z' },
    { dateCreated: '2020-02-16T05:35:07.322Z' },
    { dateCreated: '2020-01-01T05:35:07.322Z' },
    { dateCreated: '2020-02-16T05:35:07.322Z' },
    { dateCreated: '2020-02-16T05:35:07.322Z' },
    { dateCreated: '2021-04-10T05:35:07.322Z' },
  ];

  const result = posts.sort((a, b) =>
    sortStringDates(a.dateCreated, b.dateCreated),
  );
  expect(result.length).toBe(posts.length);
  expect(result[0].dateCreated).toBe(undefined);
  expect(result[1].dateCreated).toBe('2021-04-10T05:35:07.322Z');
  expect(result[2].dateCreated).toBe('2020-02-16T05:35:07.322Z');
  expect(result[3].dateCreated).toBe('2020-02-16T05:35:07.322Z');
  expect(result[4].dateCreated).toBe('2020-02-16T05:35:07.322Z');
  expect(result[5].dateCreated).toBe('2020-02-02T05:35:07.322Z');
  expect(result[6].dateCreated).toBe('2020-01-01T05:35:07.322Z');
  expect(result[7].dateCreated).toBe('2019-05-06T05:35:07.322Z');
  expect(result[8].dateCreated).toBe('2019-01-20T05:35:07.322Z');
  expect(result[9].dateCreated).toBe('2019-01-03T05:35:07.322Z');
  expect(result[10].dateCreated).toBe('2019-01-01T05:35:07.322Z');
});

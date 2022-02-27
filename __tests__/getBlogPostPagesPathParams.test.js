import getBlogPostPagesPathParams from '../src/utils/getBlogPostPagesPathParams';

test('numOfBlogPosts = 10; maxPostsOnBlogHomePage = 2; maxPostsPerPage = 4', () => {
  const result = getBlogPostPagesPathParams({
    numOfBlogPosts: 10,
    maxPostsOnBlogHomePage: 2,
    maxPostsPerPage: 4,
  });

  expect(JSON.stringify(result, null, 2)).toMatchInlineSnapshot(`
    "[
      {
        \\"params\\": {
          \\"pageNum\\": []
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"1\\"
          ]
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"2\\"
          ]
        }
      }
    ]"
  `);
});

test('numOfBlogPosts = 21; maxPostsOnBlogHomePage = 3; maxPostsPerPage = 10', () => {
  const result = getBlogPostPagesPathParams({
    numOfBlogPosts: 21,
    maxPostsOnBlogHomePage: 3,
    maxPostsPerPage: 10,
  });

  expect(JSON.stringify(result, null, 2)).toMatchInlineSnapshot(`
    "[
      {
        \\"params\\": {
          \\"pageNum\\": []
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"1\\"
          ]
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"2\\"
          ]
        }
      }
    ]"
  `);
});

test('numOfBlogPosts = 24; maxPostsOnBlogHomePage = 3; maxPostsPerPage = 10', () => {
  const result = getBlogPostPagesPathParams({
    numOfBlogPosts: 24,
    maxPostsOnBlogHomePage: 3,
    maxPostsPerPage: 10,
  });

  expect(JSON.stringify(result, null, 2)).toMatchInlineSnapshot(`
    "[
      {
        \\"params\\": {
          \\"pageNum\\": []
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"1\\"
          ]
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"2\\"
          ]
        }
      },
      {
        \\"params\\": {
          \\"pageNum\\": [
            \\"3\\"
          ]
        }
      }
    ]"
  `);
});

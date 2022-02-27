import blogPostsFilter from '../src/utils/blogPostsFilter';

describe('blogPostsFilter', () => {
  const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

  const allPosts = [
    { draft: true, slug: '/a' },
    { slug: '/b' },
    { draft: undefined, slug: '/c' },
    { archive: true, draft: true, slug: '/d' },
    { archive: undefined, draft: undefined, slug: '/e' },
  ];

  test('when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';

    const blogPosts = allPosts.filter(blogPostsFilter);

    expect(JSON.stringify(blogPosts, null, 2)).toMatchInlineSnapshot(`
      "[
        {
          \\"slug\\": \\"/b\\"
        },
        {
          \\"slug\\": \\"/c\\"
        },
        {
          \\"slug\\": \\"/e\\"
        }
      ]"
    `);

    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
  });

  test('when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';

    const blogPosts = allPosts.filter(blogPostsFilter);

    expect(JSON.stringify(blogPosts, null, 2)).toMatchInlineSnapshot(`
      "[
        {
          \\"draft\\": true,
          \\"slug\\": \\"/a\\"
        },
        {
          \\"slug\\": \\"/b\\"
        },
        {
          \\"slug\\": \\"/c\\"
        },
        {
          \\"slug\\": \\"/e\\"
        }
      ]"
    `);

    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
  });
});

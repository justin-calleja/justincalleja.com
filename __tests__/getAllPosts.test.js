const { getAllPosts } = require("../src/api");
const { join } = require("path");

test('Returns slug for each post even when "slug" is not specified.', () => {
  expect(JSON.stringify(getAllPosts([], join(__dirname, "mockDir")), null, 2))
    .toMatchInlineSnapshot(`
    "[
      {
        \\"slug\\": \\"/2020/post-a\\"
      },
      {
        \\"slug\\": \\"/meh/bleh/blah\\"
      }
    ]"
  `);
});

test('Returns slug for each post as well as the "title" and "date" fields', () => {
  expect(
    JSON.stringify(
      getAllPosts(["title", "dateCreated"], join(__dirname, "mockDir")),
      null,
      2
    )
  ).toMatchInlineSnapshot(`
    "[
      {
        \\"title\\": \\"Another Blog Post 2\\",
        \\"dateCreated\\": \\"2020-02-16T05:35:07.322Z\\",
        \\"slug\\": \\"/2020/post-a\\"
      },
      {
        \\"title\\": \\"Another Blog Post 4\\",
        \\"dateCreated\\": \\"2020-01-16T05:35:07.322Z\\",
        \\"slug\\": \\"/meh/bleh/blah\\"
      }
    ]"
  `);
});

test('Returns slug for each post as well as the "content" field', () => {
  expect(
    JSON.stringify(
      getAllPosts(["content"], join(__dirname, "mockDir")),
      null,
      2
    )
  ).toMatchInlineSnapshot(`
    "[
      {
        \\"content\\": \\"\\\\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.\\\\n\\\\nVenenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.\\\\n\\\\n## Lorem Ipsum\\\\n\\\\nTristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.\\\\n\\\\n### Why?\\\\n\\\\n\`\`\`jsx\\\\n<MDXProvider>{post.content}</MDXProvider>\\\\n\`\`\`\\\\n\\\\n\`\`\`js\\\\nconst doStuff = () => {\\\\n  return console.log('hey');\\\\n};\\\\n\`\`\`\\\\n\\\\n\`\`\`elixir\\\\n  defp deps do\\\\n    [{:httpoison, \\\\\\"~> 0.8.0\\\\\\"}, {:poison, \\\\\\"~> 1.5\\\\\\"}]\\\\n  end\\\\n\`\`\`\\\\n\\\\n<SyntaxHighlighter language=\\\\\\"javascript\\\\\\">\\\\n  {\`\\\\n    const x = 23\\\\n    const doStuff = () => {\\\\n      return console.log('hey')\\\\n    }\\\\n  \`}\\\\n</SyntaxHighlighter>\\\\n\\",
        \\"slug\\": \\"/2020/post-a\\"
      },
      {
        \\"content\\": \\"\\\\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.\\\\n\\\\nVenenatis cras sed felis eget velit. Consectetur libero id faucibus nisl tincidunt. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.\\\\n\\\\n## Lorem Ipsum\\\\n\\\\nTristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.\\\\n\\",
        \\"slug\\": \\"/meh/bleh/blah\\"
      }
    ]"
  `);
});

const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { resolve } = require("path")

const PostTemplate = resolve("src/templates/post-template/index.js")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode })

    const { createNodeField } = actions
    createNodeField({
      node,
      name: "slug",
      value: `/blog/posts${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx ${
        process.env.NODE_ENV === "production"
          ? "(filter: { frontmatter: { published: { ne: false } } })"
          : ""
      } {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMdx.edges
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: PostTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components"),
        "~utils": path.resolve(__dirname, "src/utils"),
        "~styles": path.resolve(__dirname, "src/styles"),
      },
    },
  })
}

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PostPreview from "~components/PostPreview"

const getMardownPosts = graphql`
  {
    allMdx(sort: { fields: [frontmatter___dateCreated], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            dateCreated
            formattedDateCreated
            dateUpdated
            formattedDateUpdated
            tags
            tocEnabled
            excerpt
            published
          }
          excerpt
        }
      }
    }
  }
`

const eligibleNodes = ({ node }) => {
  if (node.fields.slug.endsWith("README/")) return false

  return !(
    process.env.NODE_ENV === "production" &&
    node.frontmatter.published === false
  )
}

export default () => (
  <div>
    <StaticQuery
      query={getMardownPosts}
      render={(data) => (
        <>
          {data.allMdx.edges.filter(eligibleNodes).map(({ node }) => {
            return (
              <PostPreview
                key={node.id}
                slug={node.fields.slug}
                title={node.frontmatter.title}
                dateCreated={node.frontmatter.dateCreated}
                formattedDateCreated={node.frontmatter.formattedDateCreated}
                dateUpdated={node.frontmatter.dateUpdated}
                formattedDateUpdated={node.frontmatter.formattedDateUpdated}
                tags={node.frontmatter.tags}
                excerpt={node.frontmatter.excerpt || node.excerpt}
              />
            )
          })}
        </>
      )}
    />
  </div>
)

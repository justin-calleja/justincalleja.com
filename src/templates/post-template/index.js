import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import { graphql } from "gatsby"
import { getSecondaryHighlightColor } from "~utils/theme"
import PostMetaData from "~components/PostMetaData"
import Toc from "~components/Toc"
import { PostContainer, Container } from "./styles"

const Heading = ({ className, tagName, id, children }) => {
  const Tag = tagName

  return (
    <Tag className={className} id={id} onClick={null}>
      <a href={`#${id}`}>{children}</a>
    </Tag>
  )
}

const StyledHeading = styled(Heading)`
  &::before {
    content: "${({ tagName }) =>
      tagName === "h2"
        ? "#"
        : tagName === "h3"
        ? "##"
        : tagName === "h4"
        ? "###"
        : ""}";
    color: ${getSecondaryHighlightColor};
    margin-right: 8px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export const H2 = ({ id, children }) => {
  return <StyledHeading tagName="h2" id={id} children={children} />
}

export const H3 = ({ id, children }) => {
  return <StyledHeading tagName="h3" id={id} children={children} />
}

export const H4 = ({ id, children }) => {
  return <StyledHeading tagName="h4" id={id} children={children} />
}

const PostTemplate = ({ className, data }) => {
  return (
    <Container className={className}>
      <h1>{data.mdx.frontmatter.title}</h1>
      <PostMetaData
        className="post-meta-data"
        dateCreated={data.mdx.frontmatter.dateCreated}
        formattedDateCreated={data.mdx.frontmatter.formattedDateCreated}
        dateUpdated={data.mdx.frontmatter.dateUpdated}
        formattedDateUpdated={data.mdx.frontmatter.formattedDateUpdated}
        tags={data.mdx.frontmatter.tags}
      />
      {data.mdx.frontmatter.tocEnabled ? (
        <Toc>{data.mdx.tableOfContents}</Toc>
      ) : null}
      <PostContainer>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </PostContainer>
    </Container>
  )
}

export default PostTemplate

export const query = graphql`
  query($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        dateCreated
        formattedDateCreated
        dateUpdated
        formattedDateUpdated
        tags
        tocEnabled
      }
      tableOfContents
    }
  }
`

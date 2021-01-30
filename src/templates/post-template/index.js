import React, { useRef } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled, { withTheme } from "styled-components"
import { graphql } from "gatsby"
import { getSecondaryHighlightColor } from "~utils/theme"
import PostMetaData from "~components/PostMetaData"
import Toc from "~components/Toc"
import { PostContainer, Container } from "./styles"
import useScript from "~utils/useScript"

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

const PostTemplate = ({ className, data, theme }) => {
  // TODO: use frontmatter to opt into having a comments section
  // TODO: find a solution for "loading comments". i.e.
  // when theme is changed, iframe is removed and new script is injected
  // with new params and it takes some time to load the new iframe.
  const commentsRef = useRef(null)
  const attributes = {
    // TODO: change repo before going live:
    repo: "justin-calleja/choices",
    "issue-term": "pathname",
    label: "comment",
    theme: theme.name === "dark" ? "github-dark" : "github-light",
    crossorigin: "anonymous",
  }
  useScript("https://utteranc.es/client.js", attributes, commentsRef)

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
        <div className="comments" ref={commentsRef}></div>
      </PostContainer>
    </Container>
  )
}

export default withTheme(PostTemplate)

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

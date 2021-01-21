import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { getSecondaryColor } from "~utils/theme"
import PostMetaData from "~components/PostMetaData"

const Article = styled.article`
  margin-bottom: 2.4rem;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 0.2rem;
    a {
      text-decoration: none;
      color: inherit;
      :hover {
        color: ${getSecondaryColor};
      }
    }
  }

  .continue-reading {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  a:hover {
    text-decoration: none;
  }

  .excerpt {
    margin-top: 1.6rem;
  }
`

const PostPreview = ({
  className,
  title,
  dateCreated,
  formattedDateCreated,
  dateUpdated,
  formattedDateUpdated,
  excerpt,
  slug,
  tags,
}) => {
  return (
    <Article className={className}>
      <h2>
        <Link to={slug}>{title}</Link>
      </h2>
      <PostMetaData
        dateCreated={dateCreated}
        formattedDateCreated={formattedDateCreated}
        dateUpdated={dateUpdated}
        formattedDateUpdated={formattedDateUpdated}
        tags={tags}
      />
      <div className="excerpt">{excerpt}</div>
      <Link className="continue-reading" to={slug}>
        Continue reading…
      </Link>
    </Article>
  )
}

export default PostPreview

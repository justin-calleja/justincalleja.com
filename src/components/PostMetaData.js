import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { getSecondaryBackgroundColor, getSecondaryColor } from "~utils/theme"
import DateEl from "./DateEl"

const UpdatedAt = styled.div`
  margin-top: 0.4rem;

  mark {
    display: inline;
    margin-right: 0.8rem;
    padding: 0.2rem;
    background-color: ${getSecondaryColor};
    color: ${getSecondaryBackgroundColor};
  }
`

const Container = styled.div`
  font-size: 1.4rem;
  line-height: 1.8;

  .tag {
    font-weight: 700;
    margin-right: 0.8rem;
  }
`

const PostMetaData = ({
  className,
  dateCreated,
  formattedDateCreated,
  dateUpdated,
  formattedDateUpdated,
  tags,
}) => {
  return (
    <Container className={className}>
      {formattedDateCreated ? (
        <DateEl dateTiime={dateCreated}>{formattedDateCreated}</DateEl>
      ) : null}
      {tags
        ? tags.map(tag => (
            <Link className="tag" to="#" key={tag}>
              {tag}
            </Link>
          ))
        : null}
      {formattedDateUpdated ? (
        <UpdatedAt>
          <mark>Last updated at: </mark>
          <DateEl dateTiime={dateUpdated}>{formattedDateUpdated}</DateEl>
        </UpdatedAt>
      ) : null}
    </Container>
  )
}

export default PostMetaData

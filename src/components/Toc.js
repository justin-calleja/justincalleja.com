import React, { useState, useRef, useEffect } from "react"
import styled, { css, withTheme } from "styled-components"
// import cn from "classnames"
import {
  getBackgroundColor,
  getColor,
  getSecondaryBackgroundColor,
  getYellowColor,
} from "~utils/theme"
import ArrowLeft from "./Svg/ArrowLeft"

// const minOpacity = 0.5
const maxOpacity = 0.8
const animDuration = "0.6s"
const animTimingFn = "ease-in"

const Collapsable = ({ className, children, isCollapsed, initialHeight }) => {
  const containerRef = useRef()
  const [height, setHeight] = useState(initialHeight)

  //   if (containerRef.current) {
  //     console.log(">>>", containerRef.current.scrollHeight)
  //   }

  useEffect(() => {
    setHeight(containerRef.current.scrollHeight)
  }, [])

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        maxHeight: isCollapsed ? 0 : `${height}px`,
      }}
    >
      {children}
    </div>
  )
}

// requires height...
const Collapsable2 = ({ className, children, isCollapsed, height }) => {
  const style = {
    maxHeight: isCollapsed ? 0 : `${height}px`,
  }
  // <div className={cn(className, "collapsable")} style={style}>
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

Collapsable.defaultProps = {
  initialHeight: 0,
}

// const StyledCollapsable = styled(Collapsable)``
const collapsableStyles = css`
  overflow: hidden;
  overflow-y: scroll;
  transition: max-height ${animDuration} ${animTimingFn};
`

const scrollStyles = css`
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: ${getSecondaryBackgroundColor};
  }

  &::-webkit-scrollbar {
    width: 12px;
    /* background-color: ${getYellowColor}; */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ theme }) =>
      getYellowColor({ theme, opacity: maxOpacity })};
  }
`

// const Collapsable = ({ children }) => {
//   return <Div>{children}</Div>
// }

// ${({ isCollapsed }) =>
//   isCollapsed &&
//   `
// animation: myanim .8s ${animTimingFn} alternate forwards;
// `}
//     @keyframes myanim {
//     from {
//         height: 360px;
//     }
//     to {
//         height: 0;
//         display: none;
//     }
// }

// && is used to increase the specificity of the encapsulated styles so that even
// if Toc is rendered in a component which defines styles for <ol>, the ones in &&
// have more importance.

// max-height: ${360}px;

const TocList = styled.ol`
  list-style-type: none;
  counter-reset: tocItem;
  margin-bottom: 0;
  padding: 0.8rem 1.6rem;
  /* padding: 0 1.6rem 1.6rem 1.6rem; */

  li:before {
    margin-right: 4px;
    content: counters(tocItem, ".") " ";
    counter-increment: tocItem;
    font-weight: 700;
  }

  ol {
    padding-left: 2rem;
    list-style-type: none;
    counter-reset: tocItem;
    margin-bottom: 0;
  }

  a {
    color: ${getColor};
  }
`

// background-image: ${({ theme, isCollapsed }) =>
//   `linear-gradient(to ${isCollapsed ? "left" : "right"}, ${getYellowColor({
//     theme,
//     opacity: maxOpacity,
//   })}, ${getYellowColor({
//     theme,
//     opacity: minOpacity,
//   })})`};

// background-color: ${({ theme }) =>
//   getSecondaryBackgroundColor({ theme, opacity: ${duration} })};
const Summary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
  cursor: pointer;
  background-color: ${({ theme }) => getYellowColor({ theme })};
  opacity: ${maxOpacity};
  /* border-bottom: 4px solid ${getYellowColor}; */
  color: ${getBackgroundColor};
  fill: ${getBackgroundColor};
  /* transition: background-color ${animDuration} ${animTimingFn}, background-image ${animDuration} ${animTimingFn}, opacity ${animDuration} ${animTimingFn}, color ${animDuration} ${animTimingFn}; */
  /* transition: background-image ${animDuration} ${animTimingFn}, color ${animDuration} ${animTimingFn}; */
  transition: background ${animDuration} ${animTimingFn},
    color ${animDuration} ${animTimingFn};
  /* opacity: 1; */
  /* transition: border-color ${animDuration} ${animTimingFn}; */

  .arrow g {
    transition: transform ${animDuration} ${animTimingFn};
  }

  h2 {
    margin: 0;
    font-weight: 700;
  }

  &:focus {
    outline: 0;
  }

  ${({ theme, isCollapsed }) =>
    isCollapsed &&
    css`
      /* background-color: ${getYellowColor({ theme, opacity: 0.5 })}; */
      /* background-color: ${getYellowColor}; */
      /* color: ${getColor}; */
    `}
`

// const C = styled(Collapsable)`
//   ${collapsableStyles}
//   ${scrollStyles}
// `

const C2 = styled(Collapsable2)`
  ${collapsableStyles}
  ${scrollStyles}
`

const Border = styled.div`
  border: 4px solid ${({ theme }) => getYellowColor({ theme })};
  border-top: none;
  background-color: ${getSecondaryBackgroundColor};
  opacity: ${maxOpacity};
  transition: opacity ${animDuration} ${animTimingFn};
  /* transition: border-color ${animDuration} ${animTimingFn}; */
  /* transition: border-width ${animDuration} ${animTimingFn}; */
  ${({ theme, isCollapsed }) =>
    isCollapsed &&
    css`
      opacity: 0;
      /* border-color: ${getYellowColor({ theme, opacity: 0 })}; */
      /* border-width: 0; */
    `}
`

const Container = styled.div`
  margin: 2.4rem 0;
`

const Toc = ({ children, height, theme }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!children?.items?.length) {
    return null
  }

  return (
    <Container>
      <Summary
        role="button"
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2>Contents</h2>
        <ArrowLeft
          className="arrow"
          rotationDegrees={isCollapsed ? 0 : -90}
          width={40}
          height={40}
        />
      </Summary>
      <Border isCollapsed={isCollapsed}>
        {/* <C isCollapsed={isCollapsed} initialHeight={height}> */}
        <C2 isCollapsed={isCollapsed} height={height}>
          <TocList>
            {children.items.map((item) => {
              return (
                <li key={item.url}>
                  <a href={item.url} key={item.url}>
                    {item.title}
                  </a>
                  {item.items && item.items.length > 0 ? (
                    <ol>
                      {item.items.map((i) => (
                        <li key={i.url}>
                          <a href={i.url} key={i.url}>
                            {i.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </li>
              )
            })}
          </TocList>
        </C2>
      </Border>
    </Container>
  )
}
Toc.defaultProps = {
  height: 360,
  //   height: 200,
  //   height: 500,
}

export default withTheme(Toc)

// ul {
//   scrollbar-width: thin;
//   scrollbar-color: red green;
// }

// ul::-webkit-scrollbar-thumb {
//   background-color: blue;
// }

// ul::-webkit-scrollbar-track {
//   background-color: pink;
// }

// #style-1::-webkit-scrollbar-track
// {
// 	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
// 	border-radius: 10px;
// 	background-color: #F5F5F5;
// }

// #style-1::-webkit-scrollbar
// {
// 	width: 12px;
// 	background-color: #F5F5F5;
// }

// #style-1::-webkit-scrollbar-thumb
// {
// 	border-radius: 10px;
// 	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
// 	background-color: #555;
// }

// const StyledToc2 = styled(Toc)`
//   border: 2px yellow;
//   color: pink;
//   padding: 1.6rem 0;
//   margin: 1.6rem 0;
//   transition: height 1s ${animTimingFn};
//   user-select: none;
//   height: 250px;

//   summary {
//     cursor pointer
//   }

//   #toc-list {
//     transition: height 1s ${animTimingFn};
//     overflow: hidden;
//     overflow-y: scroll;
//   }

//   &[open] {
//     color: yellow;
//     height: 250px;
//     #toc-list {
//       height: 250px;
//     }
//   }

//   &:not([open]) {
//     height: 1em;
//     #toc-list {
//       height: 0;
//     }
//   }
// `

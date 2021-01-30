import React, { useRef } from "react"
import useScript from "~utils/useScript"

const attributes = {
  repo: "justin-calleja/choices",
  //   repo: "justin-calleja/justincalleja.com",
  "issue-term": "pathname",
  label: "comment",
  theme: "github-dark",
  crossorigin: "anonymous",
}

const Comments = ({ themeName }) => {
  const initThemeNameRef = useRef(themeName)
  // avoid re-rendering the script tag by using the ref value for the
  // theme name rather than the prop. Use postMessage to change the
  // theme instead of removing the iframe and injecting the utterance
  // script again.
  attributes.theme = initThemeNameRef.current
  const commentsRef = useRef(null)
  useScript("https://utteranc.es/client.js", attributes, commentsRef)

  const prevThemeNameRef = useRef(themeName)
  // if themeName prop has changed:
  if (prevThemeNameRef.current !== themeName) {
    prevThemeNameRef.current = themeName
    if (commentsRef.current) {
      const iframe = commentsRef.current.getElementsByTagName("iframe")[0]
      if (iframe) {
        iframe.contentWindow.postMessage(
          { type: "set-theme", theme: themeName },
          "*",
        )
      }
    }
  }

  return <div ref={commentsRef}></div>
}

export default Comments

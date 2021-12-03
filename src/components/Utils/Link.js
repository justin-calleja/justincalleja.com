import { useEffect, useRef } from "react"

export const Link = ({ href }) => {
  const styleTagRef = useRef(null)

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = href

    styleTagRef.current = document.head.appendChild(link)

    return () => {
      if (styleTagRef.current) {
        document.head.removeChild(styleTagRef.current)
      }
    }
  }, [href])

  return null
}

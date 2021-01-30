// @ts-check
import { useEffect } from "react"

/**
 *
 * @param {string} url
 * @param {{ [key: string]:  string }} attributes
 * @param {MutableRefObject<HTMLElement | null>} parentRef
 */
const useScript = (url, attributes = {}, parentRef) => {
  useEffect(() => {
    const script = document.createElement("script")

    script.src = url
    script.async = true

    if (attributes) {
      for (let [key, value] of Object.entries(attributes)) {
        script.setAttribute(key, value)
      }
    }

    const parentEl =
      parentRef && parentRef.current ? parentRef.current : document.body
    parentEl.appendChild(script)

    return () => {
      // NOTE: script might have been removed e.g. when using utteranc
      // script (for comments), once you inject the script it overwrites
      // itself to include an iframe in its place. i.e. the original script
      // tag is no longer in the html.
      try {
        parentEl.removeChild(script)
      } catch (err) {
        // The node to be removed is not a child of this node
        if (err.message.includes("is not a child of this node")) {
          parentEl.innerHTML = ""
        }
      }
    }
  }, [url, attributes, parentRef])
}

export default useScript

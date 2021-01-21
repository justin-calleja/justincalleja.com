import { useEffect, useRef, useState } from "react"

/**
 * If user has scrolled more than threshold down and is
 * currently scrolling down (current > previous), this
 * function returns true.
 *
 * @param {MutableRefObject<number>} store
 * @param {number} threshold
 */
function checkIfIsScrollingDown(store, threshold) {
  const previous = store.current
  store.current = window.pageYOffset

  return store.current < previous ? false : store.current > threshold
}

export default (threshold = 70) => {
  const store = useRef(0)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollingDown(checkIfIsScrollingDown(store, threshold))
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return isScrollingDown
}

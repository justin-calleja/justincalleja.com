import useLocalStorage from "react-use-localstorage"

export default (key, initial) =>
  // NOTE: it's true the hook is called conditionally but for SSR will always take one branch and
  // client side rendering will always be the other:
  // eslint-disable-next-line react-hooks/rules-of-hooks
  typeof window !== "undefined" ? useLocalStorage(key, initial) : [initial]

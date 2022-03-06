Seems like using HTML comments will break the code that is trying to render JSX components in `.mdx` files.

e.g. it has a problem with the exclamation mark:

```
Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)

> 70 | <!-- TODO: make a component that only centers for mobile: -->
     |  ^
```

I can use the suggestion of using `{/* text */}` for comments... but need to find an editor plugin that highlights appropriately.

Seems like using HTML comments will break the code that is trying to render JSX components in `.mdx` files.

e.g. it has a problem with the exclamation mark:

```
Unexpected character `!` (U+0021) before name, expected a character that can start a name, such as a letter, `$`, or `_` (note: to create a comment in MDX, use `{/* text */}`)

> 70 | <!-- TODO: make a component that only centers for mobile: -->
     |  ^
```

I can use the suggestion of using `{/* text */}` for comments... but need to find an editor plugin that highlights appropriately.

```bash
sed -i '' -E "s/\!\[(.+)\]\(res(.+)\)/<Image slug=\{slug\} path=\"\2\" alt=\"\1\" \/>/g" /Users/justincalleja/web-presence/next-js-based/src/mdx/posts/2021/godot-card-flipping/index.mdx
```

Some colors picked from:
https://github.com/dracula/visual-studio-code/blob/master/src/dracula.yml

```css
body {
  color: #21222c;
  color: #ff5555;
  color: #50fa7b;
  color: #f1fa8c;
  color: #bd93f9;
  color: #ff79c6;
  color: #8be9fd;
  color: #f8f8f2;
  color: #6272a4;
  color: #ff6e6e;
  color: #69ff94;
  color: #ffffa5;
  color: #d6acff;
  color: #ff92df;
  color: #a4ffff;
  color: #ffffff;
}
```

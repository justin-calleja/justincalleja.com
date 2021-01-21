## published

`published: false` is used to mark a blog post as "show in dev mode only". It will not be accessible once the site is built for production.

### Some more info

There are 2 parts to consider:

1. Excluding the draft pages from being created in `gatsby-node.js`'s `createPages`.
1. Excluding the links to the page in `src/pages/blog.js`

#### Excluding the draft pages from being created

This is the easier of the two. Since the graphql query in `createPages` is dyanmic, it accepts variables in its string interpolation so you can simply filter out posts with `published: false` in their frontmatter. Or alternatively, you can just query for everything and then just don't call `createPage` for posts with `published` set to false.

```js
  const result = await graphql(`
    {
      allMdx ${
        process.env.NODE_ENV === "production"
          ? "(filter: { frontmatter: { published: { ne: false } } })"
          : ""
      } {
// ...
```

#### Excluding the links ot the page

This is a bit trickier. The graphql query here is static so the string you pass to it cannot have variables. To get around this, I'm including `published` in the static query and then filtering out the unpublished posts when it's `production`:

```js
const eligibleNodes = ({ node }) =>
  !(
    process.env.NODE_ENV === "production" &&
    node.frontmatter.published === false
  )
// ...

// when rendering the links:
    {data.allMdx.edges.filter(eligibleNodes).map(({ node }) => {
// Create the links to the posts...
// ...
```

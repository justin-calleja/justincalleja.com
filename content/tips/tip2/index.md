---
title: Tip 2
summary: Use `make` to create a slice with a set capacity when we know exactly how many elements we need.
---

> … if we know exactly how many elements we will append to the slice upfront… we should always write it as…
>
> **— [Efficient Go](https://www.oreilly.com/library/view/efficient-go/9781098105709/cover.html)**

Write it as:

```go
// To specify a capacity, pass a third argument to make:
// https://go.dev/tour/moretypes/13
slice := make([]string, 0, n*3)
for i := 0; i < n; i++ {
    slice = append(slice, "a", "b", "c") 
}
```

instead of:

```go
slice := []string{}
for i := 0; i < n; i++ {
    slice = append(slice, "a", "b", "c") 
}
```

i.e. we know we will need `n*3` capacity in the slice so might as well create it as such beforehand.


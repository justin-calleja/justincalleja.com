---
title: Tip 1
summary: How to `go get` from gitlab private repos in subgroups.
---

Had a hard time trying to `go get` from a private `gitlab.com/orgname` repo in a `subgroup` today. E.g. if I tried:

```sh
curl -s https://gitlab.com/orgname/groupname/subgroupname/tmprepo\?go-get\=1
```

… then I'd get back that it was trying to get from: `go get https://gitlab.com/orgname/groupname` and not the full path to the repo.

This [issue](https://gitlab.com/gitlab-org/gitlab-foss/-/issues/30785) is known, but looks like fixing it would introduce another security issue.

Didn't go into the details. What finally worked was:

- Use `.git` in `go.mod`'s `module`, examples:
  - `module gitlab.com/orgname/groupname/subgroupname/tmprepo.git`
  - `module gitlab.com/orgname/groupname/subgroupname/tmprepo.git/tmpapi`
    - This is another module (just for illustration) in the git repo (which is a go workspace with a `go.work` file).
- I had to generate an access token from the project's `-/settings/access_tokens` with scope of reading the repository. Then added entry in `~/.gitconfig` via this command:
    - `$ git config --global url."https://<username>:<access-token-with-read-repo-scope>@gitlab.com/:".insteadOf "https://gitlab.com/"`
- In project depending on this module, also use `.git` when doing `go get`. Additionally, use `GONOSUMDB` to not compare the module's checksum against a public db (since the module is private, it won't exist there):
  - `GONOSUMDB="gitlab.com/" go get -u gitlab.com/orgname/groupname/subgroupname/tmprepo.git`
  - `GONOSUMDB="gitlab.com/orgname" go get -u orgname/groupname/subgroupname/tmprepo.git/tmpapi`
    - It's similar for the nested module in the git repo and can be more specific with what not to check against a public sumdb by including `orgname`.

That's it. It worked on my machine 🤷. Might want to set the `GONOSUMDB` env var with `go env -w GONOSUMDB="gitlab.com/orgname"` if you're doing this often.

refs:
- https://gitlab.com/gitlab-org/gitlab-foss/-/issues/30785
- https://docs.gitlab.com/ee/development/go_guide/dependencies.html#fetching
    - not using a proxy to get from private repo.

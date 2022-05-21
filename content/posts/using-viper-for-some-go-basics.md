---
dateCreated: Oct 25, 2014 14:00:00 GMT+0000
tags:
- go
- viper
title: Using Viper for some Go basics
tocEnabled: true
---

## Intro

This post will walk you through the basic usage of [Viper](https://github.com/spf13/viper 'Viper'). It is intended for people who are new to the [Go](https://golang.org/ 'Go programming language') programming language (I am just starting out myself). This is because the purpose isn't Viper per se, but the process of doing some of the basics in Go.

### Assumptions

- You have Go installed. In my case: **go version go1.3.3 darwin/amd64**

## Setting up

First of all, we need to create a directory to house our work i.e. we need to create a workspace:

<blockquote>
  <p>
    Go code must be kept inside a workspace. A workspace is a directory
    hierarchy with three directories at its root:
  </p>
  <ul>
    <li>src</li>
    <li>pkg</li>
    <li>bin</li>
  </ul>
  <footer>
    <cite>
      <a href="https://golang.org/doc/code.html">How to Write Go Code</a>
    </cite>
  </footer>
</blockquote>

```bash
$ mkdir useviper_workspace

$ cd useviper_workspace

useviper_workspace$ mkdir src bin pkg
```

Next, lets create the directory which will actually house our source code for this post / your project. In doing so, it's handy to keep the following best practice in mind:

<blockquote>
  <p>
    The packages from the standard library are given short paths such as "fmt"
    and "net/http". For your own packages, you must choose a base path that is
    unlikely to collide with future additions to the standard library or other
    external libraries.
  </p>
  <p>
    If you keep your code in a source repository somewhere, then you should use
    the root of that source repository as your base path. For instance, if you
    have a GitHub account at github.com/user, that should be your base path.
  </p>
  <p>
    Note that you don't need to publish your code to a remote repository before
    you can build it. It's just a good habit to organize your code as if you
    will publish it someday. In practice you can choose any arbitrary path name,
    as long as it is unique to the standard library and greater Go ecosystem.
  </p>
  <footer>
    <cite>
      <a href="https://golang.org/doc/code.html">How to Write Go Code</a>
    </cite>
  </footer>
</blockquote>

```bash
useviper_workspace$ mkdir -p src/github.com/justincalleja/useviper
```

I'll go with **github.com/justincalleja/useviper**. Shortly, we will see that `go` can be used to fetch 3rd party source code which is publicly hosted and that the directory structure plays a role in this i.e. if you're planning to push your code to some public repo, you'll want to reflect that in the directory structure leading to the root of your project's source code (e.g. **github.com/username/projectname**).

Before continuing, you'll want to set your **GOPATH** environment variable:

<blockquote>
  <p>
    The GOPATH environment variable specifies the location of your workspace.
  </p>
  <p>
    Your workspace can be located wherever you like &hellip; Note that this must
    not be the same path as your Go installation.
  </p>
  <footer>
    <cite>
      <a href="https://golang.org/doc/code.html">How to Write Go Code</a>
    </cite>
  </footer>
</blockquote>

```bash
useviper_workspace$ echo $GOPATH
/Users/justin/go-stuff/useviper_workspace

useviper_workspace$ type set_gopath
set_gopath is a function
set_gopath ()
{
    export GOPATH=`pwd`;
    export PATH=$GOPATH/bin:$PATH
}
```

I already have my **GOPATH** set using the `set_gopath` bash function which is shown above. You can put this in any file which is sourced when you start your terminal (e.g. ~/.bashrc, ~/.profile etc&hellip;).

## Running some code

Finally, we can get to writing some code. If you want to, initialize a git repo at **src/github.com/< your-username >/useviper** and go ahead and add **useviper.go** in there:

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
)

func main() {
	fmt.Println("in main")
	viper.SetConfigName("config") // name of config file (without extension)
}
```

We're just printing to standard out and making basic usage of Viper as per [usage instructions](https://github.com/spf13/viper) (note that if you don't use something you import the compiler will complain about it and won't let you build).

Now "fmt" is built-in, but what about "github.com/spf13/viper"? How do we get that dependency?

```bash
useviper_workspace$ go get
can't load package: package .: no buildable Go source files in /Users/justin/go-stuff/useviper_workspace
```

If I try running `go get` from the root of my workspace I get the error shown above. It seems that `go get` is expecting Go lang source files to be in the directory you're running it in. Try running it again in the **useviper** directory where we have our **useviper.go** file. This time it hangs for a while. That's because `go get` is scanning the source files it finds and downloading, building and installing our dependencies and code into our workspace. If we print out the directory structure down to 3 levels we get:

```bash
useviper_workspace$ tree -L 3
.
├── bin
│   └── useviper
├── pkg
│   └── darwin_amd64
│       ├── github.com
│       └── gopkg.in
└── src
    ├── github.com
    │   ├── BurntSushi
    │   ├── justincalleja
    │   ├── kr
    │   ├── mitchellh
    │   └── spf13
    └── gopkg.in
        └── yaml.v1
```

In our case, we didn't really need `go get` to stay parsing and figuring out what dependencies our project needs as we have only one (which in turn has it's own dependencies). We could have achieved the same result by running `go get github.com/spf13/viper` from the root of our workspace.

As you can see, our **src**, **pkg**, and **bin** directories have been populated. **src** now includes the source code of our dependencies recursively (Viper is in **github.com/spf13/viper**). **pkg** contains library binaries. These binaries cannot be executed but they can be linked to. **bin** is where executable binaries go. The **main()** function in useviper.go makes the result of building the file an executable binary, so it's placed in bin and we can run it.

Since we've added **\$GOPATH/bin** to our **PATH** environment variable (refer to the `set_gopath` executable function above), running useviper at the terminal is simply a matter of entering the file's name: `useviper`, which gives us back "in main".

Next, we want to be able to modify our source code and rebuild. Change your **main()** function to look like the following:

```go
func main() {
	viper.SetConfigName("config") // name of config file (without extension)
	viper.AddConfigPath(".")      // path to look for the config file in

	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println("Config not found...")
	} else {
		name := viper.GetString("name")
		fmt.Println("Config found, name = ", name)
	}
}
```

In order to install (build and put in **bin**), we find ourselves in the same sort of situation as we did with `go get`. We can either rely on being in the directory our source files are in and run `go install`, or we can specify what to install explicitly. I like having the **goinstall.sh** script around in my workspace root (shown below).

```bash
#!/bin/bash
if [ $# -eq 0 ]
then
    echo "go install github.com/justincalleja/useviper" && go install github.com/justincalleja/useviper
else
    echo "go install github.com/justincalleja/$1" && go install github.com/justincalleja/$1
fi
```

I thought it might be useful to install with just the project name (and a default) from the project root&hellip; but I have yet to develop enough in Go to see what is actually helpful or not in the process of writing code.

Basically, all the following will install `useviper` in **bin** for us:

```bash
useviper_workspace$ goinstall.sh

useviper_workspace$ goinstall.sh useviper

useviper$ go install
```

If you `useviper` now you should get: "Config not found...". But if you create a file named **config.yaml** in the directory in which you're going to run `useviper` with the following contents:

```yaml
name: viper
```

you should get back "Config found, name = viper". Note that we did not need to set the config file's extension in our **main()** as Viper picks up YAML, TOML, or JSON files automatically.

That wraps up this quick introduction to some Go lang basics :)

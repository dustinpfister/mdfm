# Mark Down File Manager (MDFM)

Mark Down File Manager is a CLI tool I have made to help me manage my personal collection of mark down files. I can use it to generate reports for all my posts that shows me useful information like word count for each post, and how many times a certain keyword, or phrase appears in a post. It can be used to preform a wide range of quality checks, and analyses of word choice, as well as many other tasks that come to mind when managing a large quantity of content. It also functions as a basic static site generator, but I would still prefer to use something like hexo.

## Getting started

As of this writing I have not published this to npm, so it must be cloned in from github, and then installed globally, as this is a CLI tool.

$ git clone https://github.com/dustinpfister/mdfm.git
$ cd mdfm
$ npm install -g

## initialize a new .mdfm folder

To initialize a new .mdfm folder cd to the working dir where the markdown files are and use the -i option to initialize a new .mdfm folder. For now this will just create a config.yaml file in the folder, and copy the hard coded options to that yaml file. It is then possible to change options in that file, or give options from the command line.

```
$ cd path/to/markdown/files
$ mdfm -i
```

this will:
* creates a new .mdfm folder in the working dir if not there to begin with.
* creates or overwrites ./mdfm/config.yaml with had coded defaults.

When calling mdfm without any arguments the values set in config.yaml will be used, as such the values can be changed to any of the available modes.

$ mdfm gen-reports

* runs check for .mdfm/config.yaml
* uses any options set in .mdfm/config.yaml, or from the CLI
* creates a .mdfm/reports dir if not there.
* creates/overwrites .mdfm/reports folder
* makes an .html file for each *.md file in the working directory
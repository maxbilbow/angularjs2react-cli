# @ng2react/cli

> A command line interface for wrapper for [@ng2react/core](https://github.com/ng2react/core) that converts AngularJS components to React using OpenAI.

## Installation

```bash
npm install -g @ng2react/cli
```

## Usage

### Search for components

```log
ng2react search <file>

Finds angular components in a file

Positionals:
  file  The file to search                                   [string] [required]

Options:
  --version  Show version number                                       [boolean]
  --cwd      The current working directory
          [string] [default: "/Users/maxbilbow/repos/dissertation/ng2react/cli"]
  --quiet    Suppresses all logging                                    [boolean]
  --json     Outputs the result as json. When provided, all responses will be in
             the format {data: any, error?: string}                    [boolean]
  --verbose  Outputs more information                                  [boolean]
  --help     Show help                                                 [boolean]
```

### Convert your AngularJS component or directive to React

```log
ng2react convert <file> <componentName>

Converts angular components to react

Positionals:
  file           The file containing the component           [string] [required]
  componentName  The file to convert                         [string] [required]

Options:
  --version       Show version number                                  [boolean]
  --cwd           The current working directory
          [string] [default: "/Users/maxbilbow/repos/dissertation/ng2react/cli"]
  --quiet         Suppresses all logging                               [boolean]
  --json          Outputs the result as json. When provided, all responses will
                  be in the format {data: any, error?: string}         [boolean]
  --verbose       Outputs more information                             [boolean]
  --help          Show help                                            [boolean]
  --apiKey        The openai api key                                    [string]
  --model         The openai model to use            [string] [default: "gpt-4"]
  --organization  The openai model to use                               [string]
  --sourceRoot    The source root where all AngularJS JS and HTML are located
                                                                        [string]
  --temperature   The temperature to use when generating text, between 0 and 2
                                                         [number] [default: 0.2]
```

## JSON API

If you wish to integrate this into your own application, you can use the JSON API by adding the `--json` flag.

The response types are found in See [src/lib/model](./src/lib/model/):

### Search Response:

```typescript
type SearchResult = {
    result: {
        name: string
        file: string
        location: {
            start: number
            end: number
        }
    }[]
}
```

### Convert Response:

```typescript
type ConvertResult = {
    result: readonly {
        jsx: string
        markdown: string
    }[]
}
```

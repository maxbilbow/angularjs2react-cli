# @ng2react/cli

> A command line interface for wrapper for [@ng2react/core](https://github.com/ng2react/core) that converts AngularJS components to React using OpenAI.

## Installation

```bash
npm install -g @ng2react/cli
```

## Usage

`ng2r [comand] --help`

```log
Commands:
  ng2react search <file>                   Finds angular components in a file
  ng2react convert <file> <componentName>  Converts angular components to react
  ng2react generateReactTest <file>        Converts angular components to react
```

### Convert your AngularJS component or directive to React

```log
ng2react convert <file> <componentName>

Converts angular components to react

Positionals:
  file           The file containing the component           [string] [required]
  componentName  The file to convert                         [string] [required]

Options:
  --version         Show version number                                [boolean]
  --cwd             The current working directory
          [string] [default: "/Users/maxbilbow/repos/dissertation/ng2react/cli"]
  --quiet           Suppresses all logging                             [boolean]
  --verbose         Outputs more information                           [boolean]
  --help            Show help                                          [boolean]
  --apiKey          The openai api key                                  [string]
  --model           The openai model to use          [string] [default: "gpt-4"]
  --organization    The openai model to use                             [string]
  --sourceRoot      The source root where all AngularJS JS and HTML are located
                                                                        [string]
  --temperature     The temperature to use when generating text, between 0 and 2
                                                         [number] [default: 0.2]
  --customPrompt    Custom rules (Markdown) that will be used instead of the
                    default rules regarding pattern conversion.         [string]
  --targetLanguage  Target language for code generation. If none provided, the
                    source language will be used.
                                  [string] [choices: "javascript", "typescript"]
```

### Generate a Test

```log
ng2react generateReactTest <file>

Converts angular components to react

Positionals:
  file  The file containing the component                    [string] [required]

Options:
  --version         Show version number                                [boolean]
  --cwd             The current working directory
          [string] [default: "/Users/maxbilbow/repos/dissertation/ng2react/cli"]
  --quiet           Suppresses all logging                             [boolean]
  --verbose         Outputs more information                           [boolean]
  --help            Show help                                          [boolean]
  --apiKey          The openai api key                                  [string]
  --model           The openai model to use          [string] [default: "gpt-4"]
  --organization    The openai model to use                             [string]
  --temperature     The temperature to use when generating text, between 0 and 2
                                                         [number] [default: 0.2]
  --targetLanguage  Target language for code generation. If none provided, the
                    source language will be used.
                                  [string] [choices: "javascript", "typescript"]
```

## JSON API

If you wish to integrate this into your own application, you can use the JSON API by adding the `--json` flag.

For response types, see the [JSON schemas](./schemas):

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

### Convert / Test Gen Response:

```typescript
type ConvertResult = {
    result: readonly {
        jsx: string
        markdown: string
    }[]
}
```

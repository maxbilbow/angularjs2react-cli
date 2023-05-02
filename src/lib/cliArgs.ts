export interface CliArgs {
    quiet?: true
    cwd: string
    filename: string
    verbose?: true
    json?: true
}

export type FindComponentArgs = CliArgs

export interface ConvertComponentArgs extends CliArgs {
    componentName: string
    apiKey: string
    model?: string
    organization?: string
    sourceRoot?: string
}

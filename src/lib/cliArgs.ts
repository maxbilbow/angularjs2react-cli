export interface CliArgs {
    quiet: boolean
    cwd: string
    filename: string
}

export type FindComponentArgs = CliArgs

export interface ConvertComponentArgs extends CliArgs {
    componentName: string
}
export type ConvertResult = {
    prompt: string
    result: readonly {
        jsx: string
        markdown: string
    }[]
}

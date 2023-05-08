export type ComponentInfo = {
    name: string
    file: string
    location: {
        start: number
        end: number
    }
}

export type SearchResult = {
    result: ComponentInfo[]
}

import {Ng2RSearchResult} from '../generated/SearchResult'
import {Ng2RGenerationResponse} from '../generated/GenerationResponse'

export function onComplete(output: Ng2RSearchResult | Ng2RGenerationResponse | string): void {
    if (typeof output === 'string') {
        process.stdout.write(output)
        return
    }
    // For json output, we want to write the full object to stdout
    const json = JSON.stringify(output)
    process.stdout.write(json)
}

export function onError(error: unknown): void {
    if (!process.argv.includes('--quiet')) {
        console.error(error)
    } else if (error instanceof Error) {
        process.stderr.write(error.message)
    } else if (error !== undefined && error !== null) {
        process.stderr.write(error.toString())
    } else {
        process.stderr.write('Unknown error')
    }
}

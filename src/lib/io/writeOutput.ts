import {SearchResult} from '../model/SearchResult'
import {ConvertResult} from '../model/ConvertResult'

export function onComplete(output: SearchResult | ConvertResult): void {
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

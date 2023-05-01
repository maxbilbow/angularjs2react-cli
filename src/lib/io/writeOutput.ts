import {SearchResult} from '../model/SearchResult'
import {ConvertResult} from '../model/ConvertResult'

let json = false

export function setJson() {
    json = true
}

export function onComplete(output: SearchResult | ConvertResult): void {
    if (json) {
        // For json output, we want to write the full object to stdout
        const json = JSON.stringify(output)
        process.stdout.write(json)
    } else if (isSearchResult(output)) {
        process.stdout.write(output.result.map(c => c.name).join(', '))
    } else {
        process.stdout.write(output.result[0].jsx)
    }
}

function isSearchResult(output: SearchResult | ConvertResult): output is SearchResult {
    return 'name' in output.result[0] && 'file' in output.result[0] && 'location' in output.result[0]
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
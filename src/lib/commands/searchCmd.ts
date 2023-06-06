import {search} from '@ng2react/core'
import {onComplete} from '../io/writeOutput'
import fs from 'fs'
import type {Ng2RComponent, Ng2RSearchResult} from '../generated/SearchResult'
import {Ng2RSearchOptions} from '../generated/CliArgs'

export default function searchCmd({file}: Ng2RSearchOptions): void {
    const fileContent = fs.readFileSync(file, 'utf-8')
    const components = search(fileContent, {file})
    if (!components) {
        throw Error(`Could not find components in ${file}`)
    }
    const result = components.map(
        (c) =>
            ({
                name: c.name,
                file,
                location: {
                    start: c.node.getStart(),
                    end: c.node.getEnd(),
                },
            } satisfies Ng2RComponent)
    )

    onComplete({result} satisfies Ng2RSearchResult)
}

import {search} from '@ng2react/core'
import {CliArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'
import {ComponentInfo} from '../model/SearchResult'
import fs from 'fs'

export default function searchCmd({filename, cwd}: CliArgs): void {
    const fileContent = fs.readFileSync(path.join(cwd, filename), 'utf-8')
    const components = search(fileContent, {filename})
    if (!components) {
        throw Error(`Could not find components in ${filename}`)
    }
    const result = components.map(c => ({
        name: c.name,
        file: filename,
        location: {
            start: c.node.getStart(),
            end: c.node.getEnd(),
        }
    } satisfies ComponentInfo))

    onComplete({result})
}
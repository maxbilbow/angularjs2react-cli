import {createAst, findComponents} from '@ng2react/core'
import {CliArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'
import {ComponentInfo} from '../model/SearchResult'

export default function searchCmd({filename, cwd}: CliArgs): void {
    const ast = createAst(path.resolve(cwd, filename))
    const components = findComponents(ast)
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
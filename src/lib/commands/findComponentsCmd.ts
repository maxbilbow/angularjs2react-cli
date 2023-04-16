import {createAst, findComponents} from '@ng2react/core'
import {CliArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'

export default function findComponentsCmd({filename, cwd}: CliArgs): void {
    const ast = createAst(path.resolve(cwd, filename))
    const components = findComponents(ast)
    if (!components) {
        throw Error(`Could not find components in ${filename}`)
    }
    const componentNames = components.map(c => ({name: c.name}))
    onComplete({result: componentNames})
}
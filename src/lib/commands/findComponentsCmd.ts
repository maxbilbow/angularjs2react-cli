import {createAst, findComponents} from '@ng2react/core'
import {CliArgs} from '../cliArgs'
import path from 'path'

export default function findComponentsCmd({filename, cwd}: CliArgs): void {
    const ast = createAst(path.resolve(cwd, filename))
    const components = findComponents(ast)
    if (!components) {
        throw Error(`Could not find components in ${filename}`)
    }
    process.stdout.write(JSON.stringify(components.map(c => c.name)))
}
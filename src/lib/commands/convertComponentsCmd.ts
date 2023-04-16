import {createAst, findComponents, resolveTemplates} from '@ng2react/core'
import {ConvertComponentArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'

export default function convertComponentsCmd({filename, componentName, cwd}: ConvertComponentArgs): void {
    const ast = createAst(path.resolve(cwd, filename))
    const component = resolveTemplates(findComponents(ast))
        .find(c => c.name === componentName)

    if (!component) {
        throw Error(`Could not find component ${componentName} in ${filename}`)
    }

    onComplete({result: component.node.getText()})
}
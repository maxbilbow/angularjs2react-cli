import { createAst, findComponents, resolveTemplates } from '@ng2react/core'
import { ConvertComponentArgs } from '../cliArgs.ts'
import * as path from 'https://deno.land/std@0.183.0/path/mod.ts'
import { onComplete } from '../io/writeOutput.ts'

export default function convertComponentsCmd({ filename, componentName, cwd }: ConvertComponentArgs): void {
    const ast = createAst(path.resolve(cwd, filename))
    const component = resolveTemplates(findComponents(ast))
        .find((c) => c.name === componentName)

    if (!component) {
        throw Error(`Could not find component ${componentName} in ${filename}`)
    }

    onComplete({ result: component.node.getText() })
}
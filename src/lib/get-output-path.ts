import type {AngularComponent} from 'npm:@ng2react/core'
import type {Node} from 'npm:typescript'
import * as path from 'https://deno.land/std@0.183.0/path/mod.ts'
import * as fs from 'https://deno.land/std@0.183.0/fs/mod.ts'

export default function getOutputFilePath(component: AngularComponent) {
    const fileDir = getSourceDir(component.node)
    let newFilePath = path.join(fileDir, `${component.name}.jsx`)
    if (fs.existsSync(newFilePath)) {
        newFilePath = path.join(fileDir, `${component.name}.converted.jsx`)
    }
    return newFilePath
}

function getSourceDir(node: Node): string {
    return node.getSourceFile().fileName.split('/').slice(0, -1).join('/')
}
import type {Node} from 'typescript'
import path from 'path'
import fs from 'fs'
import type {search} from '@ng2react/core'

type AngularComponent = ReturnType<typeof search>[number]
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
import type {AngularComponent} from '@maxbilbow/angularjs2react';
import type {Node} from 'typescript';
import path from 'path';
import fs from 'fs';

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
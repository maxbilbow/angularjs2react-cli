import {convert} from '@ng2react/core'
import {ConvertComponentArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'
import fs from 'fs'

export default async function convertCmd({
                                             cwd,
                                             ...ng2ReactArgs
                                         }: ConvertComponentArgs) {
    const absoluteFilePath = path.join(cwd, ng2ReactArgs.file)
    const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8')
    const results = await convert(fileContent, ng2ReactArgs)

    onComplete({result: results})
}


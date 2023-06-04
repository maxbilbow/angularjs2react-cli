import {convert} from '@ng2react/core'
import {ConvertComponentArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'
import fs from 'fs'
import {Ng2RGenerationResponse} from '../generated/GenerationResponse'

export default async function convertCmd({cwd, ...ng2ReactArgs}: ConvertComponentArgs) {
    const absoluteFilePath = path.join(cwd, ng2ReactArgs.file)
    const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8')
    const {prompt, results} = await convert(fileContent, ng2ReactArgs)

    onComplete({prompt, result: results} satisfies Ng2RGenerationResponse)
}

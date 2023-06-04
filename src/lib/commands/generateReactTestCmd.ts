import {generateReactTest} from '@ng2react/core'
import {GenerateTestArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'
import fs from 'fs'
import {Ng2RGenerationResponse} from '../generated/GenerationResponse'

export default async function generateReactTestCmd({cwd, file, ...ng2ReactArgs}: GenerateTestArgs) {
    const absoluteFilePath = path.join(cwd, file)
    const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8')
    const {prompt, results} = await generateReactTest(fileContent, ng2ReactArgs)

    onComplete({prompt, result: results} satisfies Ng2RGenerationResponse)
}

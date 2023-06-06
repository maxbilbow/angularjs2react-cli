import {generateReactTest} from '@ng2react/core'
import {GenerateTestArgs} from '../cliArgs'
import {onComplete} from '../io/writeOutput'
import fs from 'fs'
import {Ng2RGenerationResponse} from '../generated/GenerationResponse'

export default async function generateReactTestCmd(opt: GenerateTestArgs) {
    const fileContent = fs.readFileSync(opt.file, 'utf-8')
    const {prompt, results} = await generateReactTest(fileContent, opt)

    onComplete({prompt, result: results} satisfies Ng2RGenerationResponse)
}

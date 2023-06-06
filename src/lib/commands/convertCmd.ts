import {convert} from '@ng2react/core'
import {ConvertComponentArgs} from '../cliArgs'
import {onComplete} from '../io/writeOutput'
import fs from 'fs'
import {Ng2RGenerationResponse} from '../generated/GenerationResponse'

export default async function convertCmd(opt: ConvertComponentArgs) {
    const fileContent = fs.readFileSync(opt.file, 'utf-8')
    const {prompt, results} = await convert(fileContent, opt)

    onComplete({prompt, result: results} satisfies Ng2RGenerationResponse)
}

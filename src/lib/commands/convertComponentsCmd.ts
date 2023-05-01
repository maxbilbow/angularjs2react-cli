import {convert} from '@ng2react/core'
import {ConvertComponentArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'

export default async function convertComponentsCmd({
                                                       filename,
                                                       componentName,
                                                       cwd,
                                                       openaiModel,
                                                       openaiOrg,
                                                       openaiApiKey
                                                   }: ConvertComponentArgs) {
    const absoluteFilePath = path.join(cwd, filename)
    const results = await convert(absoluteFilePath, componentName, {
        apiKey: openaiApiKey,
        model: openaiModel,
        organization: openaiOrg
    })

    if (!results) {
        throw Error(`Could not find component ${componentName} in ${filename}`)
    }

    onComplete({result: results})
}

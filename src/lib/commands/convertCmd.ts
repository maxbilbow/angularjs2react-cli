import {convert} from '@ng2react/core'
import {ConvertComponentArgs} from '../cliArgs'
import path from 'path'
import {onComplete} from '../io/writeOutput'

export default async function convertCmd({
                                             filename,
                                             componentName,
                                             cwd,
                                             ...ng2ReactArgs
                                         }: ConvertComponentArgs) {
    const absoluteFilePath = path.join(cwd, filename)
    const results = await convert(absoluteFilePath, componentName, getNg2ReactArgs(ng2ReactArgs))

    if (!results) {
        throw Error(`Could not find component ${componentName} in ${filename}`)
    }

    onComplete({result: results})
}

type ConvertOpts = Parameters<typeof convert>['2']

function getNg2ReactArgs(args: Pick<ConvertComponentArgs, keyof ConvertOpts>) {
    const {apiKey, model, organization, sourceRoot} = args
    return {apiKey, model, organization, sourceRoot} satisfies ConvertOpts
}

import { search } from '@ng2react/core'
import { CliArgs } from '../cliArgs'
import path from 'path'
import { onComplete } from '../io/writeOutput'
import { ComponentInfo } from '../model/SearchResult'
import fs from 'fs'

export default function searchCmd({ file, cwd }: CliArgs): void {
    const fileContent = fs.readFileSync(path.join(cwd, file), 'utf-8')
    const components = search(fileContent, { file })
    if (!components) {
        throw Error(`Could not find components in ${file}`)
    }
    const result = components.map(
        (c) =>
            ({
                name: c.name,
                file,
                location: {
                    start: c.node.getStart(),
                    end: c.node.getEnd(),
                },
            } satisfies ComponentInfo)
    )

    onComplete({ result })
}

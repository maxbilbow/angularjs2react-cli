import { CliArgs } from './cliArgs'
import { MiddlewareFunction } from 'yargs'
import { setLogLevel } from './Logger'
import { setJson } from './io/writeOutput'

const initLogging: MiddlewareFunction<CliArgs> = (args) => {
    if (args.quiet) {
        setLogLevel('quiet')
    } else if (args.verbose) {
        setLogLevel('verbose')
    }
}

const initMode: MiddlewareFunction<CliArgs> = (args) => {
    if (args.json) {
        setJson()
    }
}
export default function middleware<T>() {
    return Object.freeze([initLogging, initMode]) as ReadonlyArray<MiddlewareFunction<T>>
}

import {CliArgs} from './cliArgs'
import {MiddlewareFunction} from 'yargs'
import {setLogLevel} from './Logger'

const initLogging: MiddlewareFunction<CliArgs> = (args) => {
    if (args.quiet) {
        setLogLevel('quiet')
    } else if (args.verbose) {
        setLogLevel('verbose')
    }
}

export default function middleware<T>() {
    return Object.freeze([initLogging]) as ReadonlyArray<MiddlewareFunction<T>>
}

import {Logger} from 'tslog'
import {setLogLevel as setCoreLogLevel} from '@ng2react/core'

let logLevel = 4

export function setLogLevel(level: 'quiet' | 'verbose' | 'normal') {
    setCoreLogLevel(level)
    switch (level) {
        case 'quiet':
            logLevel = 5
            break
        case 'verbose':
            logLevel = 0
            break
        case 'normal':
            logLevel = 4
            break
    }
}

export default function getLogger(name: string) {
    return new Logger<void>({name, minLevel: logLevel})
}
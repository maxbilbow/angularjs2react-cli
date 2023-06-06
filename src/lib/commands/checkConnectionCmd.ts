import {checkConnection} from '@ng2react/core'
import {onComplete, onError} from '../io/writeOutput'
import {Ng2RCheckOptions} from '../generated/CliArgs'

export default async function checkConnectionCmd(options: Ng2RCheckOptions) {
    try {
        const response = await checkConnection(options)
        onComplete(response)
    } catch (error) {
        onError(error)
    }
}

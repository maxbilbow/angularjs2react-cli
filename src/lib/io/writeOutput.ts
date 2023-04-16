let json = false

export function setJson() {
    json = true
}
export function onComplete(output: {result: string| { name: string }[]}): void {
    if (json) {
        const json = JSON.stringify(output)
        process.stdout.write(json)
    } else if (output.result instanceof Array) {
        process.stdout.write(output.result.map(c => c.name).join(', '))
    } else {
        process.stdout.write(output.result)
    }
}

export function onError(error: unknown): void {
    if (!process.argv.includes('--quiet')) {
        console.error(error)
    } else if (error instanceof Error){
        process.stderr.write(error.message)
    } else if (error !== undefined && error !== null) {
        process.stderr.write(error.toString())
    } else {
        process.stderr.write('Unknown error')
    }
}
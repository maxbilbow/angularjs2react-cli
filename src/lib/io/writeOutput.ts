let json = false

export function setJson() {
    json = true
}
export function onComplete(output: {result: string| { name: string }[]}): void {
    if (json) {
        const json = JSON.stringify(output)
        write(json)
    } else if (output.result instanceof Array) {
        write(output.result.map(c => c.name).join(', '))
    } else {
        write(output.result)
    }
}

export function onError(error: unknown): void {
    if (!Deno.args.includes('--quiet')) {
        console.error(error)
    } else if (error instanceof Error){
        writeError(error.message)
    } else if (error !== undefined && error !== null) {
        writeError(error.toString())
    } else {
        writeError('Unknown error')
    }
}

function write(output: string): void {
    const bytes = new TextEncoder().encode(output)
    Deno.stdout.writeSync(bytes)
}

function writeError(output: string): void {
    const bytes = new TextEncoder().encode(output)
    Deno.stderr.writeSync(bytes)
}
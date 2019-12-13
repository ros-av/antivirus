/**
 * A decimal number between 0 and 1.
*/
type float = number

type scanPromise = PromiseLike<float>

interface pluginprov {
    [provider: string]: scanPromise | scanPromise[]
}

declare interface plugin {
    scanner?: pluginprov
    provider?: (cb: (data: any) => void, done: () => void) => void
    prepare?: PromiseLike<void>
    cleanup?: PromiseLike<void>
}

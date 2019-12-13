import globbyAll from "../utils/globby-all"
import infiniteArgs from "../utils/infinite-args"

module.exports = {
    providers: {
        scan: {
            args: ["[paths]", 'Scan files or directories', (yargs) => {
                yargs.positional('paths', {
                    type: 'string',
                    describe: 'The files or directories to scan (supports globs).'
                })
            }],
            handle: ({ args, cb, done }) => {
                globbyAll(infiniteArgs(args.paths, args._)).then(files => files.map(file => cb(file))).finally(done)
            }
        }
    },
    handlers: {
        scan: name => Promise.resolve(1.0)
    }
}

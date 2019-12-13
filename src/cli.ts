import _ from "lodash"
import meow from "meow"
import hasha from "hasha"
import chalk from "chalk"
import ora from "ora"
import delay from "delay"
import pEachSeries from "p-each-series"

import globifyAll from "./utils/globby-all"
import conf from "./utils/conf"

const args = meow(`
    Usage
        $ av <args>

    Commands
        av scan <dirs>
        av add <names>
        av remove <names>

    Options
        --ignore, i Globs to ignore
        --verbose, v Verbose output

    Examples
      $ foo unicorns --rainbow
      🌈 unicorns 🌈
`, {
    flags: {
        ignore: {
            type: "array",
            alias: "i",
            default: []
        },
        verbose: {
            type: 'boolean',
            alias: 'v',
        }
    }
});

module.exports = (async () => {
    const cmd = _.first(args.input)
    const opts = _.tail(args.input)
    if (cmd === "scan") {
        const spinner = ora(chalk.yellow("Resolving files...")).start();
        spinner.spinner = "arc"
        spinner.color = "yellow"
        const ignore = await globifyAll(args.flags.ignore)
        const dirs = (await globifyAll(opts || "**/*")).filter(value)
        if (_.size(dirs) === 0) console.log(chalk.yellow("Nothing to scan."))
        else {
            await pEachSeries(dirs, async dir => {
                spinner.text = chalk.yellow(`Scanning ${dir}...`)
                const a = await delay(1000)
                return a
                // await hasha.fromFile(dir, { algorithm: 'md5' })
            })
        }
        spinner.stop()
    } else if (cmd === "add") {
        console.log(chalk.grey("Not implemented!"))
    } else if (cmd === "remove") {
        console.log(chalk.grey("Not implemented!"))
    } else {
        console.log(chalk.yellow("Invalid command argument provided!"))
    }
})()

/*
{
    input: ['unicorns'],
    flags: {rainbow: true},
    ...
}
*/

// const yargs = require("yargs")
//     .scriptName("antivirus")
//     .usage('$0 <cmd> [args]')
//     .command('add [names]', 'Add plugins', (yargs) => {
//         yargs.positional('names', {
//             type: 'string',
//             describe: 'The plugins to add.'
//         })
//     }, (args) => {
//         if (!conf.get("plugins")) conf.set("plugins", [])
//         infiniteArgs(args.names, args._).forEach(name => {
//             if (conf.store.plugins.includes(name)) console.log(`${name} is already installed!`)
//             else {
//                 conf.set("plugins", [...conf.get("plugins"), name])
//                 console.log(`Installed ${name}!`)
//             }
//         })
//     })
//     .command('remove [names]', 'Add plugins', (yargs) => {
//         yargs.positional('names', {
//             type: 'string',
//             describe: 'The plugins to add.'
//         })
//     }, (args) => {
//         if (!conf.get("plugins")) conf.set("plugins", [])
//         infiniteArgs(args.names, args._).forEach(name => {
//             if (conf.store.plugins.includes(name)) {
//                 conf.set("plugins", _.without(conf.get("plugins"), name))
//                 console.log(`Finished uninstalling ${name}.`)
//             }
//             else {
//                 console.log(`${name} is not installed!`)
//             }
//         })
//     })

// conf.get("plugins").forEach((name) => {
//     // const plugin = require(`antivirus-plugin-${name}`)
//     const plugin = require("./providers/scan")
//     if (_.size(plugin.providers) > 0) _.forOwn(plugin.providers, ({ args, handle }, name) => {
//         yargs.command(`${name} ${args[0]}`, args[1], args[2], (args) => {
//             handle({
//                 args,
//                 cb: console.log,
//                 done: _.noop
//             })
//         })
//     })
// })

// yargs.demandCommand().argv


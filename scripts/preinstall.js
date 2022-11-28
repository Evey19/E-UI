// if (!/yarn/.test(process.env.npm_execpath || '')) {
//   console.warn(
//     `\u001b[33mThis repository requires using yarn as the package manager ` +
//       ` for scripts to work properly.\u001b[39m\n`
//   )
//   process.exit(1)
// }

const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|cnpm|pnpm|yarn>')
  process.exit(1)
}

const wantedPM = argv[0]
if (wantedPM !== 'npm' && wantedPM !== 'cnpm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, cnpm, pnpm, or yarn.`)
  process.exit(1)
}

const usedPM = whichPMRuns()
if (usedPM && usedPM.name !== wantedPM) {
  console.warn(
    `\u001b[33mThis repository requires using ${wantedPM} as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`
  )
  process.exit(1)
}

function whichPMRuns() {
  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  return pmFromUserAgent(process.env.npm_config_user_agent)
}

function pmFromUserAgent(userAgent) {
  const pmSpec = userAgent.split(' ')[0]
  const separatorPos = pmSpec.lastIndexOf('/')
  return {
    name: pmSpec.substr(0, separatorPos),
    version: pmSpec.substr(separatorPos + 1)
  }
}
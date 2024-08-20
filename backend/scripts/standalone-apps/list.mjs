const AppNames = ['hololive/update-channels', 'pubsubhubbub', 'update-streams']

const obj = AppNames.reduce((acc, name) => {
  acc[`${name}:dev`] = `nest start --watch ${name}`
  acc[`${name}:build`] = `nest build --webpack ${name}`
  acc[`${name}:prod`] = `node dist/apps/${name}/main`
  return acc
}, {})

export default obj

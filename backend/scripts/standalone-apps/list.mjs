const AppNames = [
  'groups/update-channels',
  'pubsubhubbub',
  'update-chats',
  'update-streams'
]

const obj = AppNames.reduce((acc, name) => {
  acc[`${name}:dev`] = `nest start --watch ${name}`
  acc[`${name}:build`] = `nest build --webpack ${name}`
  acc[`${name}:prod`] = `node dist/apps/${name}/main`
  return acc
}, {})

export default obj

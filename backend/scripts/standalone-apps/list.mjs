const App1Name = 'pubsubhubbub'
const App2Name = 'hololive/update-channels'

export default {
  /**
   * App 1
   */
  [`${App1Name}:dev`]: `nest start --watch ${App1Name}`,
  [`${App1Name}:build`]: `nest build --webpack ${App1Name}`,
  [`${App1Name}:prod`]: `node dist/apps/${App1Name}/main`,

  /**
   * App 2
   */
  [`${App2Name}:dev`]: `nest start --watch ${App2Name}`,
  [`${App2Name}:build`]: `nest build --webpack ${App2Name}`,
  [`${App2Name}:prod`]: `node dist/apps/${App2Name}/main`
}

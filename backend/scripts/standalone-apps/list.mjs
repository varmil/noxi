export default {
  /**
   * App 1
   */
  'pubsubhubbub:dev': 'nest start --watch pubsubhubbub',
  'pubsubhubbub:build': 'nest build --webpack pubsubhubbub',
  'pubsubhubbub:prod': 'node dist/apps/pubsubhubbub/main',

  /**
   * App 2
   */
  'hololive/updateChannels:dev':
    'nest start --watch hololive/save-aggregations-by-channel',
  'hololive/updateChannels:build':
    'nest build --webpack hololive/save-aggregations-by-channel',
  'hololive/updateChannels:prod':
    'node dist/apps/hololive/save-aggregations-by-channel/main'
}

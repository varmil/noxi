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
  'hololive/update-channels:dev':
    'nest start --watch hololive/save-aggregations-by-channel',
  'hololive/update-channels:build':
    'nest build --webpack hololive/save-aggregations-by-channel',
  'hololive/update-channels:prod':
    'node dist/apps/hololive/save-aggregations-by-channel/main'
}

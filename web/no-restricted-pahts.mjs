import fs from 'fs'

const featureZones = fs.readdirSync('./features').map(feature => ({
  target: `./features/${feature}/**/*`,
  from: `./features/!(${feature})/**/*`,
  message: 'Features cannot import from other features.'
}))
const pageZones = fs.readdirSync('./app').map(page => ({
  target: `./app/${page}/**/*`,
  from: `./app/!(${page})/**/*`,
  message: 'app/pages cannot import from other pages.'
}))

export const zones = [
  ...featureZones,
  ...pageZones,
  {
    target: './components',
    from: ['./features/**/*'],
    message: 'components cannot import features.'
  },
  {
    target: './config',
    from: ['./features/**/*', './hooks/**/*', './lib/**/*'],
    message: 'config should be independent'
  },
  {
    target: './features',
    from: ['./app/**/*'],
    message: 'features cannot import app.'
  },
  {
    target: './hooks',
    from: ['./features/**/*'],
    message: 'hooks cannot import features'
  }
]

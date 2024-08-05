import fs from 'fs'

const presentations = fs.readdirSync('./apps').map(presentation => ({
  target: `./apps/${presentation}/**/*`,
  from: `./apps/!(${presentation})/**/*`,
  message: `presentation:${presentation} cannot import from other presentations.`
}))

export const zones = [
  ...presentations,
  {
    target: './libs/application',
    from: ['./apps/**/*'],
    message: 'application cannot import a presentation layer.'
  },
  {
    target: './libs/domain/**/*',
    from: ['./apps/**/*', './libs/!(domain)/**/*'],
    message: 'domain should be independent'
  },
  {
    target: './libs/infrastructure',
    from: ['./apps/**/*', './libs/application/**/*'],
    message: 'infrastructure cannot import presentation and application layers.'
  }
]

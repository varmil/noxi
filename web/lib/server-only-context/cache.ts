import Site from 'config/constants/Site'
import serverOnlyContext from './serverOnlyContext'

export const [getGroup, setGroup] =
  serverOnlyContext<(typeof Site.Groups)[number]>('hololive')

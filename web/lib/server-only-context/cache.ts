import serverOnlyContext from './serverOnlyContext'

export const [getGroup, setGroup] = serverOnlyContext<string>('hololive')

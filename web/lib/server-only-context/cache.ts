import { GroupString } from 'config/constants/Site'
import serverOnlyContext from './serverOnlyContext'

export const [getGroup, setGroup] = serverOnlyContext<GroupString>('hololive')

import { GroupString } from 'config/constants/Group'
import serverOnlyContext from './serverOnlyContext'

export const [getGroup, setGroup] = serverOnlyContext<GroupString>('hololive')

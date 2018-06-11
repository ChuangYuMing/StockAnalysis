import { combineEpics } from 'redux-observable'
import main from 'modules/main'

let epics = [...Object.values(main.epics)]
console.log(epics)
const rootEpic = combineEpics.apply(undefined, epics)

export default rootEpic

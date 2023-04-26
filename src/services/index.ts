import Common from './common'
import Todo from './todo'
import profile from './profile'

const commonService = new Common()
const todoService = new Todo()
const profileService = new profile()

export { commonService, todoService, profileService }

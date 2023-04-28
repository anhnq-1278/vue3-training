import Common from './common'
import Todo from './todo'
import profile from './profile'
import listUsers from './listUsers'

const commonService = new Common()
const todoService = new Todo()
const profileService = new profile()
const listUsersService = new listUsers()

export { commonService, todoService, profileService, listUsersService }

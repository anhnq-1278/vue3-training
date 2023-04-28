import Profile from './Profile'
import Auth from './Auth'
import Todo from './Todo'
import User from './User'

const authService = new Auth()
const todoService = new Todo()
const profileService = new Profile()
const userService = new User()

export { authService, todoService, profileService, userService }

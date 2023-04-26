import Profile from './Profile'
import Auth from './Auth'
import Todo from './Todo'

const authService = new Auth()
const todoService = new Todo()
const profileService = new Profile()

export { authService, todoService, profileService }

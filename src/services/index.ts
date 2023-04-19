import Auth from './auth'
import Account from './account'
import Todo from './todos'

const AuthService = new Auth()
const AccountService = new Account()
const TodoService = new Todo()

export { AuthService, AccountService, TodoService }

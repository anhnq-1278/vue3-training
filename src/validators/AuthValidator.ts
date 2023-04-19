import { defineRule } from 'vee-validate'

defineRule('required', (value: string) => {
  return !!value || 'This field is required'
})

defineRule('email', (value: string) => {
  const regex = /^([\w]+([a-zA-Z0-9\_\.\+\-]))*[\w]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

  return regex.test(value) || 'This field must be a valid email'
})

defineRule('password', (value: string) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%])[A-Za-z\d!@#$%]{6,16}$/
  return (
    regex.test(value) ||
    'Password must be between 6 and 16 characters and include at least one uppercase letter, one lowercase letter, and one special character (!@#$%)'
  )
})

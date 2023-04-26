import { defineRule } from 'vee-validate'

defineRule('required', (value: string) => {
  return !!value || 'This field is required'
})

defineRule('email', (value: string) => {
  const regex =
    /^([\w]+([a-zA-Z0-9\_\.\+\-]))*[\w]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

  return regex.test(value) || 'This field must be a valid email'
})

defineRule('password', (value: string) => {
  if (!value) return true

  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%])[A-Za-z\d!@#$%]{6,16}$/
  return (
    regex.test(value) ||
    'Password must be between 6 and 16 characters and include at least one uppercase letter, one lowercase letter, and one special character (!@#$%)'
  )
})

defineRule('date', (value: string) => {
  if (!value) return true
  const regex = /^(\d{4})-(0\d|1[0-2])-(0\d|1\d|2\d|3[01])$/

  return regex.test(value) || 'This field must be a date has yyyy-mm-dd format'
})

defineRule('phone', (value: string) => {
  if (!value) return true
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  return regex.test(value) || 'Not Viet Nam phone format, example: 840123456789 '
})

defineRule('confirmedPassword', (value: string, _, target: any) => {
  const valueConfirm = target.rule.params[0]

  return value === target.form[valueConfirm] || 'This password not matches'
})  

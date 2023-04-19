import { defineRule } from 'vee-validate'

defineRule('required', (value: string) => {
  if (!value || !value.length) {
    return 'This field is required'
  }

  return true
})

defineRule('email', (value: string) => {
  if (!value || !value.length) {
    return true
  }

  const regexExp = /^\S+@\S+\.\S+$/

  if (!regexExp.test(value)) {
    return 'This field must be a valid email'
  }

  return true
})

defineRule('min', (value: string, [limit]: any) => {
  if (!value || !value.length) {
    return true
  }

  if (value.length < limit) {
    return `This field must be at least ${limit} characters`
  }

  return true
})

defineRule('max', (value: string, [limit]: any) => {
  if (!value || !value.length) {
    return true
  }

  if (value.length > limit) {
    return `This field must be at least ${limit} characters`
  }

  return true
})

defineRule('password', (value: string) => {
  const regexExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$/
  if (!regexExp.test(value)) {
    return 'Password minimum 6 characters and maxmimum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
  }

  return true
})

import { defineRule } from 'vee-validate'
import { confirmed } from '@vee-validate/rules'

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
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  if (!regexExp.test(value)) {
    return 'This field must be a valid email';
  }
  return true
})

defineRule('phone', (value: string) => {
  if (!value || !value.length) {
    return false
  }
  const MOBILEREG = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  if (!MOBILEREG.test(value)) {
    return 'This field must be a valid phone';
  }
  return true
})

defineRule('password', (password: string) => {
  if (password.length < 8) {
    return "Make the password larger 8 char";
  }

  if (!password.match(/[a-z]/) || !password.match(/[A-Z]/)) {
    return "password should be Use both lowercase and uppercase letters. ";
  }

  if (!password.match(/\d/)) {
    return "password should be Include at least one number. ";
  }

  if (!password.match(/[^a-zA-Z\d]/)) {
    return "password should be Include at least one special character. ";
  }

  return true
})

defineRule('confirmed', confirmed);

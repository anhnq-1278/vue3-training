import { defineRule } from 'vee-validate'

defineRule('required', (value: string) => {
  return !!value || 'This field is required'
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

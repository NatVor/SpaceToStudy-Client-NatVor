export const emptyField = (value, helperText) => {
  if (!value) {
    return 'common.errorMessages.emptyField'
  }
  return helperText
}

export const nameField = (value) => {
  let helperText
  if (value.length > 30) {
    helperText = 'common.errorMessages.nameLength'
  }
  if (!RegExp(/^[a-zа-яєії]+$/i).test(value)) {
    helperText = 'common.errorMessages.nameAlphabeticOnly'
  }
  helperText = emptyField(value, helperText)
  return helperText
}

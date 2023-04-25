export const formatDate = (date: Date | undefined) => {
  if (date) {
    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()

    let month = mm.toString()
    let day = dd.toString()

    if (mm < 10) month = '0' + mm
    if (dd < 10) day = '0' + dd

    if (mm < 10) return yyyy + '-' + month + '-' + day
  }
}

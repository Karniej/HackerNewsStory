export const timePassedCounter = (time: number) => {
  const dateNow = Date.now()
  const creationDate = time * 1000
  const timePassed = dateNow - creationDate
  const minutes = 6000
  const hours = minutes * 60
  const days = hours * 24
  const timePassedInMinutes = Math.round(timePassed / minutes)
  if (timePassedInMinutes > 60) {
    if (timePassedInMinutes > 1440) {
      return `${Math.round(timePassed / days)} days ago`
    }
    return `${Math.round(timePassed / hours)} hours ago`
  }
}

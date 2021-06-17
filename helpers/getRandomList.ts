export const getRandomList = (arr: Array<string>, n: number): Array<string> => {
  let result = new Array(n),
    length = arr.length,
    taken = new Array(length)

  while (n--) {
    const x = Math.floor(Math.random() * length)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --length in taken ? taken[length] : length
  }
  return result
}

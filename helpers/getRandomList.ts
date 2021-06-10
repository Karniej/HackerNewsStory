export const getRandomList = (arr: Array<string>, n: number): Array<string> => {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len)

  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

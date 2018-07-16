
export function generateRandomCoords(exclude, config) {
  if (exclude.length >= config.blocksAmount.sum) {
    throw new Error('field full')
  }
  let coords = {
      x: Math.round(Math.random() * (config.blocksAmount.horizontal - 1)) * config.blockSize ,
      y: Math.round(Math.random() * (config.blocksAmount.vertical - 1)) * config.blockSize
  }

  return (checkCoords(exclude, coords)) ? generateRandomCoords(exclude, config) : coords
}

export function checkCoords(array, newCoords) {
  return array.find(coords => {
      return (coords.x == newCoords.x && coords.y == newCoords.y)
  })
}


export function pickRandomObj(obj) {
  return obj[pickRandomObjKey]
}

export function pickRandomObjKey(obj) {
  let keys = Object.keys(obj)
  return keys[Math.round(Math.random() * (keys.length - 1))]
}
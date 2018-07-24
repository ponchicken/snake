
export function generateRandomCoords(config, exclude = []) {
  if (exclude.length >= config.blocksAmount.sum) {
    throw new Error('field full')
  }
  let coords = {
      x: Math.round(Math.random() * (config.blocksAmount.horizontal - 1)) * config.blockSize ,
      y: Math.round(Math.random() * (config.blocksAmount.vertical - 1)) * config.blockSize
  }

  return (checkCoords(exclude, coords)) ? generateRandomCoords(config, exclude) : coords
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

export function loadSVG(coords, imgsrc, ctx, size) {
    let img = new Image
    img.src = `./images/${imgsrc}`
    img.onload = function() {
        var imgW = img.naturalWidth, imgH = img.naturalHeight;        
        ctx.drawImage(img, coords.x, coords.y, size, size);
    }
}

export function getSmallerCoords(blockSize, coords) {
    let padding = blockSize / 4
    return {
        x: coords.x + padding,
        y: coords.y + padding,
        size: blockSize / 2
    }
}

export function removeDuplicates(array, keys) {
    keys = keys || Object.keys(array[0])
    return array.filter((item, index) => {
        return array.findIndex(foundItem => {
            return compareObjects(item, foundItem, keys)
        }) == index
    })
}

export function compareObjects(obj1, obj2, keys) {
    keys = keys || Object.keys(obj1)
    return keys.every(key => {
        return obj1[key] == obj2[key]
    })
}
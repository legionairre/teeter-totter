import _ from 'lodash'

function generateRandomRGBColor () {
  const maxValue = 200

  const r = generateRandomNumber(0, maxValue)
  const g = generateRandomNumber(0, maxValue)
  const b = generateRandomNumber(0, maxValue)

  return `rgb(${r}, ${g}, ${b})`
}

function generateRandomNumber (min = 0, max = 1) {
  return min + Math.round(Math.random() * max)
}

function roundNumberMultipleOfFive (num) {
  if (num % 5 === 0) {
    return num
  } else {
    return ((Math.floor(num / 5)) * 5) + 5
  }
}

export const createShape = (minWeight, maxWeight, autoMode, diffMoment) => {
  const weight = generateRandomNumber(minWeight, maxWeight - 1)
  const type = generateRandomNumber(1, 2)
  const left = roundNumberMultipleOfFive(generateRandomNumber(5, 45))
  const color = generateRandomRGBColor()
  const top = 0
  const scale = 1 + (0.05 * (weight - 1))
  const id = _.uniqueId('shape_')
  return {
    id,
    color,
    left,
    scale,
    top,
    type,
    weight
  }
}

export const shapeQuantity = (shapes = [], leftSide = false) => {
  return shapes.reduce((total, current) => {
    const left = leftSide ? (50 - current.left) : current.left

    total += current.weight * left

    return total
  }, 0)
}

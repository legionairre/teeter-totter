import {
  MAX_INTERVAL,
  MIN_INTERVAL,
  MIN_WEIGHT,
  MAX_WEIGHT
} from '@/constants'
import { createShape } from '@/helpers'

export default {
  addDroppedShape (state, shape = {}) {
    state.leftSideDroppedShapes.push(shape)
  },
  clearAllShapeArrs (state) {
    state.leftSideDroppedShapes = []
    state.fallingShapes = []
    state.rightSideShapes = []
  },
  togglePlayGame (state) {
    state.isPause = !state.isPause
  },
  generateShape ({
    rightSideShapes,
    fallingShapes,
    autoMode,
    diffMoment
  }, randomlyPlaced = false) {
    const shape = createShape(MIN_WEIGHT, MAX_WEIGHT, autoMode, diffMoment)
    if (randomlyPlaced) {
      rightSideShapes.push(shape)
    } else {
      fallingShapes.push(shape)
    }
  },
  toggleModal (state, modalOpen = false) {
    state.modalOpen = modalOpen
  },
  updateFallingIntervalGap (state, reset = false) {
    if (reset) {
      state.fallingIntervalGap = MAX_INTERVAL
    } else if (state.fallingIntervalGap > MIN_INTERVAL) {
      state.fallingIntervalGap--
    }
  },
  toggleAutoMode (state) {
    state.autoMode = !state.autoMode
  },
  setDiffMoment (state, val) {
    state.diffMoment = val
  },
  setFallingShapeLeft (state, leftValue) {
    state.fallingShapes[1].left = leftValue
  }
}

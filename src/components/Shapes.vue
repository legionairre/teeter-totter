<template>
  <div class="shapes">
    <Shape v-for="shape in fallingShapes" :key="shape.id" :shape="shape" :id="`shapes-${ shape.id }`"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { LEFT_ARROW_KEY, RIGHT_ARROW_KEY, BOARD_HEIGHT, BOARD_WIDTH } from '@/constants'

import Shape from '@/components/Shape.vue'

export default {
  name: 'Shapes',
  props: {
    leverAngle: [String, Number],
    leverAngleInLimit: Boolean
  },
  components: {
    Shape
  },
  data () {
    return {
      shapeBottomLimit: null,
      boardEl: null
    }
  },
  computed: {
    ...mapState(['fallingIntervalGap', 'fallingShapes', 'isPause', 'autoMode', 'diffMoment']),
    fallingShapeEl () {
      const { id } = this.fallingShapes[0]
      return document.getElementById(`shapes-${id}`)
    }
  },
  methods: {
    ...mapMutations([
      'addDroppedShape',
      'generateShape',
      'togglePlayGame',
      'toggleModal',
      'updateFallingIntervalGap',
      'setFallingShapeLeft'
    ]),
    animateShape () {
      this.intervalId = setInterval(() => {
        if (this.fallingShapes[0]) {
          if (this.fallingShapes[0].top >= this.shapeBottomLimit) {
            const droppedShape = this.fallingShapes.shift()
            clearInterval(this.intervalId)

            this.addDroppedShape(droppedShape)
            this.updateFallingIntervalGap()
            this.generateShape()
            if (this.autoMode) {
              this.autoModeAnimation()
            }
            this.animateShape()
          } else {
            this.fallingShapes[0].top += 1
            this.fallingShapeEl.style.top = `${this.fallingShapes[0].top}px`
          }
        }
      }, this.fallingIntervalGap)
    },
    autoModeAnimation () {
      const {
        weight,
        left
      } = this.$store.state.fallingShapes[0]
      console.log(weight, left)
      const moment = weight * left / 10
      let innerLeft = left
      if (this.diffMoment < 0) {
        while (moment < Math.abs(this.diffMoment) || innerLeft > 5) {
          innerLeft -= left - 5
          console.log(innerLeft)
          if (innerLeft < 45 && innerLeft > 5) {
            this.setFallingShapeLeft(innerLeft)
          } else return
        }
      } else {
        while (moment < Math.abs(this.diffMoment) || innerLeft > 45) {
          innerLeft += left + 5
          if (innerLeft < 45 && innerLeft > 5) {
            this.setFallingShapeLeft(innerLeft)
          } else return
        }
      }
      console.log(weight, left)
    },
    setShapeBottom () {
      const boardBounds = document.querySelector('.teeter-totter-container').getBoundingClientRect()
      const panelBounds = document.querySelector('.header-container').getBoundingClientRect()
      const shapeBounds = this.fallingShapeEl.getBoundingClientRect()
      const leverHeight = boardBounds.bottom - boardBounds.top - BOARD_HEIGHT
      const similarCather = (this.fallingShapes[0].left * leverHeight) / BOARD_WIDTH
      this.shapeBottomLimit = this.leverAngle >= 0
        ? boardBounds.top + similarCather - shapeBounds.height - panelBounds.height
        : boardBounds.bottom - similarCather - shapeBounds.height - panelBounds.height
    },
    handleBoardTransitionEnd () {
      if (!this.isPause && this.leverAngleInLimit) {
        this.setShapeBottom()
      } else {
        this.togglePlayGame()
        this.toggleModal(true)
      }
    },
    moveFallingShape ({ keyCode }) {
      if (!this.isPause && (keyCode === LEFT_ARROW_KEY || keyCode === RIGHT_ARROW_KEY)) {
        const shapeWidth = this.fallingShapeEl.getBoundingClientRect().width
        const areaWidth = document.querySelector('.shapes').getBoundingClientRect().width
        this.move(keyCode, shapeWidth, areaWidth)
        this.$nextTick(this.setShapeBottom)
      }
    },
    move (keyCode, shapeWidth, areaWidth) {
      const shape = this.$store.state.fallingShapes[0]
      const width = (shapeWidth / areaWidth) * 100
      const canMoveLeft = shape.left - 10 >= 5
      const canMoveRight = shape.left + 10 + width <= 50
      if (keyCode === LEFT_ARROW_KEY) {
        canMoveLeft && (shape.left = shape.left - 10)
      } else {
        canMoveRight && (shape.left = shape.left + 10)
      }
    }
  },
  mounted () {
    this.boardEl = document.querySelector('.teeter-totter-surface')
    this.boardEl.addEventListener('transitionend', this.handleBoardTransitionEnd)
    window.addEventListener('keydown', this.moveFallingShape)
  },
  destroyed () {
    this.boardEl.removeEventListener('transitionend', this.handleBoardTransitionEnd)
    window.removeEventListener('keydown', this.moveFallingShape)
  },
  watch: {
    isPause: {
      handler (current) {
        if (current) {
          clearInterval(this.intervalId)
        } else {
          this.setShapeBottom()
          this.animateShape()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

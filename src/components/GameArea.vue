<template>
  <section class="play-ground">
    <Shapes :lever-angle="leverAngle" :lever-angle-in-limit="leverAngleInLimit"/>
    <TeeterTotter :lever-angle="leverAngle" :lever-angle-in-limit="leverAngleInLimit"/>
  </section>
</template>

<script>
import TeeterTotter from '@/components/TeeterTotter'
import { mapActions } from 'vuex'
import { MAX_BENDING_ANGLE, MIN_BENDING_ANGLE } from '@/constants'
import Shapes from '@/components/Shapes'
import { shapeQuantity } from '@/helpers'

export default {
  name: 'GameArea',
  components: {
    TeeterTotter,
    Shapes
  },
  computed: {
    leverAngle () {
      let angle = 0
      if (!this.leftSideDroppedShapesSum) {
        angle = MAX_BENDING_ANGLE
      } else {
        const subtraction = Math.abs(this.leftSideDroppedShapesSum - this.rightSideShapesSum)
        angle = this.leftSideDroppedShapesSum > this.rightSideShapesSum
          ? subtraction / this.leftSideDroppedShapesSum * -50
          : subtraction / this.rightSideShapesSum * 50
      }
      return angle
    },
    leftSideDroppedShapesSum () {
      return shapeQuantity(this.$store.state.leftSideDroppedShapes, true)
    },
    rightSideShapesSum () {
      return shapeQuantity(this.$store.state.rightSideShapes)
    },
    leverAngleInLimit () {
      return this.leverAngle > MIN_BENDING_ANGLE &&
        this.leverAngle < MAX_BENDING_ANGLE
    }
  },
  created () {
    this.initGame()
  },
  methods: {
    ...mapActions(['initGame'])
  }
}
</script>

<style lang="scss" scoped>
.play-ground {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 750px;
}
</style>

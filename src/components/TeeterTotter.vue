<template>
  <div class="teeter-totter-container">
    <div class="teeter-totter-surface" :style="boardStyles">
      <Shape v-for="shape in leftSideDroppedShapes" :key="shape.id" :shape="shape" on-board/>
      <Shape v-for="shape in rightSideShapes" :key="shape.id" :shape="shape" on-board :is-random="true"/>
    </div>
    <div class="teeter-totter-lever"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { BOARD_HEIGHT } from '@/constants'

import Shape from '@/components/Shape'

export default {
  name: 'TeeterTotter',
  props: {
    leverAngle: [String, Number],
    leverAngleInLimit: Boolean
  },
  components: {
    Shape
  },
  computed: {
    ...mapState(['leftSideDroppedShapes', 'rightSideShapes']),
    boardStyles () {
      return {
        transform: `rotate(${this.leverAngle / 2}deg)`,
        height: `${BOARD_HEIGHT}px`
      }
    },
    shapesDiff () {
      return this.leftSideDroppedShapes.length - this.rightSideShapes.length
    }
  },
  watch: {
    shapesDiff (current) {
      if (current && this.leverAngleInLimit) {
        this.generateShape(true)
      }
    }
  },
  methods: {
    ...mapMutations(['generateShape'])
  }
}
</script>

<style lang="scss" scoped>
.teeter-totter-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .teeter-totter-surface {
    background: radial-gradient(circle, #0091ff 0, #002541 100%);
    position: relative;
    height: 5px;
    width: 100%;
    transition: 300ms all;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  }

  .teeter-totter-lever {
    position: relative;
    width: 0;
    height: 0;
    border-width: 0 40px 100px 40px;
    border-color: transparent transparent #0091ff transparent;
    border-style: solid;
  }

  .teeter-totter-lever:after {
    content: "";
    position: absolute;
    top: 75px;
    right: -50px;
    width: 100px;
    height: 5px;
    box-shadow: 0 35px 25px 0 rgba(0, 0, 0, 0.7);
  }
}
</style>

<template>
  <div id="app">
    <div class="header-container">
      <Header/>
    </div>
    <GameArea/>
    <Modal v-if="modalOpen"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import GameArea from '@/components/GameArea'
import Modal from '@/components/Modal'

import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Modal,
    Header,
    GameArea
  },
  computed: {
    ...mapState(['modalOpen'])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px 90px;
  height: 100vh;
  background: #DAE2F8; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #D6A4A4, #DAE2F8); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #D6A4A4, #DAE2F8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .header-container {
    border-bottom: 1px solid #2c3e50;
  }
}
</style>

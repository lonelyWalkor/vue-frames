<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome topahot'
    }
  },
  mounted () {
    console.log(this)
    Toast('alerty')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

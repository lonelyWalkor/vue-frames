<template>
  <div id="home">
    {{msg}}
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      msg: 'hello word'
    }
  },
  computed: {
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
      // 代码保证 this.$el 在 document 中
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.redtext {
  color: red;
}
.big {
  font-size: 140%;
}
.pull-right span{
	cursor: pointer;
}
</style>

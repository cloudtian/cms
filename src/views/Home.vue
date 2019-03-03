<template>
  <div class="home">
    <div>年龄{{age}} 名称{{name}}</div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      age: 0,
      name: ''
    }
  },
  mounted () {
    this.$axios.get('/api/data').then(res => {
      this.age = res.data.age;
    })

    this.$axios.get('/api/info').then(res => {
      this.name = res.data.name;
    })
  }
}
</script>

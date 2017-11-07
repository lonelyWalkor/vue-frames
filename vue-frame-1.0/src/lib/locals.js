import _ from 'lodash'
import Vue from 'vue'

class Locals {
  constructor (id, initData) {
    this.beforeCreate(id, initData)
  }

  beforeCreate (id, initData) {
    id = 'vue_' + id
    let local = new Vue({
      data () {
        let data = initData
        _.assign(data, this.load())
        console.log(id, data)
        return {
          data
        }
      },
      methods: {
        save () {
          window.localStorage.setItem(id, JSON.stringify(this.data))
        },
        load () {
          return JSON.parse(window.localStorage.getItem(id))
        }
      },
      created () {
        this.$watch('data', (n) => {
          console.log(id + ' data change')
          this.save()
        }, {
          deep: true
        })
      }
    })
    this.data = local.$data.data
  }
}

export default Locals


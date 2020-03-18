import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

// 使用 mixin 来完成标题管理
Vue.mixin(titleMixin)

// 注册全局filters工具
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export function createApp () {
  // 创建 router 实例和 store 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态（route state）到store
  sync(store, router)

  // 创建应用程序实例，将router和store注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 返回app和router
  return { app, router, store }
}
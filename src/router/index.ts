import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: { name: "pc" },
  },
  {
    path: "/pc",
    name: "pc",
    component: () => import("@/views/stage/pc.vue"),
  },
  {
    path: "/mobile",
    name: "mobile",
    component: () => import("@/views/stage/mobile.vue"),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router

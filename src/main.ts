import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import router from "@/router/index"
import "element-plus/dist/index.css"
import "./style/index"
import "./permission"
createApp(App).use(ElementPlus).use(router).mount("#app")

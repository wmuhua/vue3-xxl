import router from "@/router/index"
import { _isMobile } from "./utils/utils"

router.beforeEach((to, from, next) => {
  if (_isMobile()) {
    if (to.path == "/mobile") next()
    else next({ path: "/mobile" })
  } else {
    if (to.path == "/" || to.path == "/pc") next()
    else next({ path: "/pc" })
  }
})

<template>
  <div class="container">
    <div class="stage">
      <div class="game-name" v-show="!isStart">华容道</div>
      <div class="content clearfix" v-show="isStart">
        <div
          v-for="item in data"
          :key="item"
          :class="`img${level}`"
          @click="handleMove(item)"
        >
          <el-image
            v-if="item != data.length"
            :src="getSmallImg(`${gameImg}/${level}/${item}.jpg`)"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="other">
      <div class="point">
        <el-image :src="getGameImgFile(gameImg)"></el-image>
      </div>
      <Control
        :step="step"
        :isStart="isStart"
        @gameChange="gameChange"
        @imgChange="imgChange"
      ></Control>
    </div>
  </div>
</template>

<script setup lang="ts">
import Control from "./components/control.vue"
import { reactive, toRefs } from "vue"
import { getGameImgFile, getSmallImg, IMode } from "@/utils/utils"
import Puzzle from "@/utils/puzzle"
let games = reactive(new Puzzle())
const { gameImg, data, level, step, isStart } = toRefs(games)

// 游戏开关
const gameChange = (state: boolean, config: IMode) => {
  games.change(state)
  games.init(config)
}
// 切换主图
const imgChange = (img: string) => {
  games.setImg(img)
}
// 移动图片
const handleMove = (index: number) => {
  games.move(index)
}
</script>

<style scoped></style>

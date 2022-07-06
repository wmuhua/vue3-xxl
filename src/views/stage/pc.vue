<template>
  <div class="container">
    <div v-show="flag" class="welcome">
      <img class="title-img" src="@/assets/images/text.png" />
      <el-button class="change-btn" type="primary" @click="handleStart"
        >开始游戏</el-button
      >
    </div>
    <div class="score">{{ score }}分</div>
    <div class="stage">
      <div
        v-for="item in data"
        :style="{
          left: `${item.positionLeft}px`,
          top: `${item.positionTop}px`,
        }"
        :key="item.key"
        :class="[
          'square',
          `type${item.type}`,
          `scale${item.scale}`,
          { active: item.active },
        ]"
        @click="handleClick(item)"
      ></div>
    </div>
    <el-button class="change-btn" type="primary" @click="handleOver"
      >结束游戏</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue"
import Stage from "@/utils/stage"
import { ElMessageBox } from "element-plus"
import type { Action } from "element-plus"
const flag = ref(true)

let games = reactive(new Stage(8, 8, 50))
const { data, score } = toRefs(games)
const handleStart = () => {
  flag.value = false
  games.gameLoop(true)
}
const handleClick = (item: any) => {
  games.click(item)
}
const handleOver = () => {
  ElMessageBox.alert(`当前成绩：${score.value}分`, "雪糕消消大作战", {
    confirmButtonText: "确定",
    callback: (action: Action) => {
      flag.value = true
    },
  })
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 420px;
  height: 650px;
  text-align: center;
  background-color: #ccc;
  background-image: url("@/assets/images/bg.jpg");
  background-size: 100% 100%;
  .stage {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-top: -200px;
    margin-left: -200px;
    background-color: rgba(116, 183, 187, 0.7);
    border: 1px solid #fff;
    .square {
      position: absolute;
      width: 50px;
      height: 50px;
      border: 1px solid #fff;
      box-sizing: border-box;
      transition: 0.5s;
      background-repeat: no-repeat;
      background-size: 85% 85%;
      background-position: center;
    }
    .type0 {
      background-image: url("@/assets/images/0.png");
    }
    .type1 {
      background-image: url("@/assets/images/1.png");
    }
    .type2 {
      background-image: url("@/assets/images/2.png");
    }
    .type3 {
      background-image: url("@/assets/images/3.png");
    }
    .type4 {
      background-image: url("@/assets/images/4.png");
    }
    .type5 {
      background-image: url("@/assets/images/5.png");
    }
    .type6 {
      background-image: url("@/assets/images/6.png");
    }
    .active {
      background-color: #f0f;
    }
    .scale0 {
      transform: scale(0);
      z-index: 0;
    }
    .scale1 {
      transform: scale(1);
      z-index: 1;
    }
  }
  .welcome {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/bg.jpg");
    background-size: 100% 100%;
    z-index: 2;
    overflow: hidden;
    .title-img {
      margin-top: 200px;
      width: 100%;
      transform: rotate(-10deg);
    }
  }
  .score {
    margin-top: 30px;
    font-weight: bold;
    font-size: 28px;
    color: #fff;
  }
  .change-btn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

interface IXXL {
  x: number // 游戏舞台行列方块个数
  y: number
  size: number // 方块大小
  typeCount: number // 方块内容种类个数
  matrix: Array<any> // 方块矩阵，用于每次消除之后根据矩阵规则生成新的游戏棋盘
  data: Array<any> // 用于渲染页面
  score: number // 分数
  isHandle: boolean // 游戏是否正在消除/下落/添加处理中
  isSelect: boolean // 是否有选择
  target1: any // 选择的目标
  target2: any
}
export default class Stage implements IXXL {
  x: number
  y: number
  size: number
  typeCount = 7
  matrix: Array<any> = []
  data: Array<any> = []
  isHandle = false
  isSelect = false
  score = 0
  target1: any = { active: false }
  target2: any = {}
  constructor(x: number, y: number, size: number) {
    this.x = x
    this.y = y
    this.size = size
    this.getMatrix()
    this.init(true)
  }
  // 点击小方块
  click(target: any) {
    if (this.isHandle) return
    // console.log(target)
    const { isSelect } = this
    if (!isSelect) {
      // 选择第一个
      target.active = true
      this.target1 = target
      this.isSelect = true
    } else {
      // 选择第二个
      if (this.target1 === target) return
      this.target1.active = false
      // 如果是相邻的
      if (
        ["left", "top", "bottom", "right"].some(
          (item) => this.target1[item] == target
        )
      ) {
        this.target2 = target
        ;(async () => {
          // 调换位置
          await this.swap()
          let res = await this.gameLoop()
          // 还原
          if (!res) {
            await this.swap()
          }
        })()
        this.isSelect = false
      } else {
        // 如果不是相邻的
        target.active = true
        this.target1 = target
        this.isSelect = true
      }
    }
  }
  // 换位置
  swap() {
    return new Promise((resolve, reject) => {
      const { target1, target2, data } = this
      const { positionLeft: pl1, positionTop: pt1, x: x1, y: y1 } = target1
      const { positionLeft: pl2, positionTop: pt2, x: x2, y: y2 } = target2
      setTimeout(() => {
        target1.positionLeft = pl2
        target1.positionTop = pt2
        target1.x = x2
        target1.y = y2
        target2.positionLeft = pl1
        target2.positionTop = pt1
        target2.x = x1
        target2.y = y1
        data.forEach((square) => {
          square.left = data.find(
            (item) => item.x == square.x - 1 && item.y == square.y
          )
          square.right = data.find(
            (item) => item.x == square.x + 1 && item.y == square.y
          )
          square.top = data.find(
            (item) => item.x == square.x && item.y == square.y - 1
          )
          square.bottom = data.find(
            (item) => item.x == square.x && item.y == square.y + 1
          )
        })
      }, 0)
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }
  // 游戏开始
  async gameLoop(bool: boolean = false) {
    if (bool) this.score = 0
    this.isHandle = true
    // 要等清除动画执行完，所以用await
    await this.remove()
    let status = this.data.some((item) => item.status === "remove")
    while (this.data.some((item) => item.status === "remove")) {
      await this.down()
      await this.add()
      await this.remove()
    }
    this.isHandle = false
    return status
  }
  // 清除
  remove() {
    return new Promise((resolve, reject) => {
      const { data } = this
      data.forEach((item) => {
        const { left, right, top, bottom, type } = item
        if (left?.type == type && right?.type == type) {
          left.status = "remove"
          item.status = "remove"
          right.status = "remove"
        }
        if (top?.type == type && bottom?.type == type) {
          top.status = "remove"
          item.status = "remove"
          bottom.status = "remove"
        }
      })
      setTimeout(() => {
        data.forEach((item, index) => {
          if (item.status === "remove") {
            item.scale = 0
            this.score += 1
          }
        })
      }, 100)
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }
  // 下落
  down() {
    return new Promise((resolve, reject) => {
      const { data, size, x, y } = this
      data.forEach((item, index) => {
        let distance = 0 // 移动格数
        if (item.status === "remove") {
          // 删除的位置上移，调整新增格子的位置
          let top = item.top
          while (top) {
            if (top.status !== "remove") {
              distance += 1
            }
            top = top.top
          }
          // 上移
          if (distance) {
            item.y -= distance
            item.positionTop = item.positionTop - size * distance
          }
        } else {
          let bottom = item.bottom
          while (bottom) {
            if (bottom.status === "remove") {
              distance += 1
            }
            bottom = bottom.bottom
          }
          // 下落
          if (distance) {
            item.y += distance
            item.positionTop = item.positionTop + size * distance
          }
        }
      })
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }
  // 添加
  add() {
    return new Promise((resolve, reject) => {
      const { size, matrix } = this
      // 重置矩阵
      this.getMatrix()
      this.matrix = matrix.map((row, rowIndex) =>
        row.map((col: any, colIndex: number) => {
          return this.data.find((item) => {
            return colIndex == item.x && rowIndex == item.y
          })
        })
      )
      // 根据矩阵需要清除的位置替换新方块
      this.init()
      setTimeout(() => {
        this.data.forEach((item) => {
          if (item.status === "add") {
            item.scale = 1
            item.status = "normal"
          }
        })
      }, 100)
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }
  // 获取矩阵
  getMatrix() {
    const { x, y } = this
    const row = new Array(x).fill(undefined)
    const matrix = new Array(y).fill(undefined).map((item) => row)
    this.matrix = matrix
  }
  // 生成小方块
  init(bool: boolean = false) {
    const { x, y, typeCount, matrix, size } = this
    const data: Array<any> = []
    let _x = 0
    let _y = 0
    for (let i = 0, len = Math.pow(x, 2); i < len; i++) {
      let item
      try {
        item = matrix[_y][_x]
      } catch (e) {}
      let flag: boolean = item && item.status !== "remove"
      let obj = {
        type: flag ? item.type : Math.floor(Math.random() * typeCount),
        x: _x,
        y: _y,
        status: bool ? "normal" : flag ? "normal" : "add",
        positionLeft: flag ? item.positionLeft : size * _x,
        positionTop: flag ? item.positionTop : size * _y,
        left: undefined,
        top: undefined,
        bottom: undefined,
        right: undefined,
        scale: bool ? 1 : flag ? 1 : 0,
        key: item ? item.key + i : `${_x}${_y}`,
        active: false,
      }
      data.push(obj)
      _x++
      if (_x == x) {
        _x = 0
        _y++
      }
    }
    data.forEach((square) => {
      square.left = data.find(
        (item) => item.x == square.x - 1 && item.y == square.y
      )
      square.right = data.find(
        (item) => item.x == square.x + 1 && item.y == square.y
      )
      square.top = data.find(
        (item) => item.x == square.x && item.y == square.y - 1
      )
      square.bottom = data.find(
        (item) => item.x == square.x && item.y == square.y + 1
      )
    })
    this.data = data
  }
}

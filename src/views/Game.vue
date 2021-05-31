<template>
  <div>
    <div>
      <p>roomId: {{ $store.state.roomData[0].roomId }}</p>
      <p class="roomP1">
        <span>player1: {{ $store.state.roomData[0].player1 }}</span>
      </p>
      <p class="roomP2">
        <span>player2: {{ $store.state.roomData[0].player2 }}</span>
      </p>
    </div>
    <div class="fieldContainer">
      <button @click="getRoomData()">更新</button>
      <div class="field" :class="border">
        <div class="row" v-for="(row, rowIndex) in fieldCells" :key="rowIndex">
          <div
            class="cell"
            v-for="(col, colIndex) in row"
            :key="colIndex"
            @click="putCell(rowIndex, colIndex, player)"
          >
            <div :class="cellStatus(col)"></div>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="button" @click="reset()">reset</div>
        <!-- <div class="button" @click="back()">まった</div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomId: this.$store.state.roomId,
      fieldCells: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      player: 1,
      gameEnd: false,
      actionMemory: [],
      fieldWidth: 15,
      fieldHeight: 15,
    };
  },
  computed: {
    border: function() {
      if (this.player < 0) return "borderP2";
      return "borderP1";
    },
  },
  methods: {
    arr2str() {
      let str = "";
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (this.fieldCells[i][j] < 0) {
            str += String(this.fieldCells[i][j] * -3);
          } else {
            str += String(this.fieldCells[i][j]);
          }
        }
      }
      if (this.player < 0) str += "2";
      else str += String(this.player);
      return str;
    },
    str2arr(str) {
      let num = 0;
      let count = 1;
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          num = Number(str.slice(count - 1, count));
          if (num > 2) num /= -3;
          this.fieldCells[i].splice(j, 1, num);
          count++;
        }
      }
      let player = Number(str.slice(count - 1, count));
      if (player > 1) player = -1;
      this.player = player;
    },
    async getRoomData() {
      await this.$store.dispatch("showRoom", { roomId: this.roomId });
      this.str2arr(this.$store.state.roomData[0].game);
    },
    sendMessage() {
      const send = this.arr2str();
      this.$store.dispatch("sendGameMessage", {
        roomId: this.roomId,
        message: send,
      });
    },
    reset() {
      for (let i = 0; i < this.fieldHeight; i++) {
        for (let j = 0; j < this.fieldWidth; j++) {
          this.fieldCells[i].splice(j, 1, 0);
        }
      }
      this.player = 1;
      this.gameEnd = false;
      this.sendMessage();
    },
    back() {
      let posi = this.actionMemory.pop();
      this.fieldCells[posi[0]].splice(posi[1], 1, 0);
      this.player *= -1;
      if (this.gameEnd) {
        this.gameEnd = false;
        for (let i = 0; i < this.fieldHeight; i++) {
          for (let j = 0; j < this.fieldWidth; j++) {
            if (this.fieldCells[i][j] == -2)
              this.fieldCells[i].splice(j, 1, -1);
            if (this.fieldCells[i][j] == 2) this.fieldCells[i].splice(j, 1, 1);
          }
        }
      }
    },
    cellStatus(col) {
      switch (col) {
        case 0:
          return "none";
        case 1:
          return "p1";
        case -1:
          return "p2";
        case 2:
          return "endP1";
        case -2:
          return "endP2";
      }
    },
    derction(direction) {
      let ret = [0, 0];
      switch (direction) {
        case 1:
          ret = [-1, 0];
          break;
        case 2:
          ret = [-1, 1];
          break;
        case 3:
          ret = [0, 1];
          break;
        case 4:
          ret = [1, 1];
          break;
      }
      return ret;
    },
    chainChange(position, chain, direction, player) {
      let move = this.derction(direction);
      for (let i = 0; i < chain; i++) {
        this.fieldCells[position[0] + move[0] * i][position[1] + move[1] * i] =
          player * 2;
      }
    },
    putCell(row, col, setnum) {
      let judges = [];
      if (
        this.fieldCells[row][col] != 0 ||
        this.gameEnd ||
        this.player != this.$store.state.oneTwo
      )
        return;
      this.fieldCells[row].splice(col, 1, setnum);
      for (let i = 0; i < 4; i++) {
        let jud = this.judge(row, col, i + 1, setnum);
        if (jud[0] >= 5) {
          judges.push(jud);
          this.gameEnd = true;
        }
      }
      if (this.gameEnd) {
        for (let i = 0; i < judges.length; i++) {
          this.chainChange(judges[i][1], judges[i][0], judges[i][2], setnum);
        }
      }
      let memo = [row, col];
      this.actionMemory.push(memo);
      // console.log(judges);
      this.player *= -1;
      this.sendMessage();
    },
    judge(row, col, direction, player) {
      let move = this.derction(direction);
      let moved = [0, 0];
      let edge = [row, col];
      let connectNum = 1;
      for (let i = 1; i < 5; i++) {
        moved = [row + move[0] * i, col + move[1] * i];
        if (!this.isAbleCell(moved[0], moved[1])) break;
        // console.log("OK");
        if (this.fieldCells[moved[0]][moved[1]] != player) {
          break;
        }
        connectNum++;
      }
      for (let i = 1; i < 5; i++) {
        moved = [row + move[0] * -i, col + move[1] * -i];
        if (!this.isAbleCell(moved[0], moved[1])) break;
        if (this.fieldCells[moved[0]][moved[1]] != player) {
          break;
        }
        edge = moved;
        connectNum++;
      }
      return [connectNum, edge, direction];
    },
    isAbleCell(row, col) {
      if (
        row >= 0 &&
        row < this.fieldHeight &&
        col >= 0 &&
        col < this.fieldWidth
      )
        return true;
      // console.log("OK");
      return false;
    },
  },
  mounted() {
    this.$store.dispatch("getUser");
    this.getRoomData();
  },
};
</script>
<style>
@media screen and (min-width: 600px) {
  body {
    width: 600px;
    margin: 0 auto;
  }
  html {
    background-color: rgb(174, 190, 206);
  }
}
</style>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.roomP1 span {
  background-color: darksalmon;
  padding: 0px 10px;
}
.roomP2 span {
  background-color: mediumaquamarine;
  padding: 0px 10px;
}
.fieldContainer {
  height: calc(100vh - 268px);
  padding-top: 120px;
  background-color: rgb(217, 223, 224);
}
.field {
  width: 90vw;
  height: 90vw;
  margin: 0 auto;
  border-bottom: solid 1px;
  border-right: solid 1px;
}
.borderP1 {
  border-color: darksalmon;
}
.borderP1 .cell {
  border-color: darksalmon;
}
.borderP2 {
  border-color: mediumaquamarine;
}
.borderP2 .cell {
  border-color: mediumaquamarine;
}
.row {
  display: flex;
  height: 6.666%;
}
.cell {
  width: 6.666%;
  border-top: solid 1px;
  border-left: solid 1px;
}
.p1 {
  height: 100%;
  background-color: darksalmon;
  border-radius: 50%;
}
.p2 {
  height: 100%;
  background-color: mediumaquamarine;
  border-radius: 50%;
}
.endP1 {
  height: 100%;
  background-color: orangered;
  border-radius: 50%;
}
.endP2 {
  height: 100%;
  background-color: springgreen;
  border-radius: 50%;
}
.control {
  width: 90vw;
  margin: 10px auto 0px;
  padding: 5px 0;
  background-color: rgb(156, 206, 238);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
}
.button {
  background-color: paleturquoise;
  padding: 0 7px;
  border-radius: 12px;
}
@media screen and (min-width: 445px) {
  .field {
    width: 400px;
    height: 400px;
  }
  .control {
    width: 400px;
  }
}
</style>

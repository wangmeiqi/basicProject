<template>
  <div class="emotion" v-show="emoji">
    <div style="width: 264px;height: 130px; overflow-y: auto;padding: 0 10px;">
      <ul>
        <li class="item" v-for="(item, index) in emotionList" :key="index" @click="$emit('emotion', item);emoji=false">
          <img :src="item.url" :alt="item.phrase">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emotions from '../assets/js/emotions.js'
export default {
  props: {
    flag: {
      type: Boolean
    }
  },
  data () {
    return {
      emoji: false,
      emotionList: emotions
    }
  },
  watch: {
    flag (ol, nl) {
      this.emoji = !this.emoji
    }
  }
}
</script>

<style lang="scss" scoped>
  .emotion {
    position: absolute;
    bottom: 6px;
    left: 20px;
    z-index: 3;
    background-color: #fff;
    width: 284px;
    height: 150px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    padding: 10px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 2px;
      }
    }
  }
  ::-webkit-scrollbar{
		width: 4px;
		background-color: #f0f0f0;
	}
	::-webkit-scrollbar-thumb{
		background-color: #C1C1C1;
		border-radius: 50%;
	}
</style>
<template>
    <div :class="['gift-container', displayType, { 'autoTurn': isRunning }]">
        <div :class="['gift', config.style]" v-for="(gift, index) in config.gifts" :key="index"
            :style="`transform: rotateX(${(rotate) * index}deg) translateZ(${translateZ}px)`">
            <template v-if="gift.type === 'text'">{{ gift.name }}</template>
            <template v-if="gift.type === 'image'">
                <img :src="gift.path" :height="config.height">
            </template>
        </div>
    </div>
</template>
  
<script  lang="js">
export default {
    name: 'Gift',
    props: {
      trigger: {
        type: Date,
        default: false
      },
      config: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        isRunning: false,
        currentDeg: 0,
        targetDeg: 0,
        giftsDeg: []
      }
    },
    computed: {
      displayType () {
        return this.config.run3D ? 'three-dimension' : 'flat'
      },
      rotate () {
        return 360 / this.config.gifts.length
      },
      translateZ () {
        return (this.config.height / 2) / Math.tan((this.rotate / 2 / 180) * Math.PI)
      }
    },
    watch: {
      config: {
        handler () {
          this.setConfig()
        },
        deep: true
      },
      trigger () {
        this.autoTurn()
      },
      isRunning () {
        if (this.isRunning) {
          setTimeout(() => {
            this.autoTurnStop()
          }, this.config.duration + 200)
        }
      }
    },
    mounted () {
      this.setConfig()
      this.logGiftsDeg()
    },
    destroyed () {
    },
    methods: {
      logGiftsDeg () {
        // 紀錄獎品角度
        this.config.gifts.forEach((gift, index) => {
          this.giftsDeg[index] = {
            from: index === 0 ? 0 : this.giftsDeg[index - 1].to,
            to: index === 0 ? this.rotate : this.giftsDeg[index - 1].to + this.rotate,
            name: gift.name
          }
        })
      },
      setConfig () {
        // 將config的變數們寫入CSS變數中
        this.$el.style.setProperty('--rotateY', `${this.config.rotateY}deg`)
        this.$el.style.setProperty('--duration', `${this.config.duration}ms`)
        this.$el.style.setProperty('--fontSize', `${this.config.fontSize}px`)
        this.$el.style.setProperty('--height', `${this.config.height}px`)
        this.$el.style.setProperty('--width', `${this.config.width}px`)
        this.$el.style.setProperty('--currentDeg', `-${this.currentDeg}deg`)
      },
      autoTurn () {
        // 取得隨機角度(預設至少跑5圈)
        let randomDeg = (Math.random() * 360) + (360 * 5)
        randomDeg -= randomDeg % this.rotate // 減去餘數，避免有高低不一的狀況
        this.targetDeg = randomDeg
        // 取得隨機回彈角度
        const randomRollBackDeg = this.config.rollback
          ? Math.random() * this.config.rollback + 1
          : 1
        // 設定轉動角度
        this.$el.style.setProperty('--targetDeg', `-${this.targetDeg}deg`)
        this.$el.style.setProperty('--rollBackDeg', `${randomRollBackDeg}`)
        // 執行轉動
        this.isRunning = true
      },
      autoTurnStop () {
        // 把結束時的角度設定為當前角度
        this.currentDeg = this.targetDeg % 360
        this.$el.style.setProperty('--currentDeg', `-${this.currentDeg}deg`)
        // 顯示獎品資料(結束角度 + 單片角度/2)
        let giftName = null
        const endDeg = this.currentDeg + (this.rotate / 2)
        this.giftsDeg.forEach((gift) => {
          if (endDeg >= gift.from && endDeg <= gift.to) {
            giftName = gift.name
          }
        })
        // 宣告轉動結束
        this.isRunning = false
        this.$emit('finished', giftName) // 告訴上層已經轉完
      }
    }
  }

</script>
  
<style lang="css">
/* 變數區 START */
.gift-container {
	/* 變數區 END*/
	 perspective: 999999px;
	 user-select: none;
	 position: relative;
	 display: flex;
	 align-items: center;
	 margin-right: var(--width);
	 transform-style: preserve-3d;
}
 .gift-container * {
	 box-sizing: border-box;
}
 .gift-container .gift {
	 position: absolute;
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 width: var(--width);
	 height: var(--height);
	 border: 1px solid #333;
	 background-color: #fff;
	 font-size: var(--fontSize);
}
 .gift-container .gift img {
	 padding: 1px;
}
 .gift-container.flat {
	 transform: rotateX(var(--currentDeg));
}
 .gift-container.flat.autoTurn {
	 transition: var(--duration) ease-in-out;
	 transform: rotateX(var(--targetDeg));
}
 .gift-container.three-dimension {
	 transform: rotateY(var(--rotateY)) rotateX(var(--currentDeg));
}
 .gift-container.three-dimension.autoTurn {
	 transition: var(--duration) cubic-bezier(0.1, 0, 0, var(--rollBackDeg));
	 transform: rotateY(var(--rotateY)) rotateX(var(--targetDeg));
}
 
</style>
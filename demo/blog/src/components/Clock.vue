<!-- vue 模板文件-->
<template>
	<div class="clockCom">
		<div class="clock">
      <div class="hour">
        <div class="hr" id="hr" ref="hr"></div>
      </div>
      <div class="min">
        <div class="mn" id="mn" ref="mn"></div>
      </div>
      <div class="sec">
        <div class="sc" id="sc" ref="sc"></div>
      </div>
    </div>
    <div class="clock_time">
      <span>{{clockTime}}</span>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'clockCom',
		components: {},
		data() {
			return {
        timer:'',
        clockTime:''
			}
		},
		computed: {

		},
		created() {

    },
    
		mounted() {
      this.init();
    },
     beforeDestroy() {
      //清除定时器
      clearInterval(this.timer);
      console.log("beforeDestroy");
    },
		methods: {
      init:function () {
        const deg = 6;
        const hr = this.$refs.hr;
        const mn = this.$refs.mn;
        const sc = this.$refs.sc;

        this.timer = setInterval(() => {
          let day = new Date();
          let hh = day.getHours() * 30;
          let mm = day.getMinutes() * deg;
          let ss = day.getSeconds() * deg;
          var hour = day.getHours() > 9 ? day.getHours():`0${day.getHours()}`;
          var min = day.getMinutes() > 9 ? day.getMinutes():`0${day.getMinutes()}`;
          var sec = day.getSeconds() > 9 ? day.getSeconds():`0${day.getSeconds()}`;
          this.clockTime = `${hour}:${min}:${sec}`
          // console.log(day.getHours(),day.getMinutes(),day.getSeconds());

          hr.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
          mn.style.transform = `rotateZ(${(mm)}deg)`;
          sc.style.transform = `rotateZ(${(ss)}deg)`;
        });
      }
		}

	}
</script>

<style lang="scss" scoped>
	.clockCom{
		width: 240px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // min-height: 100vh;
    // background: #091921;
    .clock{
      width: 240px;
      height: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('/images/clock/clock.png');
      background-size: cover;
      border: 4px solid #091921;
      border-radius: 50%;;
      background-color: #00000063;
      box-shadow: 0 -15px 15px rgba(255,255,255,0.05),
                  inset 0 -15px 15px rgba(255,255,255,0.05),
                  0 15px 15px rgba(0,0,0,0.3),
                  inset 0 15px 15px rgba(0,0,0,0.3);
      .hour,
      .min,
      .sec{
        position: absolute;
      }
      .hr,
      .mn,
      .sc{
        display: flex;
        justify-content: center;
        // align-items: center;
        // position: absolute;
        border-radius: 50%;
      }
      .hr::before{
        content: '';
        position: absolute;
        width: 8px;
        height: 60px;
        background: #ff105e;
        z-index: 10;
        border-radius: 6px 6px 0 0;
      }
      .mn::before{
        content: '';
        position: absolute;
        width: 4px;
        height: 80px;
        background: #fff;
        z-index: 11;
        border-radius: 6px 6px 0 0;
      }
      .sc::before{
        content: '';
        position: absolute;
        width: 2px;
        height: 100px;
        background: #fff;
        z-index: 12;
        border-radius: 6px 6px 0 0;
      }
      .hour{
        .hr{
          width: 120px;
          height: 120px;
        }
      }
      .min{
        .mn{
          width: 140px;
          height: 140px;
        }
      }
      .sec{
        .sc{
          width: 160px;
          height: 160px;
        }
      }
    }
    .clock::before{
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      background: #fff;
      border-radius: 50%;
      z-index: 10000;
    } 
    .clock_time{
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
    }
	}

</style>
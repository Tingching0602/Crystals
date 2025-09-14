<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.slot-button {
  width: 150px;
  height: 60px;
  background-color: #f39c12;
  color: white;
  font-size: 24px;
  border-radius: 30px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.2s;
  margin-left: 20px;
}

.slot-button:hover {
  background-color: #e67e22;
  transform: scale(1.1);
}

.slot-button:active {
  background-color: #d35400;
}

.slot-container {
  width: 300px;
  height: 150px;
  overflow: hidden;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.slot-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: top 0.5s ease;
}

.slot-item {
  text-align: center;
  font-size: 24px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
}
.slot-item.selected {
  background-color: #f39c12; /* 為選中的項目增加顏色 */
  color: white;
}
</style>
<template>
  <!-- 使用 flexbox 來排列拉霸顯示區域和按鈕 -->
  <div class="container">
    <!-- 拉霸顯示區域 -->
    <div class="slot-container">
      <div class="slot-items" :style="{ top: position + 'px' }">
        <div v-for="(item, index) in ary" :key="index" :class="['slot-item', { selected: (randomIndex === index && randomIndex != 0)  }]">
          {{ item.stationName || "無名稱" }}
        </div>
      </div>
    </div>
    <!-- 拉霸按鈕 -->
    <button class="slot-button" @click="randomStation">拉霸</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

interface StationInfo {
  lineId?: string;
  stationId?: string;
  stationName?: string;
}
const position = ref(0);

// const data = ['🍎', '🍌', '🍒', '🍇', '🍍', '🍉', '🍓', '🍋'];
const ary: Array<StationInfo> = reactive([]);
onMounted(() => {
  source.forEach((item: any) => {
    item.Stations.forEach((s_item: any) => {
      if (
        ary.filter((item) => {
          if (item.stationName === s_item.StationName.Zh_tw) return item;
        }).length === 0
      ) {
        const sData: StationInfo = {
          lineId: item.LineID,
          stationId: s_item.StationID,
          stationName: s_item.StationName.Zh_tw,
        };
        ary.push(sData);
      }
    });
  });
});

const randomIndex = ref(0);

const randomStation = () => {
  let index = 0;
  position.value = 0;
  randomIndex.value = 0;
  setTimeout(() => {
    const totalItems = ary.length;
    const duration = 5000; // 滾動持續時間 (5秒)
    const itemHeight = 50; // 每項的高度

    const interval = setInterval(() => {
      index++;
      if (index >= totalItems) {
        index = 0;
      }
      position.value = -index * itemHeight; // 更新滾動位置
    }, 100); // 每100ms移動一次

    // 隨機停止位置
    setTimeout(() => {
      clearInterval(interval); // 停止滾動
      randomIndex.value = Math.floor(Math.random() * totalItems); // 隨機選擇一個位置
      position.value = (-randomIndex.value +1) * itemHeight; // 停止在隨機位置
      console.log(randomIndex.value);
    }, duration); // 5秒後停止
  }, 800);
};

const source = [
  {
    LineNo: "BL",
    LineID: "BL",
    RouteID: "BL-1",
    RouteName: {
      Zh_tw: "頂埔－南港展覽館",
      En: "Dingpu - Taipei Nangang Exhibition Center",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "BL01",
        StationName: {
          Zh_tw: "頂埔",
          En: "Dingpu",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "BL02",
        StationName: {
          Zh_tw: "永寧",
          En: "Yongning",
        },
        CumulativeDistance: 1.95,
      },
      {
        Sequence: 3,
        StationID: "BL03",
        StationName: {
          Zh_tw: "土城",
          En: "Tucheng",
        },
        CumulativeDistance: 3.06,
      },
      {
        Sequence: 4,
        StationID: "BL04",
        StationName: {
          Zh_tw: "海山",
          En: "Haishan",
        },
        CumulativeDistance: 4.53,
      },
      {
        Sequence: 5,
        StationID: "BL05",
        StationName: {
          Zh_tw: "亞東醫院",
          En: "Far Eastern Hospital",
        },
        CumulativeDistance: 6.17,
      },
      {
        Sequence: 6,
        StationID: "BL06",
        StationName: {
          Zh_tw: "府中",
          En: "Fuzhong",
        },
        CumulativeDistance: 7.45,
      },
      {
        Sequence: 7,
        StationID: "BL07",
        StationName: {
          Zh_tw: "板橋",
          En: "Banqiao",
        },
        CumulativeDistance: 8.1,
      },
      {
        Sequence: 8,
        StationID: "BL08",
        StationName: {
          Zh_tw: "新埔",
          En: "Xinpu",
        },
        CumulativeDistance: 9.38,
      },
      {
        Sequence: 9,
        StationID: "BL09",
        StationName: {
          Zh_tw: "江子翠",
          En: "Jiangzicui",
        },
        CumulativeDistance: 10.25,
      },
      {
        Sequence: 10,
        StationID: "BL10",
        StationName: {
          Zh_tw: "龍山寺",
          En: "Longshan Temple",
        },
        CumulativeDistance: 13.33,
      },
      {
        Sequence: 11,
        StationID: "BL11",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 14.64,
      },
      {
        Sequence: 12,
        StationID: "BL12",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 15.99,
      },
      {
        Sequence: 13,
        StationID: "BL13",
        StationName: {
          Zh_tw: "善導寺",
          En: "Shandao Temple",
        },
        CumulativeDistance: 16.67,
      },
      {
        Sequence: 14,
        StationID: "BL14",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 17.61,
      },
      {
        Sequence: 15,
        StationID: "BL15",
        StationName: {
          Zh_tw: "忠孝復興",
          En: "Zhongxiao Fuxing",
        },
        CumulativeDistance: 18.73,
      },
      {
        Sequence: 16,
        StationID: "BL16",
        StationName: {
          Zh_tw: "忠孝敦化",
          En: "Zhongxiao Dunhua",
        },
        CumulativeDistance: 19.4,
      },
      {
        Sequence: 17,
        StationID: "BL17",
        StationName: {
          Zh_tw: "國父紀念館",
          En: "Sun Yat-Sen Memorial Hall",
        },
        CumulativeDistance: 20.13,
      },
      {
        Sequence: 18,
        StationID: "BL18",
        StationName: {
          Zh_tw: "市政府",
          En: "Taipei City Hall",
        },
        CumulativeDistance: 20.97,
      },
      {
        Sequence: 19,
        StationID: "BL19",
        StationName: {
          Zh_tw: "永春",
          En: "Yongchun",
        },
        CumulativeDistance: 21.96,
      },
      {
        Sequence: 20,
        StationID: "BL20",
        StationName: {
          Zh_tw: "後山埤",
          En: "Houshanpi",
        },
        CumulativeDistance: 22.78,
      },
      {
        Sequence: 21,
        StationID: "BL21",
        StationName: {
          Zh_tw: "昆陽",
          En: "Kunyang",
        },
        CumulativeDistance: 24.14,
      },
      {
        Sequence: 22,
        StationID: "BL22",
        StationName: {
          Zh_tw: "南港",
          En: "Nangang",
        },
        CumulativeDistance: 25.56,
      },
      {
        Sequence: 23,
        StationID: "BL23",
        StationName: {
          Zh_tw: "南港展覽館",
          En: "Taipei Nangang Exhibition Center",
        },
        CumulativeDistance: 26.65,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "BL",
    LineID: "BL",
    RouteID: "BL-1",
    RouteName: {
      Zh_tw: "南港展覽館－頂埔",
      En: "Taipei Nangang Exhibition Center - Dingpu",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "BL23",
        StationName: {
          Zh_tw: "南港展覽館",
          En: "Taipei Nangang Exhibition Center",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "BL22",
        StationName: {
          Zh_tw: "南港",
          En: "Nangang",
        },
        CumulativeDistance: 1.09,
      },
      {
        Sequence: 3,
        StationID: "BL21",
        StationName: {
          Zh_tw: "昆陽",
          En: "Kunyang",
        },
        CumulativeDistance: 2.51,
      },
      {
        Sequence: 4,
        StationID: "BL20",
        StationName: {
          Zh_tw: "後山埤",
          En: "Houshanpi",
        },
        CumulativeDistance: 3.87,
      },
      {
        Sequence: 5,
        StationID: "BL19",
        StationName: {
          Zh_tw: "永春",
          En: "Yongchun",
        },
        CumulativeDistance: 4.69,
      },
      {
        Sequence: 6,
        StationID: "BL18",
        StationName: {
          Zh_tw: "市政府",
          En: "Taipei City Hall",
        },
        CumulativeDistance: 5.68,
      },
      {
        Sequence: 7,
        StationID: "BL17",
        StationName: {
          Zh_tw: "國父紀念館",
          En: "Sun Yat-Sen Memorial Hall",
        },
        CumulativeDistance: 6.52,
      },
      {
        Sequence: 8,
        StationID: "BL16",
        StationName: {
          Zh_tw: "忠孝敦化",
          En: "Zhongxiao Dunhua",
        },
        CumulativeDistance: 7.25,
      },
      {
        Sequence: 9,
        StationID: "BL15",
        StationName: {
          Zh_tw: "忠孝復興",
          En: "Zhongxiao Fuxing",
        },
        CumulativeDistance: 7.92,
      },
      {
        Sequence: 10,
        StationID: "BL14",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 9.04,
      },
      {
        Sequence: 11,
        StationID: "BL13",
        StationName: {
          Zh_tw: "善導寺",
          En: "Shandao Temple",
        },
        CumulativeDistance: 9.98,
      },
      {
        Sequence: 12,
        StationID: "BL12",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 10.66,
      },
      {
        Sequence: 13,
        StationID: "BL11",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 12.01,
      },
      {
        Sequence: 14,
        StationID: "BL10",
        StationName: {
          Zh_tw: "龍山寺",
          En: "Longshan Temple",
        },
        CumulativeDistance: 13.32,
      },
      {
        Sequence: 15,
        StationID: "BL09",
        StationName: {
          Zh_tw: "江子翠",
          En: "Jiangzicui",
        },
        CumulativeDistance: 16.4,
      },
      {
        Sequence: 16,
        StationID: "BL08",
        StationName: {
          Zh_tw: "新埔",
          En: "Xinpu",
        },
        CumulativeDistance: 17.27,
      },
      {
        Sequence: 17,
        StationID: "BL07",
        StationName: {
          Zh_tw: "板橋",
          En: "Banqiao",
        },
        CumulativeDistance: 18.55,
      },
      {
        Sequence: 18,
        StationID: "BL06",
        StationName: {
          Zh_tw: "府中",
          En: "Fuzhong",
        },
        CumulativeDistance: 19.2,
      },
      {
        Sequence: 19,
        StationID: "BL05",
        StationName: {
          Zh_tw: "亞東醫院",
          En: "Far Eastern Hospital",
        },
        CumulativeDistance: 20.48,
      },
      {
        Sequence: 20,
        StationID: "BL04",
        StationName: {
          Zh_tw: "海山",
          En: "Haishan",
        },
        CumulativeDistance: 22.12,
      },
      {
        Sequence: 21,
        StationID: "BL03",
        StationName: {
          Zh_tw: "土城",
          En: "Tucheng",
        },
        CumulativeDistance: 23.59,
      },
      {
        Sequence: 22,
        StationID: "BL02",
        StationName: {
          Zh_tw: "永寧",
          En: "Yongning",
        },
        CumulativeDistance: 24.7,
      },
      {
        Sequence: 23,
        StationID: "BL01",
        StationName: {
          Zh_tw: "頂埔",
          En: "Dingpu",
        },
        CumulativeDistance: 26.65,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "BL",
    LineID: "BL",
    RouteID: "BL-2",
    RouteName: {
      Zh_tw: "亞東醫院－南港展覽館",
      En: "Far Eastern Hospital - Taipei Nangang Exhibition Center",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "BL05",
        StationName: {
          Zh_tw: "亞東醫院",
          En: "Far Eastern Hospital",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "BL06",
        StationName: {
          Zh_tw: "府中",
          En: "Fuzhong",
        },
        CumulativeDistance: 1.28,
      },
      {
        Sequence: 3,
        StationID: "BL07",
        StationName: {
          Zh_tw: "板橋",
          En: "Banqiao",
        },
        CumulativeDistance: 1.93,
      },
      {
        Sequence: 4,
        StationID: "BL08",
        StationName: {
          Zh_tw: "新埔",
          En: "Xinpu",
        },
        CumulativeDistance: 3.21,
      },
      {
        Sequence: 5,
        StationID: "BL09",
        StationName: {
          Zh_tw: "江子翠",
          En: "Jiangzicui",
        },
        CumulativeDistance: 4.08,
      },
      {
        Sequence: 6,
        StationID: "BL10",
        StationName: {
          Zh_tw: "龍山寺",
          En: "Longshan Temple",
        },
        CumulativeDistance: 7.16,
      },
      {
        Sequence: 7,
        StationID: "BL11",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 8.47,
      },
      {
        Sequence: 8,
        StationID: "BL12",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 9.82,
      },
      {
        Sequence: 9,
        StationID: "BL13",
        StationName: {
          Zh_tw: "善導寺",
          En: "Shandao Temple",
        },
        CumulativeDistance: 10.5,
      },
      {
        Sequence: 10,
        StationID: "BL14",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 11.44,
      },
      {
        Sequence: 11,
        StationID: "BL15",
        StationName: {
          Zh_tw: "忠孝復興",
          En: "Zhongxiao Fuxing",
        },
        CumulativeDistance: 12.56,
      },
      {
        Sequence: 12,
        StationID: "BL16",
        StationName: {
          Zh_tw: "忠孝敦化",
          En: "Zhongxiao Dunhua",
        },
        CumulativeDistance: 13.23,
      },
      {
        Sequence: 13,
        StationID: "BL17",
        StationName: {
          Zh_tw: "國父紀念館",
          En: "Sun Yat-Sen Memorial Hall",
        },
        CumulativeDistance: 13.96,
      },
      {
        Sequence: 14,
        StationID: "BL18",
        StationName: {
          Zh_tw: "市政府",
          En: "Taipei City Hall",
        },
        CumulativeDistance: 14.8,
      },
      {
        Sequence: 15,
        StationID: "BL19",
        StationName: {
          Zh_tw: "永春",
          En: "Yongchun",
        },
        CumulativeDistance: 15.79,
      },
      {
        Sequence: 16,
        StationID: "BL20",
        StationName: {
          Zh_tw: "後山埤",
          En: "Houshanpi",
        },
        CumulativeDistance: 16.61,
      },
      {
        Sequence: 17,
        StationID: "BL21",
        StationName: {
          Zh_tw: "昆陽",
          En: "Kunyang",
        },
        CumulativeDistance: 17.97,
      },
      {
        Sequence: 18,
        StationID: "BL22",
        StationName: {
          Zh_tw: "南港",
          En: "Nangang",
        },
        CumulativeDistance: 19.39,
      },
      {
        Sequence: 19,
        StationID: "BL23",
        StationName: {
          Zh_tw: "南港展覽館",
          En: "Taipei Nangang Exhibition Center",
        },
        CumulativeDistance: 20.48,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "BL",
    LineID: "BL",
    RouteID: "BL-2",
    RouteName: {
      Zh_tw: "南港展覽館－亞東醫院",
      En: "Taipei Nangang Exhibition Center - Far Eastern Hospital",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "BL23",
        StationName: {
          Zh_tw: "南港展覽館",
          En: "Taipei Nangang Exhibition Center",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "BL22",
        StationName: {
          Zh_tw: "南港",
          En: "Nangang",
        },
        CumulativeDistance: 1.09,
      },
      {
        Sequence: 3,
        StationID: "BL21",
        StationName: {
          Zh_tw: "昆陽",
          En: "Kunyang",
        },
        CumulativeDistance: 2.51,
      },
      {
        Sequence: 4,
        StationID: "BL20",
        StationName: {
          Zh_tw: "後山埤",
          En: "Houshanpi",
        },
        CumulativeDistance: 3.87,
      },
      {
        Sequence: 5,
        StationID: "BL19",
        StationName: {
          Zh_tw: "永春",
          En: "Yongchun",
        },
        CumulativeDistance: 4.69,
      },
      {
        Sequence: 6,
        StationID: "BL18",
        StationName: {
          Zh_tw: "市政府",
          En: "Taipei City Hall",
        },
        CumulativeDistance: 5.68,
      },
      {
        Sequence: 7,
        StationID: "BL17",
        StationName: {
          Zh_tw: "國父紀念館",
          En: "Sun Yat-Sen Memorial Hall",
        },
        CumulativeDistance: 6.52,
      },
      {
        Sequence: 8,
        StationID: "BL16",
        StationName: {
          Zh_tw: "忠孝敦化",
          En: "Zhongxiao Dunhua",
        },
        CumulativeDistance: 7.25,
      },
      {
        Sequence: 9,
        StationID: "BL15",
        StationName: {
          Zh_tw: "忠孝復興",
          En: "Zhongxiao Fuxing",
        },
        CumulativeDistance: 7.92,
      },
      {
        Sequence: 10,
        StationID: "BL14",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 9.04,
      },
      {
        Sequence: 11,
        StationID: "BL13",
        StationName: {
          Zh_tw: "善導寺",
          En: "Shandao Temple",
        },
        CumulativeDistance: 9.98,
      },
      {
        Sequence: 12,
        StationID: "BL12",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 10.66,
      },
      {
        Sequence: 13,
        StationID: "BL11",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 12.01,
      },
      {
        Sequence: 14,
        StationID: "BL10",
        StationName: {
          Zh_tw: "龍山寺",
          En: "Longshan Temple",
        },
        CumulativeDistance: 13.32,
      },
      {
        Sequence: 15,
        StationID: "BL09",
        StationName: {
          Zh_tw: "江子翠",
          En: "Jiangzicui",
        },
        CumulativeDistance: 16.4,
      },
      {
        Sequence: 16,
        StationID: "BL08",
        StationName: {
          Zh_tw: "新埔",
          En: "Xinpu",
        },
        CumulativeDistance: 17.27,
      },
      {
        Sequence: 17,
        StationID: "BL07",
        StationName: {
          Zh_tw: "板橋",
          En: "Banqiao",
        },
        CumulativeDistance: 18.55,
      },
      {
        Sequence: 18,
        StationID: "BL06",
        StationName: {
          Zh_tw: "府中",
          En: "Fuzhong",
        },
        CumulativeDistance: 19.2,
      },
      {
        Sequence: 19,
        StationID: "BL05",
        StationName: {
          Zh_tw: "亞東醫院",
          En: "Far Eastern Hospital",
        },
        CumulativeDistance: 20.48,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "BR",
    LineID: "BR",
    RouteID: "BR-1",
    RouteName: {
      Zh_tw: "動物園－南港展覽館",
      En: "Taipei Zoo - Taipei Nangang Exhibition Center",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "BR01",
        StationName: {
          Zh_tw: "動物園",
          En: "Taipei Zoo",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "BR02",
        StationName: {
          Zh_tw: "木柵",
          En: "Muzha",
        },
        CumulativeDistance: 0.68,
      },
      {
        Sequence: 3,
        StationID: "BR03",
        StationName: {
          Zh_tw: "萬芳社區",
          En: "Wanfang Community",
        },
        CumulativeDistance: 1.2,
      },
      {
        Sequence: 4,
        StationID: "BR04",
        StationName: {
          Zh_tw: "萬芳醫院",
          En: "Wanfang Hospital",
        },
        CumulativeDistance: 2.34,
      },
      {
        Sequence: 5,
        StationID: "BR05",
        StationName: {
          Zh_tw: "辛亥",
          En: "Xinhai",
        },
        CumulativeDistance: 3.1,
      },
      {
        Sequence: 6,
        StationID: "BR06",
        StationName: {
          Zh_tw: "麟光",
          En: "Linguang",
        },
        CumulativeDistance: 4.7,
      },
      {
        Sequence: 7,
        StationID: "BR07",
        StationName: {
          Zh_tw: "六張犁",
          En: "Liuzhangli",
        },
        CumulativeDistance: 5.52,
      },
      {
        Sequence: 8,
        StationID: "BR08",
        StationName: {
          Zh_tw: "科技大樓",
          En: "Technology Building",
        },
        CumulativeDistance: 6.65,
      },
      {
        Sequence: 9,
        StationID: "BR09",
        StationName: {
          Zh_tw: "大安",
          En: "Daan",
        },
        CumulativeDistance: 7.4,
      },
      {
        Sequence: 10,
        StationID: "BR10",
        StationName: {
          Zh_tw: "忠孝復興",
          En: "Zhongxiao Fuxing",
        },
        CumulativeDistance: 8.29,
      },
      {
        Sequence: 11,
        StationID: "BR11",
        StationName: {
          Zh_tw: "南京復興",
          En: "Nanjing Fuxing",
        },
        CumulativeDistance: 9.56,
      },
      {
        Sequence: 12,
        StationID: "BR12",
        StationName: {
          Zh_tw: "中山國中",
          En: "Zhongshan Junior High School",
        },
        CumulativeDistance: 10.49,
      },
      {
        Sequence: 13,
        StationID: "BR13",
        StationName: {
          Zh_tw: "松山機場",
          En: "Songshan Airport",
        },
        CumulativeDistance: 11.97,
      },
      {
        Sequence: 14,
        StationID: "BR14",
        StationName: {
          Zh_tw: "大直",
          En: "Dazhi",
        },
        CumulativeDistance: 14.55,
      },
      {
        Sequence: 15,
        StationID: "BR15",
        StationName: {
          Zh_tw: "劍南路",
          En: "Jiannan Rd.",
        },
        CumulativeDistance: 15.88,
      },
      {
        Sequence: 16,
        StationID: "BR16",
        StationName: {
          Zh_tw: "西湖",
          En: "Xihu",
        },
        CumulativeDistance: 17.17,
      },
      {
        Sequence: 17,
        StationID: "BR17",
        StationName: {
          Zh_tw: "港墘",
          En: "Gangqian",
        },
        CumulativeDistance: 17.99,
      },
      {
        Sequence: 18,
        StationID: "BR18",
        StationName: {
          Zh_tw: "文德",
          En: "Wende",
        },
        CumulativeDistance: 19,
      },
      {
        Sequence: 19,
        StationID: "BR19",
        StationName: {
          Zh_tw: "內湖",
          En: "Neihu",
        },
        CumulativeDistance: 20.13,
      },
      {
        Sequence: 20,
        StationID: "BR20",
        StationName: {
          Zh_tw: "大湖公園",
          En: "Dahu Park",
        },
        CumulativeDistance: 21,
      },
      {
        Sequence: 21,
        StationID: "BR21",
        StationName: {
          Zh_tw: "葫洲",
          En: "Huzhou",
        },
        CumulativeDistance: 22.63,
      },
      {
        Sequence: 22,
        StationID: "BR22",
        StationName: {
          Zh_tw: "東湖",
          En: "Donghu",
        },
        CumulativeDistance: 23.48,
      },
      {
        Sequence: 23,
        StationID: "BR23",
        StationName: {
          Zh_tw: "南港軟體園區",
          En: "Nangang Software Park",
        },
        CumulativeDistance: 24.52,
      },
      {
        Sequence: 24,
        StationID: "BR24",
        StationName: {
          Zh_tw: "南港展覽館",
          En: "Taipei Nangang Exhibition Center",
        },
        CumulativeDistance: 25.17,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "BR",
    LineID: "BR",
    RouteID: "BR-1",
    RouteName: {
      Zh_tw: "南港展覽館－動物園",
      En: "Taipei Nangang Exhibition Center - Taipei Zoo",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "BR24",
        StationName: {
          Zh_tw: "南港展覽館",
          En: "Taipei Nangang Exhibition Center",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "BR23",
        StationName: {
          Zh_tw: "南港軟體園區",
          En: "Nangang Software Park",
        },
        CumulativeDistance: 0.65,
      },
      {
        Sequence: 3,
        StationID: "BR22",
        StationName: {
          Zh_tw: "東湖",
          En: "Donghu",
        },
        CumulativeDistance: 1.69,
      },
      {
        Sequence: 4,
        StationID: "BR21",
        StationName: {
          Zh_tw: "葫洲",
          En: "Huzhou",
        },
        CumulativeDistance: 2.54,
      },
      {
        Sequence: 5,
        StationID: "BR20",
        StationName: {
          Zh_tw: "大湖公園",
          En: "Dahu Park",
        },
        CumulativeDistance: 4.17,
      },
      {
        Sequence: 6,
        StationID: "BR19",
        StationName: {
          Zh_tw: "內湖",
          En: "Neihu",
        },
        CumulativeDistance: 5.04,
      },
      {
        Sequence: 7,
        StationID: "BR18",
        StationName: {
          Zh_tw: "文德",
          En: "Wende",
        },
        CumulativeDistance: 6.17,
      },
      {
        Sequence: 8,
        StationID: "BR17",
        StationName: {
          Zh_tw: "港墘",
          En: "Gangqian",
        },
        CumulativeDistance: 7.18,
      },
      {
        Sequence: 9,
        StationID: "BR16",
        StationName: {
          Zh_tw: "西湖",
          En: "Xihu",
        },
        CumulativeDistance: 8,
      },
      {
        Sequence: 10,
        StationID: "BR15",
        StationName: {
          Zh_tw: "劍南路",
          En: "Jiannan Rd.",
        },
        CumulativeDistance: 9.29,
      },
      {
        Sequence: 11,
        StationID: "BR14",
        StationName: {
          Zh_tw: "大直",
          En: "Dazhi",
        },
        CumulativeDistance: 10.62,
      },
      {
        Sequence: 12,
        StationID: "BR13",
        StationName: {
          Zh_tw: "松山機場",
          En: "Songshan Airport",
        },
        CumulativeDistance: 13.2,
      },
      {
        Sequence: 13,
        StationID: "BR12",
        StationName: {
          Zh_tw: "中山國中",
          En: "Zhongshan Junior High School",
        },
        CumulativeDistance: 14.68,
      },
      {
        Sequence: 14,
        StationID: "BR11",
        StationName: {
          Zh_tw: "南京復興",
          En: "Nanjing Fuxing",
        },
        CumulativeDistance: 15.61,
      },
      {
        Sequence: 15,
        StationID: "BR10",
        StationName: {
          Zh_tw: "忠孝復興",
          En: "Zhongxiao Fuxing",
        },
        CumulativeDistance: 16.88,
      },
      {
        Sequence: 16,
        StationID: "BR09",
        StationName: {
          Zh_tw: "大安",
          En: "Daan",
        },
        CumulativeDistance: 17.77,
      },
      {
        Sequence: 17,
        StationID: "BR08",
        StationName: {
          Zh_tw: "科技大樓",
          En: "Technology Building",
        },
        CumulativeDistance: 18.52,
      },
      {
        Sequence: 18,
        StationID: "BR07",
        StationName: {
          Zh_tw: "六張犁",
          En: "Liuzhangli",
        },
        CumulativeDistance: 19.65,
      },
      {
        Sequence: 19,
        StationID: "BR06",
        StationName: {
          Zh_tw: "麟光",
          En: "Linguang",
        },
        CumulativeDistance: 20.47,
      },
      {
        Sequence: 20,
        StationID: "BR05",
        StationName: {
          Zh_tw: "辛亥",
          En: "Xinhai",
        },
        CumulativeDistance: 22.07,
      },
      {
        Sequence: 21,
        StationID: "BR04",
        StationName: {
          Zh_tw: "萬芳醫院",
          En: "Wanfang Hospital",
        },
        CumulativeDistance: 22.83,
      },
      {
        Sequence: 22,
        StationID: "BR03",
        StationName: {
          Zh_tw: "萬芳社區",
          En: "Wanfang Community",
        },
        CumulativeDistance: 23.97,
      },
      {
        Sequence: 23,
        StationID: "BR02",
        StationName: {
          Zh_tw: "木柵",
          En: "Muzha",
        },
        CumulativeDistance: 24.49,
      },
      {
        Sequence: 24,
        StationID: "BR01",
        StationName: {
          Zh_tw: "動物園",
          En: "Taipei Zoo",
        },
        CumulativeDistance: 25.17,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "G",
    LineID: "G",
    RouteID: "G-1",
    RouteName: {
      Zh_tw: "新店－松山",
      En: "Xindian - Songshan",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "G01",
        StationName: {
          Zh_tw: "新店",
          En: "Xindian",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "G02",
        StationName: {
          Zh_tw: "新店區公所",
          En: "Xindian District Office",
        },
        CumulativeDistance: 1.11,
      },
      {
        Sequence: 3,
        StationID: "G03",
        StationName: {
          Zh_tw: "七張",
          En: "Qizhang",
        },
        CumulativeDistance: 2.01,
      },
      {
        Sequence: 4,
        StationID: "G04",
        StationName: {
          Zh_tw: "大坪林",
          En: "Dapinglin",
        },
        CumulativeDistance: 2.86,
      },
      {
        Sequence: 5,
        StationID: "G05",
        StationName: {
          Zh_tw: "景美",
          En: "Jingmei",
        },
        CumulativeDistance: 4.01,
      },
      {
        Sequence: 6,
        StationID: "G06",
        StationName: {
          Zh_tw: "萬隆",
          En: "Wanlong",
        },
        CumulativeDistance: 5.07,
      },
      {
        Sequence: 7,
        StationID: "G07",
        StationName: {
          Zh_tw: "公館",
          En: "Gongguan",
        },
        CumulativeDistance: 6.63,
      },
      {
        Sequence: 8,
        StationID: "G08",
        StationName: {
          Zh_tw: "台電大樓",
          En: "Taipower Building",
        },
        CumulativeDistance: 7.53,
      },
      {
        Sequence: 9,
        StationID: "G09",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 8.41,
      },
      {
        Sequence: 10,
        StationID: "G10",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 9.34,
      },
      {
        Sequence: 11,
        StationID: "G11",
        StationName: {
          Zh_tw: "小南門",
          En: "Xiaonanmen",
        },
        CumulativeDistance: 10.1,
      },
      {
        Sequence: 12,
        StationID: "G12",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 10.92,
      },
      {
        Sequence: 13,
        StationID: "G13",
        StationName: {
          Zh_tw: "北門",
          En: "Beimen",
        },
        CumulativeDistance: 11.73,
      },
      {
        Sequence: 14,
        StationID: "G14",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 12.99,
      },
      {
        Sequence: 15,
        StationID: "G15",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 14.29,
      },
      {
        Sequence: 16,
        StationID: "G16",
        StationName: {
          Zh_tw: "南京復興",
          En: "Nanjing Fuxing",
        },
        CumulativeDistance: 15.28,
      },
      {
        Sequence: 17,
        StationID: "G17",
        StationName: {
          Zh_tw: "台北小巨蛋",
          En: "Taipei Arena",
        },
        CumulativeDistance: 16.22,
      },
      {
        Sequence: 18,
        StationID: "G18",
        StationName: {
          Zh_tw: "南京三民",
          En: "Nanjing Sanmin",
        },
        CumulativeDistance: 17.42,
      },
      {
        Sequence: 19,
        StationID: "G19",
        StationName: {
          Zh_tw: "松山",
          En: "Songshan",
        },
        CumulativeDistance: 18.77,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "G",
    LineID: "G",
    RouteID: "G-1",
    RouteName: {
      Zh_tw: "松山－新店",
      En: "Songshan - Xindian",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "G19",
        StationName: {
          Zh_tw: "松山",
          En: "Songshan",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "G18",
        StationName: {
          Zh_tw: "南京三民",
          En: "Nanjing Sanmin",
        },
        CumulativeDistance: 1.35,
      },
      {
        Sequence: 3,
        StationID: "G17",
        StationName: {
          Zh_tw: "台北小巨蛋",
          En: "Taipei Arena",
        },
        CumulativeDistance: 2.55,
      },
      {
        Sequence: 4,
        StationID: "G16",
        StationName: {
          Zh_tw: "南京復興",
          En: "Nanjing Fuxing",
        },
        CumulativeDistance: 3.49,
      },
      {
        Sequence: 5,
        StationID: "G15",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 4.48,
      },
      {
        Sequence: 6,
        StationID: "G14",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 5.78,
      },
      {
        Sequence: 7,
        StationID: "G13",
        StationName: {
          Zh_tw: "北門",
          En: "Beimen",
        },
        CumulativeDistance: 7.04,
      },
      {
        Sequence: 8,
        StationID: "G12",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 7.85,
      },
      {
        Sequence: 9,
        StationID: "G11",
        StationName: {
          Zh_tw: "小南門",
          En: "Xiaonanmen",
        },
        CumulativeDistance: 8.67,
      },
      {
        Sequence: 10,
        StationID: "G10",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 9.43,
      },
      {
        Sequence: 11,
        StationID: "G09",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 10.36,
      },
      {
        Sequence: 12,
        StationID: "G08",
        StationName: {
          Zh_tw: "台電大樓",
          En: "Taipower Building",
        },
        CumulativeDistance: 11.24,
      },
      {
        Sequence: 13,
        StationID: "G07",
        StationName: {
          Zh_tw: "公館",
          En: "Gongguan",
        },
        CumulativeDistance: 12.14,
      },
      {
        Sequence: 14,
        StationID: "G06",
        StationName: {
          Zh_tw: "萬隆",
          En: "Wanlong",
        },
        CumulativeDistance: 13.7,
      },
      {
        Sequence: 15,
        StationID: "G05",
        StationName: {
          Zh_tw: "景美",
          En: "Jingmei",
        },
        CumulativeDistance: 14.76,
      },
      {
        Sequence: 16,
        StationID: "G04",
        StationName: {
          Zh_tw: "大坪林",
          En: "Dapinglin",
        },
        CumulativeDistance: 15.91,
      },
      {
        Sequence: 17,
        StationID: "G03",
        StationName: {
          Zh_tw: "七張",
          En: "Qizhang",
        },
        CumulativeDistance: 16.76,
      },
      {
        Sequence: 18,
        StationID: "G02",
        StationName: {
          Zh_tw: "新店區公所",
          En: "Xindian District Office",
        },
        CumulativeDistance: 17.66,
      },
      {
        Sequence: 19,
        StationID: "G01",
        StationName: {
          Zh_tw: "新店",
          En: "Xindian",
        },
        CumulativeDistance: 18.77,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "G",
    LineID: "G",
    RouteID: "G-2",
    RouteName: {
      Zh_tw: "台電大樓－松山",
      En: "Taipower Building - Songshan",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "G08",
        StationName: {
          Zh_tw: "台電大樓",
          En: "Taipower Building",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "G09",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 0.88,
      },
      {
        Sequence: 3,
        StationID: "G10",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 1.81,
      },
      {
        Sequence: 4,
        StationID: "G11",
        StationName: {
          Zh_tw: "小南門",
          En: "Xiaonanmen",
        },
        CumulativeDistance: 2.57,
      },
      {
        Sequence: 5,
        StationID: "G12",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 3.39,
      },
      {
        Sequence: 6,
        StationID: "G13",
        StationName: {
          Zh_tw: "北門",
          En: "Beimen",
        },
        CumulativeDistance: 4.2,
      },
      {
        Sequence: 7,
        StationID: "G14",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 5.46,
      },
      {
        Sequence: 8,
        StationID: "G15",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 6.76,
      },
      {
        Sequence: 9,
        StationID: "G16",
        StationName: {
          Zh_tw: "南京復興",
          En: "Nanjing Fuxing",
        },
        CumulativeDistance: 7.75,
      },
      {
        Sequence: 10,
        StationID: "G17",
        StationName: {
          Zh_tw: "台北小巨蛋",
          En: "Taipei Arena",
        },
        CumulativeDistance: 8.69,
      },
      {
        Sequence: 11,
        StationID: "G18",
        StationName: {
          Zh_tw: "南京三民",
          En: "Nanjing Sanmin",
        },
        CumulativeDistance: 9.89,
      },
      {
        Sequence: 12,
        StationID: "G19",
        StationName: {
          Zh_tw: "松山",
          En: "Songshan",
        },
        CumulativeDistance: 11.24,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "G",
    LineID: "G",
    RouteID: "G-2",
    RouteName: {
      Zh_tw: "松山－台電大樓",
      En: "Songshan - Taipower Building",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "G19",
        StationName: {
          Zh_tw: "松山",
          En: "Songshan",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "G18",
        StationName: {
          Zh_tw: "南京三民",
          En: "Nanjing Sanmin",
        },
        CumulativeDistance: 1.35,
      },
      {
        Sequence: 3,
        StationID: "G17",
        StationName: {
          Zh_tw: "台北小巨蛋",
          En: "Taipei Arena",
        },
        CumulativeDistance: 2.55,
      },
      {
        Sequence: 4,
        StationID: "G16",
        StationName: {
          Zh_tw: "南京復興",
          En: "Nanjing Fuxing",
        },
        CumulativeDistance: 3.49,
      },
      {
        Sequence: 5,
        StationID: "G15",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 4.48,
      },
      {
        Sequence: 6,
        StationID: "G14",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 5.78,
      },
      {
        Sequence: 7,
        StationID: "G13",
        StationName: {
          Zh_tw: "北門",
          En: "Beimen",
        },
        CumulativeDistance: 7.04,
      },
      {
        Sequence: 8,
        StationID: "G12",
        StationName: {
          Zh_tw: "西門",
          En: "Ximen",
        },
        CumulativeDistance: 7.85,
      },
      {
        Sequence: 9,
        StationID: "G11",
        StationName: {
          Zh_tw: "小南門",
          En: "Xiaonanmen",
        },
        CumulativeDistance: 8.67,
      },
      {
        Sequence: 10,
        StationID: "G10",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 9.43,
      },
      {
        Sequence: 11,
        StationID: "G09",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 10.36,
      },
      {
        Sequence: 12,
        StationID: "G08",
        StationName: {
          Zh_tw: "台電大樓",
          En: "Taipower Building",
        },
        CumulativeDistance: 11.24,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "G",
    LineID: "G",
    RouteID: "G-3",
    RouteName: {
      Zh_tw: "七張－小碧潭",
      En: "Qizhang - Xiaobitan",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "G03",
        StationName: {
          Zh_tw: "七張",
          En: "Qizhang",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "G03A",
        StationName: {
          Zh_tw: "小碧潭",
          En: "Xiaobitan",
        },
        CumulativeDistance: 1.94,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "G",
    LineID: "G",
    RouteID: "G-3",
    RouteName: {
      Zh_tw: "小碧潭－七張",
      En: "Xiaobitan - Qizhang",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "G03A",
        StationName: {
          Zh_tw: "小碧潭",
          En: "Xiaobitan",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "G03",
        StationName: {
          Zh_tw: "七張",
          En: "Qizhang",
        },
        CumulativeDistance: 1.94,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "O",
    LineID: "O",
    RouteID: "O-1",
    RouteName: {
      Zh_tw: "南勢角－迴龍",
      En: "Nanshijiao - Huilong",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "O01",
        StationName: {
          Zh_tw: "南勢角",
          En: "Nanshijiao",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "O02",
        StationName: {
          Zh_tw: "景安",
          En: "Jingan",
        },
        CumulativeDistance: 0.81,
      },
      {
        Sequence: 3,
        StationID: "O03",
        StationName: {
          Zh_tw: "永安市場",
          En: "Yongan Market",
        },
        CumulativeDistance: 1.89,
      },
      {
        Sequence: 4,
        StationID: "O04",
        StationName: {
          Zh_tw: "頂溪",
          En: "Dingxi",
        },
        CumulativeDistance: 3.22,
      },
      {
        Sequence: 5,
        StationID: "O05",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 5.36,
      },
      {
        Sequence: 6,
        StationID: "O06",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 6.94,
      },
      {
        Sequence: 7,
        StationID: "O07",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 8.14,
      },
      {
        Sequence: 8,
        StationID: "O08",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 9.28,
      },
      {
        Sequence: 9,
        StationID: "O09",
        StationName: {
          Zh_tw: "行天宮",
          En: "Xingtian Temple",
        },
        CumulativeDistance: 10.08,
      },
      {
        Sequence: 10,
        StationID: "O10",
        StationName: {
          Zh_tw: "中山國小",
          En: "Zhongshan Elementary School",
        },
        CumulativeDistance: 11.03,
      },
      {
        Sequence: 11,
        StationID: "O11",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 11.74,
      },
      {
        Sequence: 12,
        StationID: "O12",
        StationName: {
          Zh_tw: "大橋頭",
          En: "Daqiaotou",
        },
        CumulativeDistance: 12.4,
      },
      {
        Sequence: 13,
        StationID: "O13",
        StationName: {
          Zh_tw: "台北橋",
          En: "Taipei Bridge",
        },
        CumulativeDistance: 13.73,
      },
      {
        Sequence: 14,
        StationID: "O14",
        StationName: {
          Zh_tw: "菜寮",
          En: "Cailiao",
        },
        CumulativeDistance: 14.72,
      },
      {
        Sequence: 15,
        StationID: "O15",
        StationName: {
          Zh_tw: "三重",
          En: "Sanchong",
        },
        CumulativeDistance: 15.59,
      },
      {
        Sequence: 16,
        StationID: "O16",
        StationName: {
          Zh_tw: "先嗇宮",
          En: "Xianse Temple",
        },
        CumulativeDistance: 17.31,
      },
      {
        Sequence: 17,
        StationID: "O17",
        StationName: {
          Zh_tw: "頭前庄",
          En: "Touqianzhuang",
        },
        CumulativeDistance: 18.58,
      },
      {
        Sequence: 18,
        StationID: "O18",
        StationName: {
          Zh_tw: "新莊",
          En: "Xinzhuang",
        },
        CumulativeDistance: 19.6,
      },
      {
        Sequence: 19,
        StationID: "O19",
        StationName: {
          Zh_tw: "輔大",
          En: "Fu Jen University",
        },
        CumulativeDistance: 21.34,
      },
      {
        Sequence: 20,
        StationID: "O20",
        StationName: {
          Zh_tw: "丹鳳",
          En: "Danfeng",
        },
        CumulativeDistance: 22.71,
      },
      {
        Sequence: 21,
        StationID: "O21",
        StationName: {
          Zh_tw: "迴龍",
          En: "Huilong",
        },
        CumulativeDistance: 24.11,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "O",
    LineID: "O",
    RouteID: "O-1",
    RouteName: {
      Zh_tw: "迴龍－南勢角",
      En: "Huilong - Nanshijiao",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "O21",
        StationName: {
          Zh_tw: "迴龍",
          En: "Huilong",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "O20",
        StationName: {
          Zh_tw: "丹鳳",
          En: "Danfeng",
        },
        CumulativeDistance: 1.4,
      },
      {
        Sequence: 3,
        StationID: "O19",
        StationName: {
          Zh_tw: "輔大",
          En: "Fu Jen University",
        },
        CumulativeDistance: 2.77,
      },
      {
        Sequence: 4,
        StationID: "O18",
        StationName: {
          Zh_tw: "新莊",
          En: "Xinzhuang",
        },
        CumulativeDistance: 4.51,
      },
      {
        Sequence: 5,
        StationID: "O17",
        StationName: {
          Zh_tw: "頭前庄",
          En: "Touqianzhuang",
        },
        CumulativeDistance: 5.53,
      },
      {
        Sequence: 6,
        StationID: "O16",
        StationName: {
          Zh_tw: "先嗇宮",
          En: "Xianse Temple",
        },
        CumulativeDistance: 6.8,
      },
      {
        Sequence: 7,
        StationID: "O15",
        StationName: {
          Zh_tw: "三重",
          En: "Sanchong",
        },
        CumulativeDistance: 8.52,
      },
      {
        Sequence: 8,
        StationID: "O14",
        StationName: {
          Zh_tw: "菜寮",
          En: "Cailiao",
        },
        CumulativeDistance: 9.39,
      },
      {
        Sequence: 9,
        StationID: "O13",
        StationName: {
          Zh_tw: "台北橋",
          En: "Taipei Bridge",
        },
        CumulativeDistance: 10.38,
      },
      {
        Sequence: 10,
        StationID: "O12",
        StationName: {
          Zh_tw: "大橋頭",
          En: "Daqiaotou",
        },
        CumulativeDistance: 11.71,
      },
      {
        Sequence: 11,
        StationID: "O11",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 12.37,
      },
      {
        Sequence: 12,
        StationID: "O10",
        StationName: {
          Zh_tw: "中山國小",
          En: "Zhongshan Elementary School",
        },
        CumulativeDistance: 13.08,
      },
      {
        Sequence: 13,
        StationID: "O09",
        StationName: {
          Zh_tw: "行天宮",
          En: "Xingtian Temple",
        },
        CumulativeDistance: 14.03,
      },
      {
        Sequence: 14,
        StationID: "O08",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 14.83,
      },
      {
        Sequence: 15,
        StationID: "O07",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 15.97,
      },
      {
        Sequence: 16,
        StationID: "O06",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 17.17,
      },
      {
        Sequence: 17,
        StationID: "O05",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 18.75,
      },
      {
        Sequence: 18,
        StationID: "O04",
        StationName: {
          Zh_tw: "頂溪",
          En: "Dingxi",
        },
        CumulativeDistance: 20.89,
      },
      {
        Sequence: 19,
        StationID: "O03",
        StationName: {
          Zh_tw: "永安市場",
          En: "Yongan Market",
        },
        CumulativeDistance: 22.22,
      },
      {
        Sequence: 20,
        StationID: "O02",
        StationName: {
          Zh_tw: "景安",
          En: "Jingan",
        },
        CumulativeDistance: 23.3,
      },
      {
        Sequence: 21,
        StationID: "O01",
        StationName: {
          Zh_tw: "南勢角",
          En: "Nanshijiao",
        },
        CumulativeDistance: 24.11,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "O",
    LineID: "O",
    RouteID: "O-2",
    RouteName: {
      Zh_tw: "南勢角－蘆洲",
      En: "Nanshijiao - Luzhou",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "O01",
        StationName: {
          Zh_tw: "南勢角",
          En: "Nanshijiao",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "O02",
        StationName: {
          Zh_tw: "景安",
          En: "Jingan",
        },
        CumulativeDistance: 0.81,
      },
      {
        Sequence: 3,
        StationID: "O03",
        StationName: {
          Zh_tw: "永安市場",
          En: "Yongan Market",
        },
        CumulativeDistance: 1.89,
      },
      {
        Sequence: 4,
        StationID: "O04",
        StationName: {
          Zh_tw: "頂溪",
          En: "Dingxi",
        },
        CumulativeDistance: 3.22,
      },
      {
        Sequence: 5,
        StationID: "O05",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 5.36,
      },
      {
        Sequence: 6,
        StationID: "O06",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 6.94,
      },
      {
        Sequence: 7,
        StationID: "O07",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 8.14,
      },
      {
        Sequence: 8,
        StationID: "O08",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 9.28,
      },
      {
        Sequence: 9,
        StationID: "O09",
        StationName: {
          Zh_tw: "行天宮",
          En: "Xingtian Temple",
        },
        CumulativeDistance: 10.08,
      },
      {
        Sequence: 10,
        StationID: "O10",
        StationName: {
          Zh_tw: "中山國小",
          En: "Zhongshan Elementary School",
        },
        CumulativeDistance: 11.03,
      },
      {
        Sequence: 11,
        StationID: "O11",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 11.74,
      },
      {
        Sequence: 12,
        StationID: "O12",
        StationName: {
          Zh_tw: "大橋頭",
          En: "Daqiaotou",
        },
        CumulativeDistance: 12.4,
      },
      {
        Sequence: 13,
        StationID: "O50",
        StationName: {
          Zh_tw: "三重國小",
          En: "Sanchong Elementary School",
        },
        CumulativeDistance: 14.28,
      },
      {
        Sequence: 14,
        StationID: "O51",
        StationName: {
          Zh_tw: "三和國中",
          En: "Sanhe Junior High School",
        },
        CumulativeDistance: 15.51,
      },
      {
        Sequence: 15,
        StationID: "O52",
        StationName: {
          Zh_tw: "徐匯中學",
          En: "St.lgnatius High School",
        },
        CumulativeDistance: 16.34,
      },
      {
        Sequence: 16,
        StationID: "O53",
        StationName: {
          Zh_tw: "三民高中",
          En: "Sanmin Senior High School",
        },
        CumulativeDistance: 17.24,
      },
      {
        Sequence: 17,
        StationID: "O54",
        StationName: {
          Zh_tw: "蘆洲",
          En: "Luzhou",
        },
        CumulativeDistance: 18.41,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "O",
    LineID: "O",
    RouteID: "O-2",
    RouteName: {
      Zh_tw: "蘆洲－南勢角",
      En: "Luzhou - Nanshijiao",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "O54",
        StationName: {
          Zh_tw: "蘆洲",
          En: "Luzhou",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "O53",
        StationName: {
          Zh_tw: "三民高中",
          En: "Sanmin Senior High School",
        },
        CumulativeDistance: 1.17,
      },
      {
        Sequence: 3,
        StationID: "O52",
        StationName: {
          Zh_tw: "徐匯中學",
          En: "St.lgnatius High School",
        },
        CumulativeDistance: 2.07,
      },
      {
        Sequence: 4,
        StationID: "O51",
        StationName: {
          Zh_tw: "三和國中",
          En: "Sanhe Junior High School",
        },
        CumulativeDistance: 2.9,
      },
      {
        Sequence: 5,
        StationID: "O50",
        StationName: {
          Zh_tw: "三重國小",
          En: "Sanchong Elementary School",
        },
        CumulativeDistance: 4.13,
      },
      {
        Sequence: 6,
        StationID: "O12",
        StationName: {
          Zh_tw: "大橋頭",
          En: "Daqiaotou",
        },
        CumulativeDistance: 6.01,
      },
      {
        Sequence: 7,
        StationID: "O11",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 6.67,
      },
      {
        Sequence: 8,
        StationID: "O10",
        StationName: {
          Zh_tw: "中山國小",
          En: "Zhongshan Elementary School",
        },
        CumulativeDistance: 7.38,
      },
      {
        Sequence: 9,
        StationID: "O09",
        StationName: {
          Zh_tw: "行天宮",
          En: "Xingtian Temple",
        },
        CumulativeDistance: 8.33,
      },
      {
        Sequence: 10,
        StationID: "O08",
        StationName: {
          Zh_tw: "松江南京",
          En: "Songjiang Nanjing",
        },
        CumulativeDistance: 9.13,
      },
      {
        Sequence: 11,
        StationID: "O07",
        StationName: {
          Zh_tw: "忠孝新生",
          En: "Zhongxiao Xinsheng",
        },
        CumulativeDistance: 10.27,
      },
      {
        Sequence: 12,
        StationID: "O06",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 11.47,
      },
      {
        Sequence: 13,
        StationID: "O05",
        StationName: {
          Zh_tw: "古亭",
          En: "Guting",
        },
        CumulativeDistance: 13.05,
      },
      {
        Sequence: 14,
        StationID: "O04",
        StationName: {
          Zh_tw: "頂溪",
          En: "Dingxi",
        },
        CumulativeDistance: 15.19,
      },
      {
        Sequence: 15,
        StationID: "O03",
        StationName: {
          Zh_tw: "永安市場",
          En: "Yongan Market",
        },
        CumulativeDistance: 16.52,
      },
      {
        Sequence: 16,
        StationID: "O02",
        StationName: {
          Zh_tw: "景安",
          En: "Jingan",
        },
        CumulativeDistance: 17.6,
      },
      {
        Sequence: 17,
        StationID: "O01",
        StationName: {
          Zh_tw: "南勢角",
          En: "Nanshijiao",
        },
        CumulativeDistance: 18.41,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "R",
    LineID: "R",
    RouteID: "R-1",
    RouteName: {
      Zh_tw: "象山－淡水",
      En: "Xiangs - Tamsui",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "R02",
        StationName: {
          Zh_tw: "象山",
          En: "Xiangshan",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "R03",
        StationName: {
          Zh_tw: "台北101/世貿",
          En: "Taipei 101/World Trade Center",
        },
        CumulativeDistance: 0.74,
      },
      {
        Sequence: 3,
        StationID: "R04",
        StationName: {
          Zh_tw: "信義安和",
          En: "Xinyi Anhe",
        },
        CumulativeDistance: 1.73,
      },
      {
        Sequence: 4,
        StationID: "R05",
        StationName: {
          Zh_tw: "大安",
          En: "Daan",
        },
        CumulativeDistance: 2.72,
      },
      {
        Sequence: 5,
        StationID: "R06",
        StationName: {
          Zh_tw: "大安森林公園",
          En: "Daan Park",
        },
        CumulativeDistance: 3.51,
      },
      {
        Sequence: 6,
        StationID: "R07",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 4.18,
      },
      {
        Sequence: 7,
        StationID: "R08",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 5.74,
      },
      {
        Sequence: 8,
        StationID: "R09",
        StationName: {
          Zh_tw: "台大醫院",
          En: "NTU Hospital",
        },
        CumulativeDistance: 6.73,
      },
      {
        Sequence: 9,
        StationID: "R10",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 7.36,
      },
      {
        Sequence: 10,
        StationID: "R11",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 8.02,
      },
      {
        Sequence: 11,
        StationID: "R12",
        StationName: {
          Zh_tw: "雙連",
          En: "Shuanglian",
        },
        CumulativeDistance: 8.57,
      },
      {
        Sequence: 12,
        StationID: "R13",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 9.1,
      },
      {
        Sequence: 13,
        StationID: "R14",
        StationName: {
          Zh_tw: "圓山",
          En: "Yuanshan",
        },
        CumulativeDistance: 10.13,
      },
      {
        Sequence: 14,
        StationID: "R15",
        StationName: {
          Zh_tw: "劍潭",
          En: "Jiantan",
        },
        CumulativeDistance: 11.65,
      },
      {
        Sequence: 15,
        StationID: "R16",
        StationName: {
          Zh_tw: "士林",
          En: "Shilin",
        },
        CumulativeDistance: 12.74,
      },
      {
        Sequence: 16,
        StationID: "R17",
        StationName: {
          Zh_tw: "芝山",
          En: "Zhishan",
        },
        CumulativeDistance: 13.84,
      },
      {
        Sequence: 17,
        StationID: "R18",
        StationName: {
          Zh_tw: "明德",
          En: "Mingde",
        },
        CumulativeDistance: 14.72,
      },
      {
        Sequence: 18,
        StationID: "R19",
        StationName: {
          Zh_tw: "石牌",
          En: "Shipai",
        },
        CumulativeDistance: 15.32,
      },
      {
        Sequence: 19,
        StationID: "R20",
        StationName: {
          Zh_tw: "唭哩岸",
          En: "Qilian",
        },
        CumulativeDistance: 16.58,
      },
      {
        Sequence: 20,
        StationID: "R21",
        StationName: {
          Zh_tw: "奇岩",
          En: "Qiyan",
        },
        CumulativeDistance: 17.41,
      },
      {
        Sequence: 21,
        StationID: "R22",
        StationName: {
          Zh_tw: "北投",
          En: "Beitou",
        },
        CumulativeDistance: 18.17,
      },
      {
        Sequence: 22,
        StationID: "R23",
        StationName: {
          Zh_tw: "復興崗",
          En: "Fuxinggang",
        },
        CumulativeDistance: 19.78,
      },
      {
        Sequence: 23,
        StationID: "R24",
        StationName: {
          Zh_tw: "忠義",
          En: "Zhongyi",
        },
        CumulativeDistance: 21.23,
      },
      {
        Sequence: 24,
        StationID: "R25",
        StationName: {
          Zh_tw: "關渡",
          En: "Guandu",
        },
        CumulativeDistance: 22.1,
      },
      {
        Sequence: 25,
        StationID: "R26",
        StationName: {
          Zh_tw: "竹圍",
          En: "Zhuwei",
        },
        CumulativeDistance: 24.24,
      },
      {
        Sequence: 26,
        StationID: "R27",
        StationName: {
          Zh_tw: "紅樹林",
          En: "Hongshulin",
        },
        CumulativeDistance: 26.15,
      },
      {
        Sequence: 27,
        StationID: "R28",
        StationName: {
          Zh_tw: "淡水",
          En: "Tamsui",
        },
        CumulativeDistance: 28.24,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "R",
    LineID: "R",
    RouteID: "R-1",
    RouteName: {
      Zh_tw: "淡水－象山",
      En: "Tamsui - Xiangs",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "R28",
        StationName: {
          Zh_tw: "淡水",
          En: "Tamsui",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "R27",
        StationName: {
          Zh_tw: "紅樹林",
          En: "Hongshulin",
        },
        CumulativeDistance: 2.09,
      },
      {
        Sequence: 3,
        StationID: "R26",
        StationName: {
          Zh_tw: "竹圍",
          En: "Zhuwei",
        },
        CumulativeDistance: 4,
      },
      {
        Sequence: 4,
        StationID: "R25",
        StationName: {
          Zh_tw: "關渡",
          En: "Guandu",
        },
        CumulativeDistance: 6.14,
      },
      {
        Sequence: 5,
        StationID: "R24",
        StationName: {
          Zh_tw: "忠義",
          En: "Zhongyi",
        },
        CumulativeDistance: 7.01,
      },
      {
        Sequence: 6,
        StationID: "R23",
        StationName: {
          Zh_tw: "復興崗",
          En: "Fuxinggang",
        },
        CumulativeDistance: 8.46,
      },
      {
        Sequence: 7,
        StationID: "R22",
        StationName: {
          Zh_tw: "北投",
          En: "Beitou",
        },
        CumulativeDistance: 10.07,
      },
      {
        Sequence: 8,
        StationID: "R21",
        StationName: {
          Zh_tw: "奇岩",
          En: "Qiyan",
        },
        CumulativeDistance: 10.83,
      },
      {
        Sequence: 9,
        StationID: "R20",
        StationName: {
          Zh_tw: "唭哩岸",
          En: "Qilian",
        },
        CumulativeDistance: 11.66,
      },
      {
        Sequence: 10,
        StationID: "R19",
        StationName: {
          Zh_tw: "石牌",
          En: "Shipai",
        },
        CumulativeDistance: 12.92,
      },
      {
        Sequence: 11,
        StationID: "R18",
        StationName: {
          Zh_tw: "明德",
          En: "Mingde",
        },
        CumulativeDistance: 13.52,
      },
      {
        Sequence: 12,
        StationID: "R17",
        StationName: {
          Zh_tw: "芝山",
          En: "Zhishan",
        },
        CumulativeDistance: 14.4,
      },
      {
        Sequence: 13,
        StationID: "R16",
        StationName: {
          Zh_tw: "士林",
          En: "Shilin",
        },
        CumulativeDistance: 15.5,
      },
      {
        Sequence: 14,
        StationID: "R15",
        StationName: {
          Zh_tw: "劍潭",
          En: "Jiantan",
        },
        CumulativeDistance: 16.59,
      },
      {
        Sequence: 15,
        StationID: "R14",
        StationName: {
          Zh_tw: "圓山",
          En: "Yuanshan",
        },
        CumulativeDistance: 18.11,
      },
      {
        Sequence: 16,
        StationID: "R13",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 19.14,
      },
      {
        Sequence: 17,
        StationID: "R12",
        StationName: {
          Zh_tw: "雙連",
          En: "Shuanglian",
        },
        CumulativeDistance: 19.67,
      },
      {
        Sequence: 18,
        StationID: "R11",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 20.22,
      },
      {
        Sequence: 19,
        StationID: "R10",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 20.88,
      },
      {
        Sequence: 20,
        StationID: "R09",
        StationName: {
          Zh_tw: "台大醫院",
          En: "NTU Hospital",
        },
        CumulativeDistance: 21.51,
      },
      {
        Sequence: 21,
        StationID: "R08",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 22.5,
      },
      {
        Sequence: 22,
        StationID: "R07",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 24.06,
      },
      {
        Sequence: 23,
        StationID: "R06",
        StationName: {
          Zh_tw: "大安森林公園",
          En: "Daan Park",
        },
        CumulativeDistance: 24.73,
      },
      {
        Sequence: 24,
        StationID: "R05",
        StationName: {
          Zh_tw: "大安",
          En: "Daan",
        },
        CumulativeDistance: 25.52,
      },
      {
        Sequence: 25,
        StationID: "R04",
        StationName: {
          Zh_tw: "信義安和",
          En: "Xinyi Anhe",
        },
        CumulativeDistance: 26.51,
      },
      {
        Sequence: 26,
        StationID: "R03",
        StationName: {
          Zh_tw: "台北101/世貿",
          En: "Taipei 101/World Trade Center",
        },
        CumulativeDistance: 27.5,
      },
      {
        Sequence: 27,
        StationID: "R02",
        StationName: {
          Zh_tw: "象山",
          En: "Xiangshan",
        },
        CumulativeDistance: 28.24,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "R",
    LineID: "R",
    RouteID: "R-2",
    RouteName: {
      Zh_tw: "大安－北投",
      En: "Daan - Beitou",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "R05",
        StationName: {
          Zh_tw: "大安",
          En: "Daan",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "R06",
        StationName: {
          Zh_tw: "大安森林公園",
          En: "Daan Park",
        },
        CumulativeDistance: 0.79,
      },
      {
        Sequence: 3,
        StationID: "R07",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 1.46,
      },
      {
        Sequence: 4,
        StationID: "R08",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 3.02,
      },
      {
        Sequence: 5,
        StationID: "R09",
        StationName: {
          Zh_tw: "台大醫院",
          En: "NTU Hospital",
        },
        CumulativeDistance: 4.01,
      },
      {
        Sequence: 6,
        StationID: "R10",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 4.64,
      },
      {
        Sequence: 7,
        StationID: "R11",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 5.3,
      },
      {
        Sequence: 8,
        StationID: "R12",
        StationName: {
          Zh_tw: "雙連",
          En: "Shuanglian",
        },
        CumulativeDistance: 5.85,
      },
      {
        Sequence: 9,
        StationID: "R13",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 6.38,
      },
      {
        Sequence: 10,
        StationID: "R14",
        StationName: {
          Zh_tw: "圓山",
          En: "Yuanshan",
        },
        CumulativeDistance: 7.41,
      },
      {
        Sequence: 11,
        StationID: "R15",
        StationName: {
          Zh_tw: "劍潭",
          En: "Jiantan",
        },
        CumulativeDistance: 8.93,
      },
      {
        Sequence: 12,
        StationID: "R16",
        StationName: {
          Zh_tw: "士林",
          En: "Shilin",
        },
        CumulativeDistance: 10.02,
      },
      {
        Sequence: 13,
        StationID: "R17",
        StationName: {
          Zh_tw: "芝山",
          En: "Zhishan",
        },
        CumulativeDistance: 11.12,
      },
      {
        Sequence: 14,
        StationID: "R18",
        StationName: {
          Zh_tw: "明德",
          En: "Mingde",
        },
        CumulativeDistance: 12,
      },
      {
        Sequence: 15,
        StationID: "R19",
        StationName: {
          Zh_tw: "石牌",
          En: "Shipai",
        },
        CumulativeDistance: 12.6,
      },
      {
        Sequence: 16,
        StationID: "R20",
        StationName: {
          Zh_tw: "唭哩岸",
          En: "Qilian",
        },
        CumulativeDistance: 13.86,
      },
      {
        Sequence: 17,
        StationID: "R21",
        StationName: {
          Zh_tw: "奇岩",
          En: "Qiyan",
        },
        CumulativeDistance: 14.69,
      },
      {
        Sequence: 18,
        StationID: "R22",
        StationName: {
          Zh_tw: "北投",
          En: "Beitou",
        },
        CumulativeDistance: 15.45,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "R",
    LineID: "R",
    RouteID: "R-2",
    RouteName: {
      Zh_tw: "北投－大安",
      En: "Beitou - Daan",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "R22",
        StationName: {
          Zh_tw: "北投",
          En: "Beitou",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "R21",
        StationName: {
          Zh_tw: "奇岩",
          En: "Qiyan",
        },
        CumulativeDistance: 0.76,
      },
      {
        Sequence: 3,
        StationID: "R20",
        StationName: {
          Zh_tw: "唭哩岸",
          En: "Qilian",
        },
        CumulativeDistance: 1.59,
      },
      {
        Sequence: 4,
        StationID: "R19",
        StationName: {
          Zh_tw: "石牌",
          En: "Shipai",
        },
        CumulativeDistance: 2.85,
      },
      {
        Sequence: 5,
        StationID: "R18",
        StationName: {
          Zh_tw: "明德",
          En: "Mingde",
        },
        CumulativeDistance: 3.45,
      },
      {
        Sequence: 6,
        StationID: "R17",
        StationName: {
          Zh_tw: "芝山",
          En: "Zhishan",
        },
        CumulativeDistance: 4.33,
      },
      {
        Sequence: 7,
        StationID: "R16",
        StationName: {
          Zh_tw: "士林",
          En: "Shilin",
        },
        CumulativeDistance: 5.43,
      },
      {
        Sequence: 8,
        StationID: "R15",
        StationName: {
          Zh_tw: "劍潭",
          En: "Jiantan",
        },
        CumulativeDistance: 6.52,
      },
      {
        Sequence: 9,
        StationID: "R14",
        StationName: {
          Zh_tw: "圓山",
          En: "Yuanshan",
        },
        CumulativeDistance: 8.04,
      },
      {
        Sequence: 10,
        StationID: "R13",
        StationName: {
          Zh_tw: "民權西路",
          En: "Minquan W. Rd.",
        },
        CumulativeDistance: 9.07,
      },
      {
        Sequence: 11,
        StationID: "R12",
        StationName: {
          Zh_tw: "雙連",
          En: "Shuanglian",
        },
        CumulativeDistance: 9.6,
      },
      {
        Sequence: 12,
        StationID: "R11",
        StationName: {
          Zh_tw: "中山",
          En: "Zhongshan",
        },
        CumulativeDistance: 10.15,
      },
      {
        Sequence: 13,
        StationID: "R10",
        StationName: {
          Zh_tw: "台北車站",
          En: "Taipei Main Station",
        },
        CumulativeDistance: 10.81,
      },
      {
        Sequence: 14,
        StationID: "R09",
        StationName: {
          Zh_tw: "台大醫院",
          En: "NTU Hospital",
        },
        CumulativeDistance: 11.44,
      },
      {
        Sequence: 15,
        StationID: "R08",
        StationName: {
          Zh_tw: "中正紀念堂",
          En: "Chiang Kai-Shek Memorial Hall",
        },
        CumulativeDistance: 12.43,
      },
      {
        Sequence: 16,
        StationID: "R07",
        StationName: {
          Zh_tw: "東門",
          En: "Dongmen",
        },
        CumulativeDistance: 13.99,
      },
      {
        Sequence: 17,
        StationID: "R06",
        StationName: {
          Zh_tw: "大安森林公園",
          En: "Daan Park",
        },
        CumulativeDistance: 14.66,
      },
      {
        Sequence: 18,
        StationID: "R05",
        StationName: {
          Zh_tw: "大安",
          En: "Daan",
        },
        CumulativeDistance: 15.45,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "R",
    LineID: "R",
    RouteID: "R-3",
    RouteName: {
      Zh_tw: "北投－新北投",
      En: "Beitou - Xinbeitou",
    },
    Direction: 0,
    Stations: [
      {
        Sequence: 1,
        StationID: "R22",
        StationName: {
          Zh_tw: "北投",
          En: "Beitou",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "R22A",
        StationName: {
          Zh_tw: "新北投",
          En: "Xinbeitou",
        },
        CumulativeDistance: 1.03,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
  {
    LineNo: "R",
    LineID: "R",
    RouteID: "R-3",
    RouteName: {
      Zh_tw: "新北投－北投",
      En: "Xinbeitou - Beitou",
    },
    Direction: 1,
    Stations: [
      {
        Sequence: 1,
        StationID: "R22A",
        StationName: {
          Zh_tw: "新北投",
          En: "Xinbeitou",
        },
        CumulativeDistance: 0,
      },
      {
        Sequence: 2,
        StationID: "R22",
        StationName: {
          Zh_tw: "北投",
          En: "Beitou",
        },
        CumulativeDistance: 1.03,
      },
    ],
    SrcUpdateTime: "2020-01-31T14:00:00+08:00",
    UpdateTime: "2020-05-20T12:00:00+08:00",
    VersionID: 2,
  },
];
</script>

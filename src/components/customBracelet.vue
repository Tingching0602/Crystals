<template>
  <div class="custom-bracelet-container">
    <!-- 頁首 -->
    <div class="header-section">
      <span class="logo-text">微光水晶</span>
      <div class="nav-menu">
        <el-button text @click="goBack">返回</el-button>
      </div>
    </div>

    <!-- 主標題 -->
    <div class="page-title">
      <h1>客製化手串設計</h1>
      <p class="subtitle">選擇您的設計方式，為您打造專屬手串</p>
    </div>

    <!-- 選項卡 -->
    <el-tabs v-model="activeTab" class="custom-tabs" @tab-change="handleTabChange">
      <!-- 生命靈數 -->
      <el-tab-pane label="生命靈數" name="lifePath">
        <div class="tab-content">
          <h2>生命靈數客製</h2>
          <p class="description">透過您的出生日期，找出適合您的水晶能量</p>
          
          <el-form :model="lifePathForm" label-width="120px" class="custom-form">
            <el-form-item label="西元生日">
              <el-date-picker
                v-model="lifePathForm.birthday"
                type="date"
                placeholder="請選擇您的生日"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                :disabled-date="disabledDate"
                class="date-picker-full"
              />
            </el-form-item>
            
            <el-form-item label="性別">
              <el-radio-group v-model="lifePathForm.gender">
                <el-radio label="male">男性</el-radio>
                <el-radio label="female">女性</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="calculateLifePath">計算生命靈數</el-button>
            </el-form-item>
          </el-form>

          <!-- 生命靈數結果 -->
          <div v-if="lifePathResult.number" class="result-section">
            <el-divider content-position="left">您的生命靈數分析</el-divider>
            <div class="result-card">
              <h3>生命靈數: {{ lifePathResult.number }}</h3>
              <p class="result-description">{{ lifePathResult.description }}</p>
              
              <div class="recommendation">
                <h4>建議水晶顏色</h4>
                <div class="color-chips">
                  <span 
                    v-for="color in lifePathResult.colors" 
                    :key="color"
                    class="color-chip"
                    :style="{ backgroundColor: getColorCode(color) }"
                  >
                    {{ color }}
                  </span>
                </div>
              </div>

              <div class="recommendation">
                <h4>建議水晶品項</h4>
                <ul class="crystal-list">
                  <li v-for="crystal in lifePathResult.crystals" :key="crystal">{{ crystal }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 配件選擇 -->
          <div v-if="lifePathResult.number" class="accessories-section">
            <el-divider content-position="left">選擇配件</el-divider>
            <AccessoriesSelector v-model="lifePathAccessories" />
          </div>
        </div>
      </el-tab-pane>

      <!-- 星座設計 -->
      <el-tab-pane label="星座設計" name="zodiac">
        <div class="tab-content">
          <h2>星座設計客製</h2>
          <p class="description">根據您的星座，推薦專屬的水晶能量</p>
          
          <el-form :model="zodiacForm" label-width="120px" class="custom-form">
            <el-form-item label="選擇星座">
              <el-select v-model="zodiacForm.sign" placeholder="請選擇您的星座" style="width: 100%">
                <el-option label="牡羊座 (3/21-4/19)" value="aries" />
                <el-option label="金牛座 (4/20-5/20)" value="taurus" />
                <el-option label="雙子座 (5/21-6/21)" value="gemini" />
                <el-option label="巨蟹座 (6/22-7/22)" value="cancer" />
                <el-option label="獅子座 (7/23-8/22)" value="leo" />
                <el-option label="處女座 (8/23-9/22)" value="virgo" />
                <el-option label="天秤座 (9/23-10/23)" value="libra" />
                <el-option label="天蠍座 (10/24-11/22)" value="scorpio" />
                <el-option label="射手座 (11/23-12/21)" value="sagittarius" />
                <el-option label="摩羯座 (12/22-1/19)" value="capricorn" />
                <el-option label="水瓶座 (1/20-2/18)" value="aquarius" />
                <el-option label="雙魚座 (2/19-3/20)" value="pisces" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getZodiacRecommendation">查看推薦</el-button>
            </el-form-item>
          </el-form>

          <!-- 星座結果 -->
          <div v-if="zodiacResult.sign" class="result-section">
            <el-divider content-position="left">您的星座推薦</el-divider>
            <div class="result-card">
              <h3>{{ zodiacResult.signName }}</h3>
              <p class="result-description">{{ zodiacResult.description }}</p>
              
              <div class="recommendation">
                <h4>幸運顏色</h4>
                <div class="color-chips">
                  <span 
                    v-for="color in zodiacResult.colors" 
                    :key="color"
                    class="color-chip"
                    :style="{ backgroundColor: getColorCode(color) }"
                  >
                    {{ color }}
                  </span>
                </div>
              </div>

              <div class="recommendation">
                <h4>適合水晶品項</h4>
                <ul class="crystal-list">
                  <li v-for="crystal in zodiacResult.crystals" :key="crystal">{{ crystal }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 配件選擇 -->
          <div v-if="zodiacResult.sign" class="accessories-section">
            <el-divider content-position="left">選擇配件</el-divider>
            <AccessoriesSelector v-model="zodiacAccessories" />
          </div>
        </div>
      </el-tab-pane>

      <!-- 色系選擇 -->
      <el-tab-pane label="色系選擇" name="color">
        <div class="tab-content">
          <h2>色系選擇客製</h2>
          <p class="description">選擇您喜愛的顏色，推薦相應的水晶</p>
          
          <el-form :model="colorForm" label-width="120px" class="custom-form">
            <el-form-item label="選擇顏色">
              <el-select v-model="colorForm.selectedColor" placeholder="請選擇您想要的顏色" style="width: 100%">
                <el-option label="白色系" value="white" />
                <el-option label="粉色系" value="pink" />
                <el-option label="紫色系" value="purple" />
                <el-option label="藍色系" value="blue" />
                <el-option label="綠色系" value="green" />
                <el-option label="黃色系" value="yellow" />
                <el-option label="橙色系" value="orange" />
                <el-option label="紅色系" value="red" />
                <el-option label="黑色系" value="black" />
                <el-option label="棕色系" value="brown" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getColorRecommendation">查看推薦</el-button>
            </el-form-item>
          </el-form>

          <!-- 顏色結果 -->
          <div v-if="colorResult.color" class="result-section">
            <el-divider content-position="left">色系推薦</el-divider>
            <div class="result-card">
              <h3>{{ colorResult.colorName }}</h3>
              <p class="result-description">{{ colorResult.description }}</p>
              
              <div class="recommendation">
                <h4>適合的水晶品項</h4>
                <ul class="crystal-list">
                  <li v-for="crystal in colorResult.crystals" :key="crystal">{{ crystal }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 配件選擇 -->
          <div v-if="colorResult.color" class="accessories-section">
            <el-divider content-position="left">選擇配件</el-divider>
            <AccessoriesSelector v-model="colorAccessories" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 提交按鈕 -->
    <div v-if="showSubmitButton" class="submit-section">
      <el-button type="success" size="large" @click="submitCustomization">
        提交客製化需求
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import AccessoriesSelector from './AccessoriesSelector.vue';

const router = useRouter();
const activeTab = ref('lifePath');

// 生命靈數表單
const lifePathForm = reactive({
  birthday: '',
  gender: 'female'
});

// 生命靈數結果
const lifePathResult = reactive({
  number: 0,
  description: '',
  colors: [] as string[],
  crystals: [] as string[]
});

// 星座表單
const zodiacForm = reactive({
  sign: ''
});

// 星座結果
const zodiacResult = reactive({
  sign: '',
  signName: '',
  description: '',
  colors: [] as string[],
  crystals: [] as string[]
});

// 色系表單
const colorForm = reactive({
  selectedColor: ''
});

// 色系結果
const colorResult = reactive({
  color: '',
  colorName: '',
  description: '',
  crystals: [] as string[]
});

// 配件選擇
const lifePathAccessories = ref({});
const zodiacAccessories = ref({});
const colorAccessories = ref({});

// 是否顯示提交按鈕
const showSubmitButton = computed(() => {
  return lifePathResult.number > 0 || zodiacResult.sign || colorResult.color;
});

// 返回上一頁
const goBack = () => {
  router.back();
};

// 處理標籤切換
const handleTabChange = (_tabName: string) => {
  // 切換時可以清空其他表單的結果
};

// 禁用未來的日期
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};

// 計算生命靈數
const calculateLifePath = () => {
  if (!lifePathForm.birthday) {
    ElMessage.warning('請選擇您的生日');
    return;
  }

  // 計算生命靈數 - 先天數算法
  // 將生日的每個數字相加（例如：2024/2/20 -> 2+0+2+4+0+2+2+0=12）
  const dateStr = lifePathForm.birthday.replace(/-/g, ''); // 移除分隔符號
  let sum = 0;
  
  // 將每個數字相加
  for (let char of dateStr) {
    sum += parseInt(char);
  }
  
  // 持續相加直到得到個位數字（例如：12 -> 1+2=3）
  while (sum > 9) {
    let newSum = 0;
    const sumStr = sum.toString();
    for (let char of sumStr) {
      newSum += parseInt(char);
    }
    sum = newSum;
  }

  // 根據生命靈數給出建議
  const lifePathData = getLifePathData(sum, lifePathForm.gender);
  
  lifePathResult.number = sum;
  lifePathResult.description = lifePathData.description;
  lifePathResult.colors = lifePathData.colors;
  lifePathResult.crystals = lifePathData.crystals;

  ElMessage.success('生命靈數計算完成！');
};

// 獲取生命靈數資料
const getLifePathData = (number: number, _gender: string) => {
  const dataMap: any = {
    1: {
      description: '數字1代表領導、獨立與創新。您需要能增強自信與行動力的水晶。',
      colors: ['紅色', '橙色', '金色'],
      crystals: ['紅瑪瑙', '紅碧玉', '太陽石', '黃水晶', '虎眼石']
    },
    2: {
      description: '數字2代表平衡、合作與感性。您需要能增強直覺與人際關係的水晶。',
      colors: ['粉色', '橙色', '白色'],
      crystals: ['粉晶', '月光石', '珍珠', '草莓晶', '橙色方解石']
    },
    3: {
      description: '數字3代表創意、表達與樂觀。您需要能激發創造力與溝通能力的水晶。',
      colors: ['黃色', '橙色', '紫色'],
      crystals: ['黃水晶', '琥珀', '紫水晶', '黃色方解石', '金髮晶']
    },
    4: {
      description: '數字4代表穩定、務實與建設。您需要能增強穩定性與實踐力的水晶。',
      colors: ['綠色', '棕色', '灰色'],
      crystals: ['綠東陵', '茶晶', '黑曜石', '綠幽靈', '虎眼石']
    },
    5: {
      description: '數字5代表自由、變化與冒險。您需要能增強適應力與活力的水晶。',
      colors: ['藍色', '綠色', '銀色'],
      crystals: ['海藍寶', '綠松石', '藍晶石', '天河石', '拉長石']
    },
    6: {
      description: '數字6代表愛、責任與和諧。您需要能增強愛與療癒能量的水晶。',
      colors: ['粉色', '綠色', '藍色'],
      crystals: ['粉晶', '綠幽靈', '薔薇輝石', '東菱玉', '海藍寶']
    },
    7: {
      description: '數字7代表智慧、靈性與直覺。您需要能開發靈性與智慧的水晶。',
      colors: ['紫色', '白色', '藍色'],
      crystals: ['紫水晶', '白水晶', '青金石', '螢石', '透石膏']
    },
    8: {
      description: '數字8代表權力、財富與成就。您需要能招財與增強事業運的水晶。',
      colors: ['金色', '黃色', '黑色'],
      crystals: ['黃水晶', '金髮晶', '黑曜石', '虎眼石', '鈦晶']
    },
    9: {
      description: '數字9代表博愛、完成與奉獻。您需要能提升同理心與靈性的水晶。',
      colors: ['紫色', '白色', '金色'],
      crystals: ['紫水晶', '白水晶', '捷克隕石', '拉長石', '月光石']
    }
  };

  return dataMap[number] || dataMap[1];
};

// 獲取星座推薦
const getZodiacRecommendation = () => {
  if (!zodiacForm.sign) {
    ElMessage.warning('請選擇您的星座');
    return;
  }

  const zodiacData = getZodiacData(zodiacForm.sign);
  
  zodiacResult.sign = zodiacForm.sign;
  zodiacResult.signName = zodiacData.name;
  zodiacResult.description = zodiacData.description;
  zodiacResult.colors = zodiacData.colors;
  zodiacResult.crystals = zodiacData.crystals;

  ElMessage.success('星座推薦已生成！');
};

// 獲取星座資料
const getZodiacData = (sign: string) => {
  const dataMap: any = {
    aries: {
      name: '牡羊座',
      description: '充滿活力與熱情的火象星座，需要能增強勇氣與行動力的水晶。',
      colors: ['紅色', '橙色', '金色'],
      crystals: ['紅瑪瑙', '紅碧玉', '血石', '石榴石', '紅兔毛']
    },
    taurus: {
      name: '金牛座',
      description: '穩重務實的土象星座，需要能帶來安定與財富的水晶。',
      colors: ['綠色', '粉色', '棕色'],
      crystals: ['綠幽靈', '綠東陵', '粉晶', '翡翠', '孔雀石']
    },
    gemini: {
      name: '雙子座',
      description: '靈活多變的風象星座，需要能增強溝通與思考的水晶。',
      colors: ['黃色', '藍色', '銀色'],
      crystals: ['黃水晶', '虎眼石', '海藍寶', '青金石', '螢石']
    },
    cancer: {
      name: '巨蟹座',
      description: '溫柔感性的水象星座，需要能增強情感與直覺的水晶。',
      colors: ['白色', '銀色', '粉色'],
      crystals: ['月光石', '珍珠', '粉晶', '白水晶', '海藍寶']
    },
    leo: {
      name: '獅子座',
      description: '自信大方的火象星座，需要能增強領導力與魅力的水晶。',
      colors: ['金色', '橙色', '紅色'],
      crystals: ['黃水晶', '太陽石', '虎眼石', '琥珀', '金髮晶']
    },
    virgo: {
      name: '處女座',
      description: '細心完美的土象星座，需要能帶來平靜與健康的水晶。',
      colors: ['綠色', '棕色', '白色'],
      crystals: ['綠東陵', '碧玉', '茶晶', '螢石', '透石膏']
    },
    libra: {
      name: '天秤座',
      description: '追求平衡的風象星座，需要能增強美感與和諧的水晶。',
      colors: ['粉色', '藍色', '綠色'],
      crystals: ['粉晶', '綠幽靈', '海藍寶', '薔薇輝石', '東菱玉']
    },
    scorpio: {
      name: '天蠍座',
      description: '神秘深沉的水象星座，需要能增強直覺與轉化能量的水晶。',
      colors: ['黑色', '紅色', '紫色'],
      crystals: ['黑曜石', '石榴石', '黑碧璽', '煙晶', '紅瑪瑙']
    },
    sagittarius: {
      name: '射手座',
      description: '樂觀冒險的火象星座，需要能帶來好運與擴展視野的水晶。',
      colors: ['紫色', '藍色', '橙色'],
      crystals: ['紫水晶', '青金石', '綠松石', '拉長石', '藍晶石']
    },
    capricorn: {
      name: '摩羯座',
      description: '踏實負責的土象星座，需要能增強事業與穩定的水晶。',
      colors: ['黑色', '棕色', '綠色'],
      crystals: ['黑曜石', '茶晶', '綠幽靈', '虎眼石', '煙晶']
    },
    aquarius: {
      name: '水瓶座',
      description: '創新獨特的風象星座，需要能增強創意與靈感的水晶。',
      colors: ['藍色', '紫色', '銀色'],
      crystals: ['海藍寶', '天河石', '青金石', '拉長石', '藍晶石']
    },
    pisces: {
      name: '雙魚座',
      description: '夢幻浪漫的水象星座，需要能增強靈性與療癒的水晶。',
      colors: ['紫色', '粉色', '藍色'],
      crystals: ['紫水晶', '月光石', '海藍寶', '粉晶', '拉長石']
    }
  };

  return dataMap[sign] || dataMap.aries;
};

// 獲取色系推薦
const getColorRecommendation = () => {
  if (!colorForm.selectedColor) {
    ElMessage.warning('請選擇您想要的顏色');
    return;
  }

  const colorData = getColorData(colorForm.selectedColor);
  
  colorResult.color = colorForm.selectedColor;
  colorResult.colorName = colorData.name;
  colorResult.description = colorData.description;
  colorResult.crystals = colorData.crystals;

  ElMessage.success('色系推薦已生成！');
};

// 獲取色系資料
const getColorData = (color: string) => {
  const dataMap: any = {
    white: {
      name: '白色系',
      description: '純淨透明的白色系水晶，能淨化能量、提升正面思考。',
      crystals: ['白水晶', '月光石', '透石膏', '白玉髓', '白瑪瑙']
    },
    pink: {
      name: '粉色系',
      description: '溫柔浪漫的粉色系水晶，能招桃花、增進人際關係。',
      crystals: ['粉晶', '草莓晶', '薔薇輝石', '粉色碧璽', '摩根石']
    },
    purple: {
      name: '紫色系',
      description: '高貴典雅的紫色系水晶，能開發智慧、提升靈性。',
      crystals: ['紫水晶', '紫鋰輝石', '紫龍晶', '舒俱徠石', '紫螢石']
    },
    blue: {
      name: '藍色系',
      description: '清新冷靜的藍色系水晶，能增強溝通、帶來平靜。',
      crystals: ['海藍寶', '青金石', '藍晶石', '天河石', '藍色螢石']
    },
    green: {
      name: '綠色系',
      description: '生機盎然的綠色系水晶，能招財納福、療癒身心。',
      crystals: ['綠幽靈', '綠東陵', '東菱玉', '綠碧璽', '橄欖石']
    },
    yellow: {
      name: '黃色系',
      description: '明亮溫暖的黃色系水晶，能招財聚氣、提升自信。',
      crystals: ['黃水晶', '琥珀', '黃玉', '金髮晶', '黃色方解石']
    },
    orange: {
      name: '橙色系',
      description: '活力充沛的橙色系水晶，能激發創意、增強行動力。',
      crystals: ['太陽石', '橙色方解石', '橙色月光石', '橙色瑪瑙', '紅兔毛']
    },
    red: {
      name: '紅色系',
      description: '熱情活力的紅色系水晶，能增強勇氣、激發熱情。',
      crystals: ['紅瑪瑙', '石榴石', '紅碧玉', '紅兔毛', '紅虎眼石']
    },
    black: {
      name: '黑色系',
      description: '神秘強大的黑色系水晶，能辟邪化煞、保護能量。',
      crystals: ['黑曜石', '黑碧璽', '煙晶', '黑瑪瑙', '黑尖晶石']
    },
    brown: {
      name: '棕色系',
      description: '沉穩踏實的棕色系水晶，能安定情緒、增強實踐力。',
      crystals: ['茶晶', '虎眼石', '褐色碧璽', '煙晶', '棕色瑪瑙']
    }
  };

  return dataMap[color] || dataMap.white;
};

// 獲取顏色代碼
const getColorCode = (colorName: string) => {
  const colorMap: any = {
    '白色': '#FFFFFF',
    '粉色': '#FFB6C1',
    '紫色': '#9370DB',
    '藍色': '#4169E1',
    '綠色': '#3CB371',
    '黃色': '#FFD700',
    '橙色': '#FF8C00',
    '紅色': '#DC143C',
    '黑色': '#2F4F4F',
    '棕色': '#8B4513',
    '金色': '#FFD700',
    '銀色': '#C0C0C0',
    '灰色': '#808080'
  };

  return colorMap[colorName] || '#267b98';
};

// 提交客製化需求
const submitCustomization = () => {
  let customData: any = {};

  if (activeTab.value === 'lifePath' && lifePathResult.number) {
    customData = {
      type: '生命靈數客製',
      lifePathNumber: lifePathResult.number,
      birthday: lifePathForm.birthday,
      gender: lifePathForm.gender,
      colors: lifePathResult.colors,
      crystals: lifePathResult.crystals,
      accessories: lifePathAccessories.value
    };
  } else if (activeTab.value === 'zodiac' && zodiacResult.sign) {
    customData = {
      type: '星座設計客製',
      zodiacSign: zodiacResult.signName,
      colors: zodiacResult.colors,
      crystals: zodiacResult.crystals,
      accessories: zodiacAccessories.value
    };
  } else if (activeTab.value === 'color' && colorResult.color) {
    customData = {
      type: '色系選擇客製',
      colorType: colorResult.colorName,
      crystals: colorResult.crystals,
      accessories: colorAccessories.value
    };
  }

  // 儲存到 localStorage
  const existingCustom = localStorage.getItem('customBraceletRequests');
  const customRequests = existingCustom ? JSON.parse(existingCustom) : [];
  customRequests.push({
    ...customData,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('customBraceletRequests', JSON.stringify(customRequests));

  ElMessage.success('客製化需求已提交！我們會盡快與您聯繫');
  
  // 3秒後返回上一頁
  setTimeout(() => {
    router.back();
  }, 3000);
};
</script>

<style scoped>
.custom-bracelet-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-bottom: 50px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo-text {
  font-size: 28px;
  font-weight: bold;
  color: #267b98;
  letter-spacing: 2px;
}

.page-title {
  text-align: center;
  padding: 40px 20px;
  color: #2c3e50;
}

.page-title h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: #267b98;
}

.subtitle {
  font-size: 16px;
  color: #666;
}

.custom-tabs {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tab-content {
  padding: 20px;
}

.tab-content h2 {
  color: #267b98;
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

.custom-form {
  max-width: 600px;
  margin: 0 auto 30px;
}

.date-picker-full {
  width: 100%;
}

.date-picker-full :deep(.el-input__wrapper) {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 15px;
  min-height: 48px;
  display: flex;
  align-items: center;
}

.date-picker-full :deep(.el-input__inner) {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  font-size: 16px;
  line-height: 24px;
  height: 24px;
}

.date-picker-full :deep(.el-input__inner::placeholder) {
  line-height: 24px;
  transform: translateY(0);
}

.date-picker-full :deep(.el-input__prefix),
.date-picker-full :deep(.el-input__suffix) {
  display: flex;
  align-items: center;
}

.result-section {
  margin-top: 30px;
}

.result-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #267b98;
}

.result-card h3 {
  color: #267b98;
  font-size: 24px;
  margin-bottom: 15px;
}

.result-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.recommendation {
  margin-top: 20px;
}

.recommendation h4 {
  color: #2c3e50;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.color-chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-chip {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.crystal-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.crystal-list li {
  background: white;
  padding: 10px 15px;
  border-radius: 6px;
  color: #267b98;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.crystal-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.accessories-section {
  margin-top: 30px;
}

.submit-section {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
}

.submit-section .el-button {
  padding: 15px 50px;
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    padding: 15px 20px;
  }

  .logo-text {
    font-size: 20px;
  }

  .page-title h1 {
    font-size: 28px;
  }

  .custom-tabs {
    padding: 20px 15px;
  }

  .crystal-list {
    grid-template-columns: 1fr;
  }
}
</style>

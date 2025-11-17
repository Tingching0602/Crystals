<template>
  <div class="accessories-selector">
    <el-form :model="accessories" label-width="120px" class="accessories-form">
      <!-- 編織方式 -->
      <el-form-item label="編織方式">
        <el-radio-group v-model="accessories.stringType">
          <el-radio label="elastic">彈性繩</el-radio>
          <el-radio label="metal">金屬扣</el-radio>
          <el-radio label="wax">蠟繩編織</el-radio>
        </el-radio-group>
        <div class="option-description">
          <span v-if="accessories.stringType === 'elastic'">彈性繩：舒適好戴，適合日常配戴</span>
          <span v-if="accessories.stringType === 'metal'">金屬扣：高級質感，可調節鬆緊</span>
          <span v-if="accessories.stringType === 'wax'">蠟繩編織：傳統工藝，獨特風格</span>
        </div>
      </el-form-item>

      <!-- 手圍尺寸 -->
      <el-form-item label="手圍尺寸">
        <el-input-number 
          v-model="accessories.wristSize" 
          :min="13" 
          :max="20" 
          :step="0.5"
          placeholder="請輸入手圍"
          class="wrist-size-input"
        />
        <span class="size-unit">cm</span>
        <div class="option-description">
          測量方式：用軟尺繞手腕一圈，記下長度
        </div>
      </el-form-item>

      <!-- 金屬飾品 -->
      <el-form-item label="金屬飾品">
        <el-checkbox v-model="accessories.withMetalCharm">加入金屬飾品</el-checkbox>
        
        <div v-if="accessories.withMetalCharm" class="metal-options">
          <el-form-item label="飾品類型" label-width="100px">
            <el-select v-model="accessories.metalType" placeholder="請選擇飾品類型">
              <el-option label="星星" value="star" />
              <el-option label="月亮" value="moon" />
              <el-option label="愛心" value="heart" />
              <el-option label="蝴蝶結" value="bow" />
              <el-option label="花朵" value="flower" />
              <el-option label="羽毛" value="feather" />
              <el-option label="貝殼" value="shell" />
              <el-option label="幸運符" value="lucky" />
            </el-select>
          </el-form-item>

          <el-form-item label="金屬材質" label-width="100px">
            <el-radio-group v-model="accessories.metalMaterial">
              <el-radio label="silver">925純銀</el-radio>
              <el-radio label="gold">14K金</el-radio>
              <el-radio label="rose-gold">玫瑰金</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form-item>

      <!-- 特殊需求 -->
      <el-form-item label="特殊需求">
        <el-input
          v-model="accessories.specialRequest"
          type="textarea"
          :rows="3"
          placeholder="請輸入任何特殊需求或備註（選填）"
        />
      </el-form-item>

      <!-- 價格預估 -->
      <el-form-item label="預估價格">
        <div class="price-estimate">
          <span class="price-amount">NT$ {{ estimatedPrice }}</span>
          <span class="price-note">（實際價格將根據水晶品質與數量調整）</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';

// 定義 emits
const emit = defineEmits(['update:modelValue']);

// 配件選擇資料
const accessories = reactive({
  stringType: 'elastic',
  wristSize: 15,
  withMetalCharm: false,
  metalType: '',
  metalMaterial: 'silver',
  specialRequest: ''
});

// 計算預估價格
const estimatedPrice = computed(() => {
  let basePrice = 980; // 基礎價格

  // 編織方式價格
  if (accessories.stringType === 'metal') {
    basePrice += 200;
  } else if (accessories.stringType === 'wax') {
    basePrice += 150;
  }

  // 金屬飾品價格
  if (accessories.withMetalCharm) {
    if (accessories.metalMaterial === 'gold') {
      basePrice += 500;
    } else if (accessories.metalMaterial === 'rose-gold') {
      basePrice += 400;
    } else {
      basePrice += 300;
    }
  }

  // 手圍大小影響價格（超過17.5加200）
  if (accessories.wristSize > 17.5) {
    basePrice += 200;
  }

  return basePrice;
});

// 監聽變化並發送更新
watch(accessories, (newVal) => {
  emit('update:modelValue', { ...newVal, estimatedPrice: estimatedPrice.value });
}, { deep: true });

// 初始化時發送一次
emit('update:modelValue', { ...accessories, estimatedPrice: estimatedPrice.value });
</script>

<style scoped>
.accessories-selector {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.accessories-form {
  max-width: 700px;
}

.option-description {
  margin-top: 8px;
  font-size: 13px;
  color: #909399;
  line-height: 1.5;
}

.size-unit {
  margin-left: 10px;
  color: #606266;
  font-weight: 500;
}

.wrist-size-input {
  width: 120px;
}

.wrist-size-input :deep(.el-input-number__decrease),
.wrist-size-input :deep(.el-input-number__increase) {
  width: 28px;
}

.wrist-size-input :deep(.el-input__wrapper) {
  padding: 1px 8px;
}

.wrist-size-input :deep(.el-input__inner) {
  text-align: center;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
}

.metal-options {
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #267b98;
}

.price-estimate {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price-amount {
  font-size: 24px;
  font-weight: bold;
  color: #267b98;
}

.price-note {
  font-size: 12px;
  color: #909399;
}

.el-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

/* Responsive */
@media (max-width: 768px) {
  .accessories-selector {
    padding: 15px;
  }

  .accessories-form {
    max-width: 100%;
  }

  .metal-options {
    padding: 10px;
  }
}
</style>

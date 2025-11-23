<template>
  <div class="admin-container">
    <!-- 頁首 -->
    <div class="header-section">
      <span class="logo-text">微光水晶 - 後台管理</span>
      <div class="nav-menu">
        <span class="admin-info">管理員: {{ currentUser }}</span>
        <el-button @click="goBack">返回首頁</el-button>
        <el-button @click="logout">登出</el-button>
      </div>
    </div>

    <!-- 商品類型選擇 -->
    <div class="content-wrapper">
      <el-card class="category-card">
        <template #header>
          <div class="card-header">
            <span>選擇商品類型</span>
          </div>
        </template>
        <el-radio-group v-model="selectedCategory" @change="loadProducts">
          <el-radio-button label="crystal">設計款手串</el-radio-button>
          <el-radio-button label="turtle">龜龜手串</el-radio-button>
          <el-radio-button label="balls">水晶球</el-radio-button>
          <el-radio-button label="ore">礦石</el-radio-button>
          <el-radio-button label="necklace">項鍊</el-radio-button>
          <el-radio-button label="earrings">耳環</el-radio-button>
          <el-radio-button label="simple">素手串</el-radio-button>
        </el-radio-group>
      </el-card>

      <!-- 商品列表 -->
      <el-card class="product-list-card">
        <template #header>
          <div class="card-header">
            <span>商品列表 ({{ categoryName }})</span>
            <div>
              <el-button @click="exportToJSON" style="margin-right: 10px;">
                <el-icon><Download /></el-icon>
                匯出 JSON
              </el-button>
              <el-button type="primary" @click="openAddDialog">
                <el-icon><Plus /></el-icon>
                新增商品
              </el-button>
            </div>
          </div>
        </template>

        <el-table :data="products" style="width: 100%" max-height="600">
          <el-table-column prop="id" label="ID" width="60" />
          <el-table-column label="圖片" width="100">
            <template #default="scope">
              <el-image 
                :src="scope.row.imgUrl" 
                style="width: 60px; height: 60px; object-fit: cover;"
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品名稱" width="200" />
          <el-table-column prop="note" label="簡介" show-overflow-tooltip />
          <el-table-column label="價格" width="150">
            <template #default="scope">
              NT$ {{ scope.row.price }} / {{ scope.row.unit || '條' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="scope">
              <el-button size="small" @click="openEditDialog(scope.row)">編輯</el-button>
              <el-button size="small" type="danger" @click="deleteProduct(scope.row)">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 新增/編輯商品對話框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '編輯商品' : '新增商品'"
      width="800px"
    >
      <el-form :model="productForm" label-width="120px">
        <el-form-item label="商品圖片">
          <el-input v-model="productForm.imgUrl" placeholder="請輸入圖片URL" />
          <div style="font-size: 12px; color: #909399; margin-top: 5px;">
            💡 建議使用 imgur.com 上傳圖片，或將 Google Drive 連結轉換為直接連結<br>
            ❌ 錯誤: https://drive.google.com/file/d/xxx/view<br>
            ✅ 正確: https://drive.google.com/uc?export=view&id=xxx<br>
            ✅ 推薦: https://i.imgur.com/xxxxx.jpg
          </div>
        </el-form-item>
        
        <el-form-item label="小圖">
          <el-input v-model="productForm.imgUrlSamll" placeholder="請輸入小圖URL（選填）" />
        </el-form-item>

        <el-form-item label="商品名稱">
          <el-input v-model="productForm.title" placeholder="請輸入商品名稱" />
        </el-form-item>

        <el-form-item label="商品簡介">
          <el-input v-model="productForm.note" placeholder="請輸入商品簡介" />
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input 
            v-model="productForm.description" 
            type="textarea"
            :rows="4"
            placeholder="請輸入商品詳細描述"
          />
        </el-form-item>

        <el-form-item label="適用對象" v-if="selectedCategory === 'crystal'">
          <el-input v-model="productForm.forPerson" placeholder="請輸入適用對象" />
        </el-form-item>

        <el-form-item label="手圍尺寸" v-if="needSize">
          <el-input v-model="productForm.head_size" placeholder="例如：16-18cm" />
        </el-form-item>

        <el-form-item label="水晶尺寸" v-if="needSize">
          <el-input v-model="productForm.crystal_size" placeholder="例如：8mm" />
        </el-form-item>

        <el-form-item label="尺寸" v-if="selectedCategory === 'balls'">
          <el-input v-model="productForm.size" placeholder="例如：43.6mm" />
        </el-form-item>

        <el-form-item label="價格">
          <el-input 
            v-model.number="productForm.price" 
            type="number" 
            placeholder="請輸入純數字，例如：1490"
          >
            <template #prepend>NT$</template>
          </el-input>
          <div style="font-size: 12px; color: #909399; margin-top: 5px;">
            💡 請輸入純數字，不要加「元」或其他符號
          </div>
        </el-form-item>

        <el-form-item label="單位">
          <el-select v-model="productForm.unit" placeholder="請選擇單位">
            <el-option label="條" value="條" />
            <el-option label="個" value="個" />
            <el-option label="對" value="對" />
            <el-option label="組" value="組" />
            <el-option label="件" value="件" />
          </el-select>
        </el-form-item>

        <el-form-item label="價格區間" v-if="productForm.price > 0">
          <el-input :value="getPriceRangeLabel(productForm.price)" disabled />
          <div style="font-size: 12px; color: #909399; margin-top: 5px;">
            💡 價格區間會根據輸入的價格自動分類
          </div>
        </el-form-item>

        <el-form-item label="類型" v-if="selectedCategory === 'simple'">
          <el-input v-model="productForm.type" placeholder="simple" disabled />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">確定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Download } from '@element-plus/icons-vue';

const router = useRouter();
const currentUser = ref('');
const selectedCategory = ref('crystal');
const products = ref<Array<any>>([]);
const dialogVisible = ref(false);
const isEdit = ref(false);
const productForm = ref<any>({});

// 商品類型名稱映射
const categoryNames: { [key: string]: string } = {
  crystal: '設計款手串',
  turtle: '龜龜手串',
  balls: '水晶球',
  ore: '礦石',
  necklace: '項鍊',
  earrings: '耳環',
  simple: '素手串'
};

const categoryName = computed(() => categoryNames[selectedCategory.value] || '');

// 判斷是否需要尺寸欄位
const needSize = computed(() => {
  return ['crystal', 'turtle', 'simple'].includes(selectedCategory.value);
});

// 根據價格自動分類價格區間
const getPriceType = (price: number): string => {
  if (price <= 500) return 'Price1';
  if (price <= 1000) return 'Price2';
  if (price <= 1500) return 'Price3';
  if (price <= 2000) return 'Price4';
  if (price <= 3000) return 'Price5';
  return 'Price6';
};

// 獲取價格區間標籤（用於顯示）
const getPriceRangeLabel = (price: number): string => {
  if (price <= 500) return '1-500元';
  if (price <= 1000) return '501-1000元';
  if (price <= 1500) return '1001-1500元';
  if (price <= 2000) return '1501-2000元';
  if (price <= 3000) return '2001元-3000元';
  return '3001元-4000元';
};


// 從 localStorage 載入商品資料
const loadProducts = () => {
  const storageKey = `products_${selectedCategory.value}`;
  const savedProducts = localStorage.getItem(storageKey);
  
  if (savedProducts) {
    products.value = JSON.parse(savedProducts);
  } else {
    // 如果沒有保存的資料，從原始 model 載入
    loadFromModel();
  }
};

// 從原始 model 載入資料（首次使用時）
const loadFromModel = async () => {
  try {
    let modelData: any[] = [];
    switch (selectedCategory.value) {
      case 'crystal':
        const crystalModule = await import('../model/crystals');
        modelData = crystalModule.default;
        break;
      case 'turtle':
        const turtleModule = await import('../model/tutles');
        modelData = turtleModule.default;
        break;
      case 'balls':
        const ballsModule = await import('../model/balls');
        modelData = ballsModule.default;
        break;
      case 'ore':
        const oreModule = await import('../model/ores');
        modelData = oreModule.default;
        break;
      case 'necklace':
        const necklaceModule = await import('../model/necklace');
        modelData = necklaceModule.default;
        break;
      case 'earrings':
        const earringsModule = await import('../model/earrings');
        modelData = earringsModule.default;
        break;
      case 'simple':
        const simpleModule = await import('../model/simpleBracelets');
        modelData = simpleModule.default;
        break;
    }
    
    // 為商品添加 ID（如果沒有的話）
    products.value = modelData.map((item: any, index: number) => ({
      id: item.id || index + 1,
      ...item
    }));
    
    // 保存到 localStorage
    saveToLocalStorage();
  } catch (error) {
    console.error('載入商品資料失敗:', error);
    ElMessage.error('載入商品資料失敗');
  }
};

// 保存到 localStorage
const saveToLocalStorage = () => {
  const storageKey = `products_${selectedCategory.value}`;
  localStorage.setItem(storageKey, JSON.stringify(products.value));
  ElMessage.success('商品資料已保存');
};

// 匯出 JSON 檔案
const exportToJSON = () => {
  const categoryMapping: Record<string, string> = {
    'crystal': 'crystals',
    'turtle': 'tutles',
    'balls': 'balls',
    'ore': 'ores',
    'necklace': 'necklace',
    'earrings': 'earrings',
    'simple': 'simpleBracelets'
  };
  
  const filename = categoryMapping[selectedCategory.value] || selectedCategory.value;
  const dataStr = JSON.stringify(products.value, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  ElMessage.success(`已匯出 ${filename}.json`);
};

// 開啟新增對話框
const openAddDialog = () => {
  isEdit.value = false;
  productForm.value = {
    imgUrl: '',
    imgUrlSamll: '',
    title: '',
    note: '',
    description: '',
    price: 0,
    unit: '條',  // 預設單位
    type: selectedCategory.value === 'simple' ? 'simple' : ''
  };
  
  // 根據類型設定預設單位
  if (selectedCategory.value === 'balls') {
    productForm.value.unit = '個';
  } else if (selectedCategory.value === 'earrings') {
    productForm.value.unit = '對';
  } else if (selectedCategory.value === 'necklace') {
    productForm.value.unit = '條';
  }
  
  // 根據類型添加額外欄位
  if (needSize.value) {
    productForm.value.head_size = '';
    productForm.value.crystal_size = '';
  }
  
  if (selectedCategory.value === 'crystal') {
    productForm.value.forPerson = '';
  }
  
  if (selectedCategory.value === 'balls') {
    productForm.value.size = '';
  }
  
  dialogVisible.value = true;
};

// 開啟編輯對話框
const openEditDialog = (row: any) => {
  isEdit.value = true;
  productForm.value = { ...row };
  dialogVisible.value = true;
};

// 儲存商品
const saveProduct = () => {
  // 驗證必填欄位
  if (!productForm.value.title || !productForm.value.price) {
    ElMessage.warning('請填寫商品名稱和價格');
    return;
  }
  
  // 自動設定價格類型
  productForm.value.priceType = getPriceType(productForm.value.price);
  
  if (isEdit.value) {
    // 更新商品
    const index = products.value.findIndex(p => p.id === productForm.value.id);
    if (index !== -1) {
      products.value[index] = { ...productForm.value };
    }
  } else {
    // 新增商品
    const newId = products.value.length > 0 
      ? Math.max(...products.value.map(p => p.id || 0)) + 1 
      : 1;
    products.value.push({
      id: newId,
      ...productForm.value
    });
  }
  
  // 保存到 localStorage
  saveToLocalStorage();
  
  dialogVisible.value = false;
  ElMessage.success(isEdit.value ? '商品已更新' : '商品已新增');
};

// 刪除商品
const deleteProduct = (row: any) => {
  ElMessageBox.confirm(
    `確定要刪除商品「${row.title}」嗎？`,
    '確認刪除',
    {
      type: 'warning',
      confirmButtonText: '確定',
      cancelButtonText: '取消'
    }
  ).then(() => {
    const index = products.value.findIndex(p => p.id === row.id);
    if (index !== -1) {
      products.value.splice(index, 1);
      saveToLocalStorage();
      ElMessage.success('商品已刪除');
    }
  }).catch(() => {
    // 用戶取消
  });
};

// 返回首頁
const goBack = () => {
  router.push('/');
};

// 登出
const logout = () => {
  ElMessageBox.confirm('確定要登出嗎？', '確認登出', {
    type: 'warning'
  }).then(() => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    router.push('/');
    ElMessage.success('已成功登出');
  }).catch(() => {
    // 用戶取消
  });
};

// 頁面載入時檢查權限
onMounted(() => {
  const user = sessionStorage.getItem('currentUser');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  
  if (!isLoggedIn || user !== 'Admin') {
    ElMessage.error('無權限訪問此頁面');
    router.push('/');
    return;
  }
  
  currentUser.value = user;
  loadProducts();
});
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
  font-size: 24px;
  font-weight: bold;
  color: #267b98;
  letter-spacing: 2px;
}

.nav-menu {
  display: flex;
  gap: 15px;
  align-items: center;
}

.admin-info {
  color: #606266;
  font-size: 14px;
  padding: 0 15px;
  border-right: 1px solid #dcdfe6;
}

.content-wrapper {
  max-width: 1400px;
  margin: 30px auto;
  padding: 0 20px;
}

.category-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-list-card {
  margin-top: 20px;
}

.el-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    padding: 15px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .logo-text {
    font-size: 18px;
  }

  .nav-menu {
    width: 100%;
    justify-content: center;
  }

  .admin-info {
    border-right: none;
    border-bottom: 1px solid #dcdfe6;
    padding-bottom: 10px;
  }
}
</style>

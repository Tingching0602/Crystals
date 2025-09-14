<template>
  <el-container>
  <!-- 桌面版選單 -->
   <el-main class="membermain">
    <div class="logo">
      <img :src="HOHO" width="160" hight="60" />
    </div>
 <div  class="memberdata">
    <div class="member-profile">
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="https://i.imgur.com/tPuVTAZ.jpeg" alt="會員頭像" />
          <div class="member-badge">
            <el-icon><StarFilled /></el-icon>
            <span>讚石級</span>
          </div>
        </div>
        <div class="profile-info">
          <h2 class="member-name">劉小萍</h2>
          <p class="member-title">微光水晶 VIP 會員</p>
          <div class="member-stats">
            <div class="stat-item">
              <span class="stat-number">{{ totalOrders || 0 }}</span>
              <span class="stat-label">總訂單</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ favoriteItems?.length || 0 }}</span>
              <span class="stat-label">收藏商品</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalSpent || 0 }}</span>
              <span class="stat-label">消費金額</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="profile-details">
        <el-row :gutter="30">
          <el-col :md="12">
            <div class="detail-card">
              <h3><el-icon><User /></el-icon> 基本資料</h3>
              <div class="detail-item">
                <span class="label">會員姓名：</span>
                <span class="value">劉小萍</span>
              </div>
              <div class="detail-item">
                <span class="label">居住縣市：</span>
                <span class="value">台北市</span>
              </div>
              <div class="detail-item">
                <span class="label">聯絡電話：</span>
                <span class="value">09123221888</span>
              </div>
              <div class="detail-item">
                <span class="label">電子信箱：</span>
                <span class="value">anya@gmail.com</span>
              </div>
            </div>
          </el-col>
          
          <el-col :md="12">
            <div class="detail-card">
              <h3><el-icon><Trophy /></el-icon> 會員福利</h3>
              <div class="benefit-item">
                <el-icon class="benefit-icon"><Star /></el-icon>
                <div class="benefit-content">
                  <div class="benefit-title">生日優惠</div>
                  <div class="benefit-desc">生日月享9折優惠</div>
                </div>
              </div>
              <div class="benefit-item">
                <el-icon class="benefit-icon"><Discount /></el-icon>
                <div class="benefit-content">
                  <div class="benefit-title">VIP 專屬</div>
                  <div class="benefit-desc">新品優先購買權</div>
                </div>
              </div>
              <div class="benefit-item">
                <el-icon class="benefit-icon"><Star /></el-icon>
                <div class="benefit-content">
                  <div class="benefit-title">積分回饋</div>
                  <div class="benefit-desc">每消費100元得1點</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 購買清單整合到會員資料中 -->
      <div class="purchase-history">
        <h3><el-icon><ShoppingBag /></el-icon> 購買清單</h3>
        
        <div v-if="!orderList || orderList.length === 0" class="empty-orders">
          <el-empty description="您還沒有購買記錄">
            <el-button type="primary" @click="goToHome">前往購物</el-button>
          </el-empty>
        </div>

        <div v-else>
          <!-- 訂單統計 -->
          <div class="order-stats">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="order-stat-card">
                  <div class="stat-number">{{ orderList?.length || 0 }}</div>
                  <div class="stat-label">總訂單</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="order-stat-card">
                  <div class="stat-number">{{ completedOrders || 0 }}</div>
                  <div class="stat-label">已完成</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="order-stat-card">
                  <div class="stat-number">{{ processingOrders || 0 }}</div>
                  <div class="stat-label">處理中</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="order-stat-card">
                  <div class="stat-number">NT$ {{ totalSpent || 0 }}</div>
                  <div class="stat-label">總消費</div>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 訂單列表 -->
          <div class="order-list">
            <div v-for="order in (paginatedOrders || [])" :key="order.id" class="order-item">
              <div class="order-header">
                <div class="order-info">
                  <span class="order-number">{{ order.orderNumber }}</span>
                  <span class="order-date">{{ formatDate(order.orderTime) }}</span>
                </div>
                <el-tag :type="getStatusType(order.status)">{{ getStatusLabel(order.status) }}</el-tag>
              </div>
              
              <div class="order-content">
                <div class="order-items">
                  <div v-for="item in (order.items || [])" :key="`${order.id}_${item.title}`" class="order-product">
                    <img v-if="item.item?.imgUrl" :src="item.item.imgUrl" class="product-image" />
                    <div class="product-info">
                      <div class="product-name">{{ item.title }}</div>
                      <div class="product-details">{{ getTypeLabel(item.type) }} × {{ item.quantity }}</div>
                    </div>
                    <div class="product-price">NT$ {{ getItemPrice(item) * item.quantity }}</div>
                  </div>
                </div>
                
                <div class="order-summary">
                  <div class="summary-item">
                    <span>商品小計：</span>
                    <span>NT$ {{ order.subtotal }}</span>
                  </div>
                  <div class="summary-item">
                    <span>運費：</span>
                    <span>NT$ 60</span>
                  </div>
                  <div class="summary-item total">
                    <span>訂單總計：</span>
                    <span>NT$ {{ order.totalAmount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分頁 -->
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[3, 5, 10]"
              :total="orderList?.length || 0"
              layout="total, sizes, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
        <a class="lovebox">我的最愛專區</a>
        <el-tag v-if="favoriteItems && favoriteItems.length > 0" type="danger">{{ favoriteItems.length }} 個收藏</el-tag>
      </div>
      
      <div style="width: 100%; margin-bottom: 30px;">
        <div v-if="!isLoggedIn" class="empty-favorites">
          <el-empty description="請先登入以查看您的收藏">
            <el-button type="primary" @click="goToHome">前往首頁登入</el-button>
          </el-empty>
        </div>
        
        <div v-else-if="!favoriteItems || favoriteItems.length === 0" class="empty-favorites">
          <el-empty description="您還沒有收藏任何商品">
            <el-button type="primary" @click="goToHome">前往購物</el-button>
          </el-empty>
        </div>
        
        <el-table v-else :data="favoriteItems || []" style="width: 100%" @row-click="openFavoriteDetail">
          <el-table-column width="80">
            <template #default="scope">
              <img 
                :src="scope.row.imgUrl" 
                style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"
                :alt="scope.row.title"
              />
            </template>
          </el-table-column>
          
          <el-table-column prop="title" label="商品名稱" min-width="150">
            <template #default="scope">
              <div>
                <div style="font-weight: bold; color: #267b98;">{{ scope.row.title }}</div>
                <div style="font-size: 12px; color: #999;">{{ getTypeLabel(scope.row.type) }}</div>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column prop="note" label="商品描述" min-width="200">
            <template #default="scope">
              <el-text line-clamp="2" style="font-size: 14px;">{{ scope.row.note }}</el-text>
            </template>
          </el-table-column>
          
          <el-table-column label="收藏時間" width="150">
            <template #default="scope">
              <div style="font-size: 12px; color: #666;">
                {{ formatFavoriteTime(scope.row.favoriteTime) }}
              </div>
            </template>
          </el-table-column>
          
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button 
                type="danger" 
                size="small" 
                @click.stop="removeFavorite(scope.$index)"
                :icon="Delete"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
 </div>
  <section>
    <div class="container"></div>
  </section>
  <!--Love-->

  <section id="love">
    <div class="container"></div>
  </section>
  <!--Sopping-->
  <section id="Sopping">
    <div class="container"></div>
  </section>

  <footer>
    <p>微光水晶 &copy; 2024</p>
    <input type="hidden" value="v2.0.0" />
  </footer>
</el-main>
</el-container>
</template>
<script setup lang="ts">
import HOHO from "../img/HOHO.png";
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, User, Trophy, Discount, Star, ShoppingBag, StarFilled } from '@element-plus/icons-vue';

const router = useRouter();

// 我的最愛相關
const favoriteItems = ref<Array<any>>([]);
const isLoggedIn = ref(false);
const currentUser = ref('');

// 訂單列表和分頁
const orderList = ref<Array<any>>([]);
const currentPage = ref(1);
const pageSize = ref(3);

// 模擬訂單數據
const mockOrders = [
  {
    id: 1,
    orderNumber: 'MC20241201001',
    orderTime: '2024-12-01T14:30:00',
    status: 'completed',
    items: [
      {
        title: '土星仙子',
        type: 'crystal',
        quantity: 1,
        item: {
          imgUrl: 'https://i.imgur.com/tPuVTAZ.jpeg'
        }
      },
      {
        title: '紫水晶球',
        type: 'balls',
        quantity: 2,
        item: {
          imgUrl: 'https://i.imgur.com/gdQvu9y.png'
        }
      }
    ],
    customerInfo: {
      name: '劉小萍',
      phone: '0912345678',
      email: 'anya@gmail.com',
      store: '台北車站門市',
      payment: 'transfer',
      note: '請小心包裝'
    },
    subtotal: 2000,
    totalAmount: 2060
  },
  {
    id: 2,
    orderNumber: 'MC20241128002',
    orderTime: '2024-11-28T10:15:00',
    status: 'processing',
    items: [
      {
        title: '月光石項鍊',
        type: 'necklace',
        quantity: 1,
        item: {
          imgUrl: 'https://i.imgur.com/WQuzfuy.jpeg'
        }
      }
    ],
    customerInfo: {
      name: '劉小萍',
      phone: '0987654321',
      email: 'anya@gmail.com',
      store: '板橋府中門市',
      payment: 'linepay',
      note: ''
    },
    subtotal: 2000,
    totalAmount: 2060
  },
  {
    id: 3,
    orderNumber: 'MC20241125003',
    orderTime: '2024-11-25T16:45:00',
    status: 'shipped',
    items: [
      {
        title: '天使翅膀耳環',
        type: 'earrings',
        quantity: 1,
        item: {
          imgUrl: 'https://i.imgur.com/GduXnt8.jpeg'
        }
      },
      {
        title: '綠幽靈原礦',
        type: 'ore',
        quantity: 1,
        item: {
          imgUrl: 'https://i.imgur.com/JuNdJxp.jpeg'
        }
      }
    ],
    customerInfo: {
      name: '劉小萍',
      phone: '0911223344',
      email: 'anya@gmail.com',
      store: '新竹巨城門市',
      payment: 'transfer',
      note: '生日禮物，請加強包裝'
    },
    subtotal: 3300,
    totalAmount: 3360
  }
];

// 計算訂單統計
const totalOrders = computed(() => orderList.value?.length || 0);
const completedOrders = computed(() => orderList.value?.filter(order => order.status === 'completed').length || 0);
const processingOrders = computed(() => orderList.value?.filter(order => order.status === 'processing' || order.status === 'pending').length || 0);
const totalSpent = computed(() => {
  return orderList.value?.reduce((total, order) => total + order.totalAmount, 0) || 0;
});

// 分頁訂單列表
const paginatedOrders = computed(() => {
  if (!orderList.value) return [];
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return orderList.value.slice(start, end);
});

// 載入用戶的收藏資料
const loadFavorites = () => {
  if (isLoggedIn.value && currentUser.value) {
    const savedFavorites = localStorage.getItem(`favorites_${currentUser.value}`);
    if (savedFavorites) {
      favoriteItems.value = JSON.parse(savedFavorites);
    }
  }
};

// 獲取商品類型標籤
const getTypeLabel = (type: string) => {
  const labels: { [key: string]: string } = {
    crystal: '設計款手串',
    turtle: '雕刻件',
    balls: '球球系列',
    ore: '原礦系列',
    necklace: '項鍊系列',
    earrings: '耳環系列'
  }
  return labels[type] || type;
};

// 格式化收藏時間
const formatFavoriteTime = (timeString: string) => {
  if (!timeString) return '';
  const date = new Date(timeString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 點擊收藏項目開啟詳細視窗
const openFavoriteDetail = (row: any) => {
  // 將收藏資料暫存到 sessionStorage，然後跳轉到首頁並開啟對應的詳細視窗
  sessionStorage.setItem('openFavoriteDetail', JSON.stringify(row));
  router.push('/');
};

// 移除收藏
const removeFavorite = (index: number) => {
  ElMessageBox.confirm('確定要移除這個收藏嗎？', '確認移除', {
    type: 'warning'
  }).then(() => {
    favoriteItems.value.splice(index, 1);
    
    // 更新 localStorage
    if (isLoggedIn.value && currentUser.value) {
      localStorage.setItem(`favorites_${currentUser.value}`, JSON.stringify(favoriteItems.value));
    }
    
    ElMessage.success('已移除收藏');
  }).catch(() => {
    // 用戶取消
  });
};

// 計算商品價格
const getItemPrice = (item: any) => {
  const prices: { [key: string]: number } = {
    crystal: 800,
    turtle: 1200,
    balls: 600,
    ore: 1500,
    necklace: 2000,
    earrings: 1800
  }
  return prices[item.type] || 1000;
};

// 獲取訂單狀態標籤
const getStatusLabel = (status: string) => {
  const labels: { [key: string]: string } = {
    pending: '處理中',
    processing: '準備中',
    shipped: '已出貨',
    completed: '已完成',
    cancelled: '已取消'
  }
  return labels[status] || status;
};

// 獲取訂單狀態類型
const getStatusType = (status: string) => {
  const types: { [key: string]: string } = {
    pending: 'warning',
    processing: 'primary',
    shipped: 'success',
    completed: 'success',
    cancelled: 'danger'
  }
  return types[status] || 'info';
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 分頁處理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
};

// 載入訂單資料
const loadOrders = () => {
  try {
    // 從 localStorage 載入真實的訂單資料
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    
    // 如果沒有真實訂單，使用模擬資料
    orderList.value = savedOrders.length > 0 ? savedOrders : mockOrders;
    console.log('載入訂單資料:', orderList.value);
  } catch (error) {
    console.error('載入訂單失敗:', error);
    // 如果載入失敗，使用模擬資料
    orderList.value = mockOrders;
  }
};

// 前往首頁
const goToHome = () => {
  router.push('/');
};

// 頁面載入時執行
onMounted(() => {
  // 檢查登入狀態
  const savedLoginStatus = localStorage.getItem('isLoggedIn');
  const savedUser = localStorage.getItem('currentUser');
  if (savedLoginStatus === 'true' && savedUser) {
    isLoggedIn.value = true;
    currentUser.value = savedUser;
    loadFavorites();
  }
  // 始終載入訂單數據（包括模擬數據）
  loadOrders();
});
</script>

<style scoped>
.membermain {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

.memberdata {
  max-width: 1200px;
  margin: 0 auto;
}

/* 確保基本元素可見 */
.member-profile, .purchase-history {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div class="order-history-page">
    <!-- 標題區 -->
    <div class="header">
      <div class="logo">
        <img :src="HOHO" width="160" height="60" />
      </div>
      <ul class="nav-menu">
        <li><router-link to="/">回到首頁</router-link></li>
        <li><router-link to="/member">會員中心</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <div class="container">
        <h1 style="text-align: center; color: #267b98; margin-bottom: 30px;">購買清單</h1>
        
        <div v-if="orderList.length === 0" class="empty-state">
          <el-empty description="您還沒有購買記錄">
            <el-button type="primary" @click="goToHome">前往購物</el-button>
          </el-empty>
        </div>

        <div v-else>
          <!-- 訂單列表 -->
          <div v-for="order in orderList" :key="order.id" class="order-card">
            <el-card>
              <template #header>
                <div class="order-header">
                  <span class="order-number">訂單編號：{{ order.orderNumber }}</span>
                  <span class="order-date">{{ formatDate(order.orderTime) }}</span>
                </div>
              </template>
              
              <div class="order-content">
                <!-- 商品列表 -->
                <el-table :data="order.items" style="width: 100%; margin-bottom: 20px;">
                  <el-table-column prop="title" label="品項" width="300">
                    <template #default="scope">
                      <div class="item-info">
                        <img v-if="scope.row.item.imgUrl" :src="scope.row.item.imgUrl" class="item-image" />
                        <div>
                          <div class="item-title">{{ scope.row.title }}</div>
                          <div class="item-type">{{ getTypeLabel(scope.row.type) }}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="數量" width="100" align="center">
                    <template #default="scope">
                      <span class="quantity">{{ scope.row.quantity }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="單價" width="120" align="center">
                    <template #default="scope">
                      <span>NT$ {{ getItemPrice(scope.row) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="小計" width="120" align="center">
                    <template #default="scope">
                      <span class="subtotal">NT$ {{ getItemPrice(scope.row) * scope.row.quantity }}</span>
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 訂單資訊 -->
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="order-info">
                      <h4>訂購資訊</h4>
                      <p><strong>姓名：</strong>{{ order.customerInfo.name }}</p>
                      <p><strong>電話：</strong>{{ order.customerInfo.phone }}</p>
                      <p><strong>Email：</strong>{{ order.customerInfo.email }}</p>
                      <p><strong>取貨門市：</strong>{{ order.customerInfo.store }}</p>
                      <p><strong>付款方式：</strong>{{ getPaymentMethodName(order.customerInfo.payment) }}</p>
                      <p v-if="order.customerInfo.note"><strong>備註：</strong>{{ order.customerInfo.note }}</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="order-summary">
                      <h4>金額明細</h4>
                      <div class="amount-row">
                        <span>商品小計：</span>
                        <span>NT$ {{ order.subtotal }}</span>
                      </div>
                      <div class="amount-row">
                        <span>運費：</span>
                        <span>NT$ 60</span>
                      </div>
                      <div class="amount-row total">
                        <span>總金額：</span>
                        <span>NT$ {{ order.totalAmount }}</span>
                      </div>
                      <div class="order-status">
                        <el-tag :type="getStatusType(order.status)">{{ getStatusLabel(order.status) }}</el-tag>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>

          <!-- 分頁 -->
          <div class="pagination">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 20]"
              :total="totalOrders"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- 頁腳 -->
    <footer>
      <p>微光水晶 &copy; 2024</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HOHO from "../img/HOHO.png"

const router = useRouter()

// 訂單資料
const orderList = ref<Array<any>>([])
const currentPage = ref(1)
const pageSize = ref(10)
const totalOrders = ref(0)

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
      name: '王小明',
      phone: '0912345678',
      email: 'wang@example.com',
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
      name: '李美華',
      phone: '0987654321',
      email: 'li@example.com',
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
      name: '張大偉',
      phone: '0911223344',
      email: 'zhang@example.com',
      store: '新竹巨城門市',
      payment: 'transfer',
      note: '生日禮物，請加強包裝'
    },
    subtotal: 3300,
    totalAmount: 3360
  }
]

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
  return prices[item.type] || 1000
}

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
  return labels[type] || type
}

// 獲取付款方式名稱
const getPaymentMethodName = (value: string) => {
  const methods: { [key: string]: string } = {
    transfer: '銀行轉帳',
    linepay: 'Line Pay'
  }
  return methods[value] || value
}

// 獲取訂單狀態標籤
const getStatusLabel = (status: string) => {
  const labels: { [key: string]: string } = {
    pending: '處理中',
    processing: '準備中',
    shipped: '已出貨',
    completed: '已完成',
    cancelled: '已取消'
  }
  return labels[status] || status
}

// 獲取訂單狀態類型
const getStatusType = (status: string) => {
  const types: { [key: string]: string } = {
    pending: 'warning',
    processing: 'primary',
    shipped: 'success',
    completed: 'success',
    cancelled: 'danger'
  }
  return types[status] || 'info'
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 分頁處理
const handleSizeChange = (size: number) => {
  pageSize.value = size
  loadOrders()
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  loadOrders()
}

// 載入訂單資料
const loadOrders = () => {
  try {
    // 從 localStorage 載入真實的訂單資料
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    
    // 如果沒有真實訂單，使用模擬資料
    const allOrders = savedOrders.length > 0 ? savedOrders : mockOrders
    
    // 分頁處理
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    orderList.value = allOrders.slice(start, end)
    totalOrders.value = allOrders.length
  } catch (error) {
    console.error('載入訂單失敗:', error)
    // 如果載入失敗，使用模擬資料
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    orderList.value = mockOrders.slice(start, end)
    totalOrders.value = mockOrders.length
  }
}

// 前往首頁
const goToHome = () => {
  router.push('/')
}

// 頁面載入時執行
onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.order-history-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.main-content {
  flex: 1;
  padding-top: 80px;
  padding-bottom: 20px;
}

.nav-menu {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li a {
  color: #267b98;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
}

.nav-menu li a:hover {
  color: #1a5c75;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.order-card {
  margin-bottom: 30px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-number {
  font-size: 18px;
  font-weight: bold;
  color: #267b98;
}

.order-date {
  color: #666;
  font-size: 14px;
}

.order-content {
  margin-top: 20px;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}

.item-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.item-type {
  font-size: 12px;
  color: #999;
}

.quantity {
  font-weight: bold;
  color: #267b98;
}

.subtotal {
  font-weight: bold;
  color: #267b98;
}

.order-info,
.order-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.order-info h4,
.order-summary h4 {
  margin: 0 0 15px 0;
  color: #267b98;
  font-size: 16px;
}

.order-info p {
  margin: 8px 0;
  font-size: 14px;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.amount-row.total {
  font-size: 18px;
  font-weight: bold;
  color: #267b98;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  margin-top: 10px;
}

.order-status {
  margin-top: 15px;
  text-align: center;
}

.pagination {
  margin-top: 30px;
  text-align: center;
}

footer {
  width: 100%;
  text-align: center;
  background: #4a4a4a;
  padding: 1rem;
  color: white;
  letter-spacing: 2px;
  margin-top: auto;
}

@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .header {
    padding: 0 10px;
  }
  
  .nav-menu {
    gap: 10px;
  }
  
  .nav-menu li a {
    font-size: 14px;
  }
  
  .item-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .order-info,
  .order-summary {
    margin-bottom: 20px;
  }
}
</style>
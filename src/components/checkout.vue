<template>
  <div class="checkout-page">
    <!-- 標題區 -->
    <div class="header">
      <div class="logo">
        <span class="logo-text">微光水晶</span>
      </div>
      <ul class="nav-menu">
        <li><router-link to="/">回到首頁</router-link></li>
        <li><router-link to="/member">會員中心</router-link></li>
      </ul>
    </div>

    <div class="main-content">
      <div class="container">
        <h1 style="text-align: center; color: #267b98; margin-bottom: 30px;">結帳頁面</h1>
        
        <!-- 訂單摘要 -->
        <el-row :gutter="30">
          <el-col :lg="14" :md="24" :sm="24">
            <el-card class="order-summary">
              <template #header>
                <h3>訂單摘要</h3>
              </template>
              
              <div v-if="cartItems.length === 0" style="text-align: center; color: #999; padding: 40px;">
                購物車是空的，<router-link to="/" style="color: #267b98;">返回首頁選購商品</router-link>
              </div>
              
              <div v-else>
                <el-table :data="cartItems" style="width: 100%">
                  <el-table-column prop="title" label="商品名稱" />
                  <el-table-column prop="type" label="類型" width="100" />
                  <el-table-column prop="quantity" label="數量" width="80" align="center" />
                  <el-table-column label="單價" width="100" align="center">
                    <template #default="scope">
                      <span>NT$ {{ getItemPrice(scope.row) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="小計" width="120" align="center">
                    <template #default="scope">
                      <span style="font-weight: bold; color: #267b98;">
                        NT$ {{ getItemPrice(scope.row) * scope.row.quantity }}
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
                
                <el-divider />
                
                <div style="text-align: right; font-size: 18px; margin-top: 20px;">
                  <p style="margin: 5px 0;">
                    小計：<span style="font-weight: bold;">NT$ {{ subtotalAmount }}</span>
                  </p>
                  <p style="margin: 5px 0;">
                    運費：<span style="font-weight: bold;">NT$ 60</span>
                  </p>
                  <el-divider />
                  <p style="font-size: 24px; color: #267b98;">
                    總計：<span style="font-weight: bold;">NT$ {{ totalAmount }}</span>
                  </p>
                </div>
              </div>
            </el-card>
          </el-col>
          
          <!-- 訂購資訊表單 -->
          <el-col :lg="10" :md="24" :sm="24">
            <el-card class="checkout-form">
              <template #header>
                <h3>訂購資訊</h3>
              </template>
              
              <el-form
                ref="checkoutFormRef"
                :model="checkoutForm"
                :rules="formRules"
                label-width="80px"
                v-if="cartItems.length > 0"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="checkoutForm.name" placeholder="請輸入您的姓名" />
                </el-form-item>
                
                <el-form-item label="電話" prop="phone">
                  <el-input v-model="checkoutForm.phone" placeholder="請輸入聯絡電話" />
                </el-form-item>
                
                <el-form-item label="Email" prop="email">
                  <el-input v-model="checkoutForm.email" placeholder="請輸入Email地址" />
                </el-form-item>
                
                <el-form-item label="取貨門市" prop="store">
                  <el-input 
                    v-model="checkoutForm.store" 
                    placeholder="請輸入取貨的7-11門市名稱或地址"
                    style="width: 100%"
                  />
                  <div style="font-size: 11px; color: #999; margin-top: 3px;">
                    例如：台北車站門市、板橋府中門市等
                  </div>
                </el-form-item>
                
                <!-- LINE 官方帳號綁定 -->
                <el-alert
                  type="success"
                  :closable="false"
                  style="margin-bottom: 20px;"
                >
                  <template #title>
                    <div style="line-height: 1.6;">
                      <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
                        💚 綁定微光水晶 LINE 官方帳號
                      </div>
                      <div style="font-size: 14px; color: #333; margin-bottom: 8px;">
                        現在綁定，本次訂單 <span style="color: #f56c6c; font-weight: bold;">直接折 NT$150</span>，<br/>
                        還能在 LINE 收到訂單與出貨通知。
                      </div>
                      <div style="margin-top: 10px;">
                        👉 <a 
                          href="https://lin.ee/1QdPsXd" 
                          target="_blank"
                          style="color: #267b98; font-weight: bold; text-decoration: underline; font-size: 15px;"
                        >
                          【我要綁定並折抵 150】
                        </a>
                      </div>
                    </div>
                  </template>
                </el-alert>
                
                <el-form-item label="付款方式" prop="payment">
                  <el-radio-group v-model="checkoutForm.payment" @change="onPaymentChange">
                    <el-radio value="transfer">銀行轉帳</el-radio>
                    <el-radio value="linepay">Line Pay</el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <el-form-item label="備註">
                  <el-input
                    v-model="checkoutForm.note"
                    type="textarea"
                    :rows="2"
                    placeholder="有任何特殊需求請在此註明"
                  />
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" class="sumbitBtn" @click="submitOrder" :loading="submitting" style="width: 100%;">
                    確認訂購
                  </el-button>
                  <el-button @click="goBack" style="width: 100%; margin-top: 10px;">
                    返回購物車
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <!-- 頁腳 -->
    <footer>
      <p>微光水晶 &copy; 2024</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'

const router = useRouter()

// 從 localStorage 或者父組件獲取購物車數據
const cartItems = ref<Array<any>>([])

// 結帳表單
const checkoutFormRef = ref<FormInstance>()
const submitting = ref(false)

const checkoutForm = reactive({
  name: '',
  phone: '',
  email: '',
  store: '',
  payment: '',
  note: ''
})

// 表單驗證規則
const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名長度應為2-20個字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '請輸入電話號碼', trigger: 'blur' },
    { pattern: /^09\d{8}$/, message: '請輸入正確的手機號碼格式', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '請輸入Email地址', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的Email格式', trigger: 'blur' }
  ],
  store: [
    { required: true, message: '請輸入取貨門市', trigger: 'blur' },
    { min: 2, message: '門市名稱至少2個字符', trigger: 'blur' }
  ],
  payment: [
    { required: true, message: '請選擇付款方式', trigger: 'change' }
  ]
})

// 計算商品價格 (模擬價格)
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

// 計算小計金額 (商品總額)
const subtotalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (getItemPrice(item) * item.quantity)
  }, 0)
})

// 運費
const shippingFee = 60

// 計算總金額 (小計 + 運費)
const totalAmount = computed(() => {
  return subtotalAmount.value + shippingFee
})

// 提交訂單
const submitOrder = async () => {
  if (!checkoutFormRef.value) return
  
  await checkoutFormRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
      
      // 模擬提交訂單
      setTimeout(() => {
        submitting.value = false
        
        const orderData = {
          id: Date.now(),
          orderNumber: generateOrderNumber(),
          items: cartItems.value,
          customerInfo: { ...checkoutForm },
          subtotal: subtotalAmount.value,
          totalAmount: totalAmount.value,
          orderTime: new Date().toISOString(),
          status: 'pending'
        }
        
        // 保存訂單到 localStorage
        saveOrderToHistory(orderData)
        
        console.log('訂單資料:', orderData)
        
        ElMessageBox.alert(
          `訂單提交成功！<br/>
          訂單編號：${generateOrderNumber()}<br/>
          總金額：NT$ ${totalAmount.value}<br/>
          付款方式：${getPaymentMethodName(checkoutForm.payment)}<br/>
          取貨門市：${checkoutForm.store}<br/>
          我們會盡快與您聯繫確認訂單詳情。`,
          '訂購成功',
          {
            dangerouslyUseHTMLString: true,
            type: 'success'
          }
        ).then(() => {
          // 清空購物車並返回首頁
          localStorage.removeItem('cartItems')
          router.push('/')
        })
      }, 2000)
    } else {
      ElMessage.error('請填寫完整的訂購資訊')
    }
  })
}

// 生成訂單編號
const generateOrderNumber = () => {
  const now = new Date()
  const timestamp = now.getTime().toString().slice(-8)
  return `MC${timestamp}`
}

// 獲取付款方式名稱
const getPaymentMethodName = (value: string) => {
  const methods: { [key: string]: string } = {
    transfer: '銀行轉帳',
    linepay: 'Line Pay'
  }
  return methods[value] || value
}

// 監聽付款方式變更
const onPaymentChange = (value: string) => {
  if (value === 'transfer') {
    ElMessageBox.alert(
      `請使用以下銀行帳戶進行轉帳：<br/><br/>
      <strong>中國信託（822）</strong><br/>
      <strong>241540155614</strong><br/><br/>
      請於轉帳後保留收據，我們會在確認收款後儘快為您處理訂單。`,
      '銀行轉帳資訊',
      {
        dangerouslyUseHTMLString: true,
        type: 'info'
      }
    )
  }
}

// 保存訂單到歷史記錄
const saveOrderToHistory = (orderData: any) => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    existingOrders.unshift(orderData) // 新訂單放在最前面
    localStorage.setItem('orderHistory', JSON.stringify(existingOrders))
  } catch (error) {
    console.error('保存訂單失敗:', error)
  }
}

// 返回上一頁
const goBack = () => {
  router.go(-1)
}

// 頁面載入時獲取購物車數據
onMounted(() => {
  // 從 localStorage 獲取購物車數據
  const savedCart = localStorage.getItem('cartItems')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
  
  // 如果購物車為空，可以從路由參數獲取
  if (cartItems.value.length === 0 && router.currentRoute.value.query.items) {
    try {
      cartItems.value = JSON.parse(router.currentRoute.value.query.items as string)
    } catch (e) {
      console.error('無法解析購物車數據')
    }
  }
})
</script>

<style scoped>
.checkout-page {
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

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #267b98;
  letter-spacing: 2px;
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

.order-summary, .checkout-form {
  margin-bottom: 20px;
}

.order-summary .el-card__header,
.checkout-form .el-card__header {
  background-color: #f8f9fa;
  border-bottom: 2px solid #267b98;
}

.order-summary h3,
.checkout-form h3 {
  color: #267b98;
  margin: 0;
  font-size: 18px;
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

.sumbitBtn {
  background-color: #567892 !important;
  border-color: #567892 !important;
  color: #fff !important;
}

.sumbitBtn:hover {
  background-color: #456073 !important;
  border-color: #456073 !important;
}

@media (max-width: 768px) {
  .container {
    padding: 0 10px;
  }
  
  .el-col {
    margin-bottom: 20px;
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
  
  .order-summary, .checkout-form {
    margin-bottom: 30px;
  }
  
  .main-content {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
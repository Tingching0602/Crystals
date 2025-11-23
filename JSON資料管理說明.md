# JSON 資料管理系統使用說明

## 📌 系統概述

已將產品資料管理從 TypeScript 檔案改為 JSON 檔案系統，這樣可以更靈活地管理產品資料。

## 🔄 資料載入流程

### 前台 (crystal.vue)
1. **優先順序**: localStorage → JSON 檔案
2. **載入邏輯**:
   - 先檢查 localStorage 是否有後台新增/編輯的資料
   - 如果沒有，從 `/public/data/` 下的 JSON 檔案載入預設資料
   - JSON 檔案作為初始資料來源

### 後台 (admin.vue)
1. 所有新增/編輯的商品都會儲存到 localStorage
2. 可以隨時匯出 JSON 檔案

## 📁 檔案結構

```
public/
  data/
    ├── crystals.json          # 設計款手串
    ├── simpleBracelets.json   # 素手串
    ├── balls.json             # 水晶球
    ├── tutles.json            # 龜龜雕刻件
    ├── ores.json              # 原礦系列
    ├── necklace.json          # 項鍊系列
    └── earrings.json          # 耳環系列

scripts/
  └── convertToJson.js         # TypeScript 轉 JSON 工具
```

## 🛠️ 使用方式

### 1. 後台管理商品

1. 登入後台（需要 Admin 帳號）
2. 選擇商品類型
3. 新增/編輯/刪除商品
4. 資料會自動儲存到 localStorage

### 2. 匯出 JSON 檔案

在後台點擊「匯出 JSON」按鈕：
- 系統會下載當前類別的所有商品資料為 JSON 檔案
- 檔案名稱會自動對應（例如：crystals.json）
- 將下載的檔案覆蓋到 `public/data/` 對應的檔案

### 3. 更新預設資料

**方法一：手動更新**
1. 在後台管理商品
2. 點擊「匯出 JSON」下載檔案
3. 將檔案放到 `public/data/` 資料夾
4. 清除 localStorage（可選，讓系統重新讀取 JSON）

**方法二：從 TypeScript 轉換**
```bash
# 如果修改了 src/model/ 下的 TS 檔案，可以重新轉換
node scripts/convertToJson.js
```

## 🔧 開發說明

### 轉換腳本
`scripts/convertToJson.js` 會：
- 讀取 `src/model/` 下的所有 TypeScript 檔案
- 轉換成純 JSON 格式
- 輸出到 `public/data/` 資料夾

### 資料優先順序
```
localStorage (後台新增/編輯) > JSON 檔案 (預設資料)
```

### 清除 localStorage
如果想要重置為 JSON 預設資料：
```javascript
// 在瀏覽器 Console 執行
localStorage.removeItem('products_crystals');
localStorage.removeItem('products_simpleBracelets');
// ... 其他類別
```

## ⚠️ 注意事項

1. **瀏覽器限制**: 前端無法直接寫入伺服器檔案，所以需要手動將匯出的 JSON 檔案放到專案中
2. **資料同步**: 後台新增的商品只存在 localStorage，如果要永久保存需要匯出 JSON
3. **版本控制**: 建議定期將 `public/data/*.json` 提交到 Git，保存預設資料
4. **清除快取**: 如果更新了 JSON 檔案但看不到變化，可以清除瀏覽器快取或 localStorage

## 🎯 工作流程建議

### 日常商品管理
1. 使用後台新增/編輯商品（存在 localStorage）
2. 客戶看到的是最新資料

### 永久保存資料
1. 定期點擊「匯出 JSON」
2. 將檔案覆蓋到 `public/data/` 資料夾
3. 提交到 Git

### 重置資料
1. 刪除對應的 localStorage 項目
2. 重新整理頁面
3. 系統會從 JSON 檔案載入

## 🚀 優點

✅ **靈活性**: JSON 比 TypeScript 更容易編輯
✅ **資料分離**: 資料和程式碼分離，更易維護
✅ **備份方便**: 可以輕鬆匯出/匯入資料
✅ **即時更新**: 後台修改立即生效（透過 localStorage）
✅ **預設值**: JSON 檔案作為系統預設資料

## 📝 範例：新增商品流程

1. 登入後台 → 選擇「設計款手串」
2. 點擊「新增商品」
3. 填寫商品資訊
4. 儲存（自動存到 localStorage）
5. 前台立即可看到新商品
6. （可選）點擊「匯出 JSON」保存為檔案
7. （可選）將 JSON 檔案放到 `public/data/crystals.json`

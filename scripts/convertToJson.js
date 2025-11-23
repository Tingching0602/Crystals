// 將 TypeScript model 檔案轉換成 JSON 的腳本
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 要轉換的檔案清單
const models = [
  { tsFile: 'crystals.ts', jsonFile: 'crystals.json' },
  { tsFile: 'simpleBracelets.ts', jsonFile: 'simpleBracelets.json' },
  { tsFile: 'balls.ts', jsonFile: 'balls.json' },
  { tsFile: 'tutles.ts', jsonFile: 'tutles.json' },
  { tsFile: 'ores.ts', jsonFile: 'ores.json' },
  { tsFile: 'necklace.ts', jsonFile: 'necklace.json' },
  { tsFile: 'earrings.ts', jsonFile: 'earrings.json' }
];

const modelDir = path.join(__dirname, '../src/model');
const dataDir = path.join(__dirname, '../public/data');

// 確保 data 目錄存在
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

models.forEach(({ tsFile, jsonFile }) => {
  try {
    const tsPath = path.join(modelDir, tsFile);
    const jsonPath = path.join(dataDir, jsonFile);
    
    if (!fs.existsSync(tsPath)) {
      console.log(`⚠️  檔案不存在: ${tsFile}`);
      return;
    }

    // 讀取 TypeScript 檔案
    let content = fs.readFileSync(tsPath, 'utf8');
    
    // 移除 export default 和變數宣告，只保留陣列內容
    content = content.replace(/^const\s+\w+\s*=\s*/m, '');
    content = content.replace(/^export\s+default\s+/m, ''); // 處理 export default [ 的情況
    content = content.replace(/export\s+default\s+\w+;?\s*$/m, '');
    
    // 移除尾部的分號和空白
    content = content.trim().replace(/;?\s*$/, '');
    
    // 嘗試解析為 JSON（使用 eval 來處理 JavaScript 物件字面值）
    // 注意：這只在受控環境下安全
    let data;
    try {
      // 使用 Function 來安全地解析
      data = new Function(`return ${content}`)();
    } catch (e) {
      console.error(`❌ 解析 ${tsFile} 失敗:`, e.message);
      return;
    }
    
    // 寫入 JSON 檔案（確保使用 UTF-8 編碼且不轉義 Unicode）
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, jsonString, { encoding: 'utf8' });
    console.log(`✅ 已轉換: ${tsFile} -> ${jsonFile} (${data.length} 個項目)`);
    
    
  } catch (error) {
    console.error(`❌ 處理 ${tsFile} 時發生錯誤:`, error.message);
  }
});

console.log('\n🎉 轉換完成！');

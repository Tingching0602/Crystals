// 商品資料管理工具
// 用於從 localStorage 或原始 model 獲取商品資料

export const getProducts = async (category: string) => {
  const storageKey = `products_${category}`;
  const savedProducts = localStorage.getItem(storageKey);
  
  if (savedProducts) {
    // 如果 localStorage 有資料，優先使用
    return JSON.parse(savedProducts);
  } else {
    // 否則從原始 model 載入
    return await loadFromModel(category);
  }
};

const loadFromModel = async (category: string) => {
  try {
    let modelData: any[] = [];
    
    switch (category) {
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
    
    return modelData;
  } catch (error) {
    console.error('載入商品資料失敗:', error);
    return [];
  }
};

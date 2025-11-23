/**
 * 圖片載入優化工具
 */

/**
 * 預加載重要圖片
 * @param urls 圖片 URL 陣列
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  
  return Promise.all(promises);
}

/**
 * 為圖片元素添加載入完成的類名
 * 用於配合 CSS 淡入效果
 */
export function setupImageLoadEffect(): void {
  // 使用 IntersectionObserver 監聽圖片進入視口
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.complete) {
            img.classList.add('loaded');
          } else {
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });
          }
          imageObserver.unobserve(img);
        }
      });
    });

    // 監聽所有 lazy loading 圖片
    const observeImages = () => {
      document.querySelectorAll('img[loading="lazy"]:not(.observed)').forEach((img) => {
        img.classList.add('observed');
        imageObserver.observe(img);
      });
    };

    // 初始監聽
    observeImages();

    // 使用 MutationObserver 監聽 DOM 變化，處理動態新增的圖片
    const mutationObserver = new MutationObserver(() => {
      observeImages();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

/**
 * 生成縮圖 URL (針對 imgur)
 * @param url 原始圖片 URL
 * @param size 縮圖尺寸 (s=小, m=中, l=大)
 */
export function getImgurThumbnail(url: string, size: 's' | 'm' | 'l' = 'm'): string {
  if (!url.includes('imgur.com')) return url;
  
  // imgur 縮圖格式: https://i.imgur.com/xxxxx{size}.jpg
  const match = url.match(/(.+\/)([^/]+)(\.\w+)$/);
  if (match) {
    return `${match[1]}${match[2]}${size}${match[3]}`;
  }
  return url;
}

/**
 * 圖片載入錯誤處理 - 使用佔位圖
 * @param event 錯誤事件
 */
export function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  // 使用簡單的 SVG 佔位圖
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18"%3E圖片載入失敗%3C/text%3E%3C/svg%3E';
  img.alt = '圖片載入失敗';
}

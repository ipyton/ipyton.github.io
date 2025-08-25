# Noah's Portfolio - 國際化版本

這是一個支持中英文雙語的個人作品集網站，使用 Next.js 和 React 構建。

## 功能特色

- 🌍 **雙語支持**: 支持英文和繁體中文
- 🎨 **現代設計**: 使用 Tailwind CSS 的響應式設計
- 🎵 **音樂播放器**: 內建背景音樂播放功能
- 📱 **響應式**: 完美適配桌面和移動設備
- 🚀 **性能優化**: 使用 Next.js 13+ App Router

## 國際化系統

### 語言切換

網站右上角有一個語言切換器，點擊即可在中英文之間切換：
- 🇺🇸 English (英文)
- 🇨🇳 中文 (简体中文)

### 語言配置

所有翻譯文本都存放在 `src/app/i18n/languages.js` 文件中，包含：

- 導航欄 (Navigation)
- 英雄區段 (Hero Section)
- 關於我 (About)
- 技能 (Skills)
- 專案 (Projects)
- 聯絡表單 (Contact Form)
- 音樂播放器 (Music Player)
- 圖片輪播 (Image Carousel)

### 添加新語言

要添加新語言，請在 `languages.js` 中添加新的語言對象：

```javascript
export const languages = {
  en: { /* 英文翻譯 */ },
  zh: { /* 中文翻譯 */ },
  ja: { /* 日文翻譯 */ } // 新增語言
};
```

### 在組件中使用

```javascript
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('section.title')}</h1>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => changeLanguage('zh')}>
        Switch to Chinese
      </button>
    </div>
  );
};
```

## 技術架構

- **框架**: Next.js 13+ (App Router)
- **UI 庫**: React 18
- **樣式**: Tailwind CSS
- **圖標**: Lucide React
- **狀態管理**: React Context + Hooks
- **國際化**: 自定義 i18n 系統

## 文件結構

```
src/
├── app/
│   ├── components/          # React 組件
│   ├── contexts/           # React Context
│   ├── i18n/              # 國際化配置
│   ├── layout.js          # 根佈局
│   └── page.js            # 主頁面
├── styles/                 # 全局樣式
└── public/                 # 靜態資源
```

## 本地開發

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發服務器：
```bash
npm run dev
```

3. 打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 部署

網站可以部署到任何支持 Next.js 的平台：

- Vercel (推薦)
- Netlify
- AWS Amplify
- 自定義服務器

## 自定義

### 修改翻譯

編輯 `src/app/i18n/languages.js` 文件來修改或添加翻譯。

### 修改樣式

使用 Tailwind CSS 類名來修改組件樣式，或編輯 `src/styles/globals.css`。

### 添加新組件

1. 在 `src/app/components/` 創建新組件
2. 在 `src/app/page.js` 中導入並使用
3. 如果需要國際化，使用 `useLanguage` hook

## 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個項目！

## 授權

MIT License

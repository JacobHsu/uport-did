# [學習 Redux-Saga 的起手式](https://medium.com/itsoktomakemistakes/學習-redux-saga-的起手式-db4fd3a4dbce)

在 redux 的世界裡，所有會發生的事情都要透過 action 來描述，而 action 是 function 返回一個 action物件 (object)，並把這個物件 dispatch 到 reducer 做對應 action type 的處理，在存進 store 中，如果 store 的資料有變化，會透過 connect 通知 UI 做改變。

Redux-Thunk 的困境

如果你在學習 Redux 應該會學到「業務邏輯」都放在 `reducer` ，但 `redux-thunk` thunk action 把邏輯放在了 `action`
`redux-saga` 把 acttion回到 Redux 最根本的概念「 action 返回 action 物件」

那原本相依在 action 上的事件該去哪 ?  
saga 檔案的核心出發點就是監聽 action 的監聽 function 。  
(在 Redux-saga 中， action 只負責送 type 跟參數，不會有其他邏輯。)

saga 核心是監聽 function ，所以我們把 watch function export 出去，你可以注意到我們用的是 `function*` ，這是迭代器 (generator function) 的寫法，使用到迭代 (`yield`) 的概念，讓我們的 JavaScript 的 function 執行可以有「暫停」的能力。

Redux界的非同步救星
Redux-Saga 在 Redux 中是以 Middleware （中間件）存在的
原本被 dispatch 觸發的 Method 從 Reducer 變成 Redux-Saga
換句話說 Redux-Saga 成為 Component 及 Reducer 之間溝通的橋樑。

## connected-react-router

[將 redux 與 react-router 深度整合](https://juejin.im/post/5b4de4496fb9a04fc226a7af)

有時候我們可能希望將 redux 與 react router 進行更深度的整合，實現：

* 將 router 的數據與 store 同步，並且從 store 訪問
* 通過 dispatch actions 導航

通過 connected-react-router 和 history 兩個庫將 react-router 與 redux 進行深度整合實現。

`$ yarn add connected-react-router`

react-router react-router-dom

`$ yarn add redux react-redux`

## shared\elements.js

`yarn add styled-components shortid react-i18next i18next i18next-browser-languagedetector`

## module.hot

site\src\index.js  
[模块热替换](http://webpack.docschina.org/api/hot-module-replacement/)  

> React Hook "useTranslation" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?  react-hooks/rules-of-hooks

###　src\components\App.js

npm [qs](https://www.npmjs.com/package/qs) 是一個增加了一些安全性的查詢字符串解析和序列化字符串的庫。

## References

[淺入淺出 Generator Function](https://denny.qollie.com/2016/05/08/es6-generator-func/)
generator function 特別的地方就是它可以被暫停，等到下次進來時再繼續呼叫它。
[什麼是 Polyfills？](https://medium.com/@tsoen/什麼是-polyfills-89f98f45caf5)
Mozilla 把這個名詞翻譯成「自動補完函式庫」，也差不多就是這麼回事。
> polyfill 是小段程式碼，用各種技術來幫忙各個舊的瀏覽器，補完新的 API，讓你使用起來沒有落差
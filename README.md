# Expense-tracker

這是一個由 Node.js 和 Express 建立的記賬網站。

## 主要功能

- 瀏覽所有消費記錄
- 新增/刪除消費
- 所有消費記錄按照日期排序(最新的紀錄在最上面)
- 依照月份/類別篩選出消費記錄

![demo gif](https://github.com/Ashley-Hung/expense-tracker/blob/master/demo.gif)



## 建置環境

- [Node.js](https://nodejs.org/en/)：14.16.1
- [Express](https://www.npmjs.com/package/express)：4.17.1
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)：5.3.2
- [express-validator](https://www.npmjs.com/package/express-validator)：6.11.1
- [body-parser](https://www.npmjs.com/package/body-parser)： 1.19.0
- [mongoose](https://www.npmjs.com/package/mongoose)：5.12.8
- [mongoDB](https://www.mongodb.com/try/download/community)：4.2.13

👉 Try it on [Heroku](https://secret-anchorage-17903.herokuapp.com/)

## 安裝與執行

1. clone 此專案至本機電腦

   ```
   $ git clone https://github.com/Ashley-Hung/expense-tracker.git
   ```

2. 安裝

   ```
   $ cd expense-tracker
   $ npm install
   ```

3. 執行

   ```
   $ npm run seed
   $ npm run dev
   ```

4. 執行成功後，Terminal 會顯示下列訊息

   ```
   Express is listening on localhost:3000
   ```

5. 使用下列 URL 於瀏覽器上進行瀏覽

   ```
   http://localhost:3000
   ```




## 開發者

Ashley-Hung




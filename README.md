# Expense-tracker

這是一個由 Node.js 和 Express 建立的記賬網站。

## 主要功能

- 瀏覽所有消費記錄
- 新增/刪除/修改消費記錄
- 所有消費記錄按照日期排序(最新的紀錄在最上面)
- 依照月份/類別篩選出消費記錄
- 可以使用個人的 email 或 Facebook 註冊帳號並登入
- 設定功能(開發中)

👉 Try it on [Heroku](https://secret-anchorage-17903.herokuapp.com/)

試用帳號：

| Name |      Email       | Password |
| :--: | :--------------: | :------: |
| root | root@example.com | 12345678 |



![demo gif](https://github.com/Ashley-Hung/expense-tracker_V2/blob/main/demo.gif)



## 建置環境

- [Node.js](https://nodejs.org/en/)：14.16.1
- [Express](https://www.npmjs.com/package/express)：4.17.1
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)：5.3.2
- [express-session](https://www.npmjs.com/package/express-session)：1.17.2
- [body-parser](https://www.npmjs.com/package/body-parser)： 1.19.0
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)：2.4.3
- [connect-flash](https://www.npmjs.com/package/connect-flash)：0.1.1
- [dotenv](https://www.npmjs.com/package/dotenv)：10.0.0
- [mongoose](https://www.npmjs.com/package/mongoose)：5.12.8
- [mongoDB](https://www.mongodb.com/try/download/community)：4.2.13
- [method-override](https://www.npmjs.com/package/method-override)：3.0.0
- [passport](https://www.npmjs.com/package/passport)：0.4.1
- [passport-facebook](https://www.npmjs.com/package/passport-facebook)：3.0.0
- [passport-local](https://www.npmjs.com/package/passport-local)：1.0.0
- [ajv](https://www.npmjs.com/package/ajv)：8.5.0
- [ajv-errors](https://www.npmjs.com/package/ajv-errors)：3.0.0
- [ajv-formats](https://www.npmjs.com/package/ajv-formats)：2.1.0

## 安裝與執行

1. clone 此專案至本機電腦

   ```
   $ git clone https://github.com/Ashley-Hung/expense-tracker_V2.git
   ```

2. 安裝

   ```
   $ cd expense-tracker_V2
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




require("dotenv").config({path: './.env'}); //プロジェクト直下においた環境変数ファイルを読み込む
module.exports = {
    env: {
    X_API_KEY: process.env.API_KEY,
    ENDPOINT: process.env.ENDPOINT
  }
};
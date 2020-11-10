import fetch from 'node-fetch'

export async function getSortedPostsData() {
  // ファイルシステムのかわりに、
  // 外部の API エンドポイントから投稿データを取得する
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const res = await fetch(process.env.ENDPOINT + '/blogs', key);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
}
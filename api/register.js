export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, no } = req.body;

  // アスメルの登録用URL（あなたのシナリオ番号を含む）
  const asumeruUrl = `https://moushikomi.jp/twm/entry.php?no=${no}`;

  try {
    // アスメルにデータを送信
    const response = await fetch(asumeruUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        touroku_mail: email,
        encoding: 'utf-8'
      }),
    });

    // アスメル側が正常に受け取ったか確認
    if (response.ok) {
      return res.status(200).json({ status: 'success' });
    } else {
      return res.status(500).json({ status: 'error' });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ status: 'error' });
  }
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { endpoint } = req.query;
    if (!endpoint) {
        return res.status(400).json({ error: 'Thiếu endpoint' });
    }

    const targetUrl = `https://contract.mexc.com/api/v1${endpoint}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Lỗi máy chủ' });
    }
}

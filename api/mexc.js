export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { endpoint, ...queryParams } = req.query;
    if (!endpoint) {
        return res.status(400).json({ error: 'Thiếu endpoint' });
    }

    // Nối lại toàn bộ tham số (interval, start, end) vào URL gửi cho MEXC
    const urlObj = new URL(`https://contract.mexc.com/api/v1${endpoint}`);
    Object.entries(queryParams).forEach(([key, value]) => {
        urlObj.searchParams.append(key, value);
    });

    try {
        const response = await fetch(urlObj.toString());
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi fetch MEXC:", error);
        res.status(500).json({ success: false, error: 'Lỗi máy chủ' });
    }
}

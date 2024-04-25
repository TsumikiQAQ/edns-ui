const express = require('express');
const { NodeClient } = require('hs-client');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors());

// 配置客户端连接到 Handshake 节点
const client = new NodeClient({
  network: 'main',
  host: '192.168.0.55',
  port: 12037,
  apiKey: 'uVMMlDLHyBY+sCOegIwkfPxtMBx3wkv5cDcC/IRHkJk='
});
// API 路由
app.get('/api/info', async (req, res) => {
  try {
    const info = await client.getInfo();
    res.json(info);
  } catch (error) {
    res.status(500).send('Error accessing Handshake node');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

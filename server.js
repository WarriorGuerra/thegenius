import express from 'express'
import { payment } from './index.js'
const app = express();
const PORT = 1000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/payment', async (req, res) => {
    const paymentUrl = await payment()
    res.send(paymentUrl)
})
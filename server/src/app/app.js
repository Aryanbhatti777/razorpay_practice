import express from 'express'
import paymentRouter from '../routes/payments.routes.js';

const app = express();

app.use(express.json());
app.use("/api/payments", paymentRouter)

export default app;
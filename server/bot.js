const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Replace 'YOUR_BOT_TOKEN' and 'YOUR_PAYMENT_PROVIDER_TOKEN' with your actual tokens
const BOT_TOKEN = '7299726784:AAHQ6He-E7PwZrT_dOiCb6rcBkfEPQnYNl8';
const PAYMENT_PROVIDER_TOKEN = 'YOUR_PAYMENT_PROVIDER_TOKEN';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();

app.use(bodyParser.json());

// Start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const title = "Payment Title";
  const description = "Payment Description";
  const payload = "Custom-Payload";  // Unique payload for the payment
  const currency = "USD";
  const prices = [{ label: "Test Product", amount: 5000 }];  // Price in smallest unit (e.g., cents)

  bot.sendInvoice(chatId, title, description, payload, PAYMENT_PROVIDER_TOKEN, currency, prices, {
    need_name: true,
    need_phone_number: false,
    need_email: false,
    need_shipping_address: false
  });
});

// Pre-checkout query handler
bot.on('pre_checkout_query', (query) => {
  if (query.invoice_payload !== 'Custom-Payload') {
    bot.answerPreCheckoutQuery(query.id, false, 'Something went wrong...');
  } else {
    bot.answerPreCheckoutQuery(query.id, true);
  }
});

// Successful payment handler
bot.on('successful_payment', (msg) => {
  bot.sendMessage(msg.chat.id, "Thank you for your payment!");
});

// Express server setup for webhook (if needed)
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Uncomment the following lines to set up webhook (if needed)
// const URL = 'YOUR_PUBLIC_URL';
// bot.setWebHook(`${URL}/webhook/${BOT_TOKEN}`);


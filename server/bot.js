const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

// Replace 'YOUR_BOT_TOKEN' and 'YOUR_PAYMENT_PROVIDER_TOKEN' with your actual tokens
const BOT_TOKEN = '7299726784:AAHQ6He-E7PwZrT_dOiCb6rcBkfEPQnYNl8';
const PAYMENT_PROVIDER_TOKEN = 'YOUR_PAYMENT_PROVIDER_TOKEN';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')  // Path where images will be stored
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Load product data
function loadProducts() {
  try {
    return JSON.parse(fs.readFileSync('products.json', 'utf8'));
  } catch (err) {
    console.error('Error reading products.json:', err);
    return { products: [] };
  }
}

let products = loadProducts();

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

// Handle /addimage command for uploading image
bot.onText(/\/addimage (.+)/, (msg, match) => {
  const productId = match[1]; // Extract product ID from command

  bot.sendMessage(msg.chat.id, 'Please upload an image...').then(sent => {
    const chatId = sent.chat.id;
    bot.once('photo', async (photoMsg) => {
      const fileId = photoMsg.photo[photoMsg.photo.length - 1].file_id;
      const fileLink = await bot.getFileLink(fileId);

      // Example: Save fileLink to product with productId in your database or JSON file
      // Update your product data storage logic accordingly

      bot.sendMessage(chatId, `Image added for product ID ${productId}.`);
    });
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

app.get('/api/products', (req, res) => {
  console.log('getting products', products);
  res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Uncomment the following lines to set up webhook (if needed)
// const URL = 'YOUR_PUBLIC_URL';
// bot.setWebHook(`${URL}/webhook/${BOT_TOKEN}`);


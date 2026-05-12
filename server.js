// Простой бот для поиска фильмов
const TelegramBot = require('node-telegram-bot-api');

// Вставь свой токен от BotFather
const TOKEN = '8613595292:AAFbAWXWWbaT1qmVseRoF0sl5c-Qum6Mpc0';
const WEBAPP_URL = 'https://satanicc.github.io/movie-bot/';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    '🎬 *MovieHub* — твой онлайн-кинотеатр в Telegram!\n\n' +
    '• Нажми кнопку ниже, чтобы открыть каталог\n' +
    '• Используй inline-режим: введи `@MovieHubMiniBot Название`',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '🎬 Открыть каталог', web_app: { url: WEBAPP_URL } }
        ]]
      }
    }
  );
});

// Inline-поиск
bot.on('inline_query', async (query) => {
  const searchTerm = query.query.toLowerCase();
  
  // Заглушка (потом подключим TMDB API)
  const movies = [
    { title: 'Дюна 3', year: '2026', rating: '8.9' },
    { title: 'Аватар 3', year: '2026', rating: '8.2' },
    { title: 'Бэтмен 2', year: '2026', rating: '8.8' },
  ].filter(m => m.title.toLowerCase().includes(searchTerm));
  
  const results = movies.map(m => ({
    type: 'article',
    id: m.title,
    title: m.title,
    description: `⭐ ${m.rating} • ${m.year}`,
    thumb_url: 'https://via.placeholder.com/48',
    input_message_content: {
      message_text: `🎬 *${m.title}*\n⭐ ${m.rating}/10 • ${m.year}\n\n[▶ Смотреть в приложении](${WEBAPP_URL})`,
      parse_mode: 'Markdown'
    }
  }));
  
  bot.answerInlineQuery(query.id, results, { cache_time: 0 });
});

console.log('Бот запущен!');
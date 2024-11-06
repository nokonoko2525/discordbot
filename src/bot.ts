import { Client, GatewayIntentBits, Message } from 'discord.js';
import 'dotenv/config';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message: Message) => {
  // ボットが自分自身に返信しないようにする
  if (message.author.bot) return;

  // 特定のメッセージに返信
  if (message.content.toLowerCase() === 'こんにちは') {
    message.reply('こんにちは！');
  }
});

client.login(process.env.DISCORD_TOKEN);

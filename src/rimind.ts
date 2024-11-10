import { Client, GatewayIntentBits, Message, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message) => {
  // Bot自身のメッセージには反応しない
  if (message.author.bot) return;

  // メンションされたユーザーを取得
  const mentionedUser = message.mentions.users.first();
  
  if (mentionedUser) {
    // チャンネルがテキストチャンネルかどうかを確認
    if (message.channel instanceof TextChannel) {
      try {
        // ボタンを作成
        const button = new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('確認しました！')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('👍'); // ここには絵文字IDを入れてください

        // ボタンを含むアクション行を作成
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

        // メンションされたユーザーにリプライとしてメッセージとボタンを送信
        await message.channel.send({
          content: `${mentionedUser.username}さん、メッセージを確認してください!`,
          components: [row],
        });
      } catch (error) {
        console.error('Failed to send message to the mentioned user:', error);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

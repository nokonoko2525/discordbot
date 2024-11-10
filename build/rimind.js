"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent] });
client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});
client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    const mentionedUser = message.mentions.users.first();
    if (mentionedUser) {
        if (message.channel instanceof discord_js_1.TextChannel) {
            try {
                const button = new discord_js_1.ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('確認しました！')
                    .setStyle(discord_js_1.ButtonStyle.Primary)
                    .setEmoji('👍');
                const row = new discord_js_1.ActionRowBuilder().addComponents(button);
                await message.channel.send({
                    content: `${mentionedUser.username}さん、メッセージを確認してください!`,
                    components: [row],
                });
            }
            catch (error) {
                console.error('Failed to send message to the mentioned user:', error);
            }
        }
    }
});
client.login(process.env.DISCORD_TOKEN);

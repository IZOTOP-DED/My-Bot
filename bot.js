const fetch = require('node-fetch');
const Discord = require('discord.js');
const bot = new Discord.Client();
const translate = require('@vitalets/google-translate-api');
const translateMap = {
    '641019353831178240': 'ru',
    '816220439584047104': 'fr',
    '816220705796128799': 'it',
    '816220863409029151': 'de',
    '817160538294321232': 'en',
    '817368521653616671': 'es',
}
bot.on('ready', () => {
    console.log(`Запустился бот ${bot.user.username}!`);
  });
bot.on('message', (message) => {
    if(message.author.bot) return
    if(['641019353831178240', '816220439584047104', '816220705796128799', '816220863409029151', '817160538294321232', '817368521653616671'].includes(message.channel.id)) {
        [{id: '641019353831178240', lang: 'ru'}, {id: '816220439584047104', lang: 'fr'}, {id: '816220705796128799', lang: 'it'}, {id: '816220863409029151', lang: 'de'}, {id: '817160538294321232', lang: 'en'}, {id: '817368521653616671', lang: 'es'}].forEach(i => {
            if(i.id == message.channel.id) return;
            translate(message.content, {from: translateMap[message.channel.id], to: i.lang}).then(res => {
                bot.channels.cache.get(i.id).fetchWebhooks().then((item) => {
                    item.random().send(res.text, {
                            username: message.member.nickname ?? message.author.username,
                            avatarURL: message.author.displayAvatarURL(),
                            ...(!!message.attachments && {files: message.attachments.array().map(att => {attachment: att.url, name: })})
                    })
                })        
            })
        })
        
    }
})
bot.login(process.env.BOT_TOKEN);

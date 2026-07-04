import db from "#db"

export default {
  command: ['balance', 'bal'],
  category: 'rpg',
  run: async ({ msg, sock, args, command, text, usedPrefix: prefix }) => {
    const chatId = msg.chat
    const chatData = await db.getChat(msg.chat)
    const botId = sock.user.id.split(':')[0] + "@s.whatsapp.net"
    const botSettings = await db.getSettings(botId)
    const monedas = botSettings.currency

    if (chatData.adminonly || !chatData.rpg)
      return msg.reply(mess.comandooff)

    const mentioned = msg.mentionedJid
    const who = mentioned.length > 0 ? mentioned[0] : (msg.quoted ? msg.quoted.sender : msg.sender)

    const user = await db.getChatUser(msg.chat, who)
    const user2 = await db.getUser(who)
    if (!user)
      return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ El usuario mencionado no está registrado en el bot.
◈──────────────◈
"La ilusión domina la realidad…"`)

    const total = (user.coins || 0) + (user.bank || 0)

    const bal =
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✦ Balance de › *\`${user2.name}\`*
◈──────────────◈
✐ Monedas › *\`¥${user.coins?.toLocaleString() || 0}\`*
❀ Banco › *\`¥${user.bank?.toLocaleString() || 0}\`*
✦ Total › *\`¥${total.toLocaleString()}\`*
◈──────────────◈
"Protege tus \`${monedas}\` depositándolos en el banco con \`${prefix}dep\`"`

    await sock.reply(msg.chat, bal, msg)
  }
};
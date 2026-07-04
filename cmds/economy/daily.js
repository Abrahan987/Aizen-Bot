import db from "#db"
export default {
  command: ['daily'],
  category: 'rpg',
  run: async ({ msg, sock }) => {
    const chat = await db.getChat(msg.chat)
    const user = await db.getChatUser(msg.chat, msg.sender)
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const botSettings = await db.getSettings(botId)
    const monedas = botSettings.currency

    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const twoDays = oneDay * 2

    if (chat.adminonly || !chat.rpg)
      return msg.reply(mess.comandooff)

    const timeSinceLast = now - user.lastDaily

    if (timeSinceLast < oneDay) {
      const restante = formatRemainingTime(oneDay - timeSinceLast)
      return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Ya has reclamado tu *Daily* de hoy.
» Podrás reclamarlo de nuevo en *\`${restante}\`*
◈──────────────◈
"La ilusión domina la realidad…"`)
    }

    if (timeSinceLast > twoDays) {
      const perdioRacha = user.dailyStreak >= 10
      user.dailyStreak = 1
      user.lastDaily = now

      await db.updateChatUser(msg.chat, msg.sender, 'dailyStreak', user.dailyStreak)
      await db.updateChatUser(msg.chat, msg.sender, 'lastDaily', user.lastDaily)

      const recompensa = calcularRecompensa(user.dailyStreak)
      const siguiente = calcularRecompensa(user.dailyStreak + 1)
      user.coins += recompensa

      await db.updateChatUser(msg.chat, msg.sender, 'coins', user.coins)

      return sock.reply(msg.chat,
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✦ Has reclamado tu recompensa diaria de *\`¥${recompensa.toLocaleString()} ${monedas}\`* (Día *\`1\`*)
» Día *\`2\`* › *\`¥${siguiente.toLocaleString()}\`*
${perdioRacha ? `» ☆ ¡Has perdido tu racha de días!` : ''}
◈──────────────◈
"Todo ocurre según mi voluntad…"`, msg)
    }

    user.dailyStreak += 1
    user.lastDaily = now

    await db.updateChatUser(msg.chat, msg.sender, 'dailyStreak', user.dailyStreak)
    await db.updateChatUser(msg.chat, msg.sender, 'lastDaily', user.lastDaily)

    const recompensa = calcularRecompensa(user.dailyStreak)
    const siguiente = calcularRecompensa(user.dailyStreak + 1)
    user.coins += recompensa

    await db.updateChatUser(msg.chat, msg.sender, 'coins', user.coins)

    const rachaExtra = user.dailyStreak >= 10
      ? `» ☆ ¡Racha de *\`${user.dailyStreak}\`* días, ¡Sigue así!`
      : ''

    await sock.reply(msg.chat,
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✦ Has reclamado tu recompensa diaria de *\`¥${recompensa.toLocaleString()} ${monedas}\`* (Día *\`${user.dailyStreak}\`*)
» Día *\`${user.dailyStreak + 1}\`* › *\`¥${siguiente.toLocaleString()}\`*
${rachaExtra}
◈──────────────◈
"El poder verdadero es la traición…"`, msg, true)
  }
};

function calcularRecompensa(dia) {
  const base = 10000
  const incremento = 5000
  const maximo = 100000
  const recompensa = base + (dia - 1) * incremento
  return Math.min(recompensa, maximo)
}

function formatRemainingTime(ms) {
  const s = Math.floor(ms / 1000)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const seg = s % 60
  const partes = []
  if (h) partes.push(`${h} ${h === 1 ? 'hora' : 'horas'}`)
  if (m) partes.push(`${m} ${m === 1 ? 'minuto' : 'minutos'}`)
  if (seg || partes.length === 0) partes.push(`${seg} ${seg === 1 ? 'segundo' : 'segundos'}`)
  return partes.join(' ')
}
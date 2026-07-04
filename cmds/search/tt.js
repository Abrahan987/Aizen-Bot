import db from "#db"
import fetch from 'node-fetch';

export default {
  command: ['tiktoksearch', 'ttsearch', 'tts'],
  category: 'search',
  run: async ({ msg, sock, args }) => {
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const botSettings = await db.getSettings(botId)

    if (!args || !args.length) {
      return sock.reply(
        msg.chat,
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Ingresa un término de búsqueda.
◈──────────────◈
"La ilusión domina la realidad…"`,
        msg,
      )
    }

    const query = args.join(' ')
    const url = `${api.url}/search/tiktok?query=${query}&key=${api.key}`

    try {
      const res = await fetch(url)
      const json = await res.json()

      if (!json || !json.data || !json.data.length) {
        return sock.reply(
          msg.chat,
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No se encontraron resultados para: *${query}*
◈──────────────◈
"Todo ocurre según mi voluntad…"`,
          msg
        )
      }

      let message = `❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Resultados de búsqueda en TikTok
◈──────────────◈
"El poder verdadero es la traición…"\n\n`

      json.data.forEach((result, index) => {
        message += `✦ Título › *${result.title}*

❀ Autor › ${result.author.nickname} (@${result.author.unique_id})
◈ Reproducciones › ${result.stats.views}
✦ Comentarios › ${result.stats.comments}
❀ Compartidos › ${result.stats.shares}
◈ Me gusta › ${result.stats.likes}
✦ Descargas › ${result.stats.downloads}
❀ Duración › ${result.duration}
◈ URL › https://www.tiktok.com/@${result.author.unique_id}/video/${result.id}

${index < json.data.length - 1 ? '◈──────────────◈' : ''}
        `
      })
      await msg.reply(message)
    } catch (e) {
      await msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Error al procesar la búsqueda en TikTok.
◈──────────────◈
"Todo ocurre según mi voluntad…"`)
    }
  },
};
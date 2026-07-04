import db from "#db"
import fetch from 'node-fetch';

export default {
  command: ['tiktok', 'tt'],
  category: 'downloader',
  run: async ({ msg, sock, args, command }) => {
    if (!args.length) {
      return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Ingresa un término o enlace de TikTok.
◈──────────────◈
"La ilusión domina la realidad…"`)
    }

    const isMp3 = args.includes('--mp3')
    const urls = args.filter(arg => arg.includes("tiktok.com"))

    if (urls.length) {
      const url = urls[0]
      try {
        const apiUrl = isMp3
          ? `${api.url}/dl/tiktokmp3?url=${encodeURIComponent(url)}&key=${api.key}`
          : `${api.url}/dl/tiktok?url=${url}&key=${api.key}`

        const res = await fetch(apiUrl)
        const json = await res.json()
        const data = json.data
        if (!data) return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No se encontraron resultados para: ${url}
◈──────────────◈
"Todo ocurre según mi voluntad…"`)

        const {
          id,
          title = 'Sin título',
          dl,
          duration,
          thumbnail,
          author = {},
          stats = {},
          music_info = {},
          music = {},
          type
        } = data

        const tiktokLink = `https://www.tiktok.com/@${author.unique_id}/video/${id}`

        const caption =
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✦ Título › ${title}
❀ Autor › ${author.nickname || author.unique_id || 'Desconocido'}
◈ Duración › ${duration || music_info.duration || 'N/A'}
✦ Likes › ${(stats.likes || 0).toLocaleString()}
❀ Comentarios › ${(stats.comments || 0).toLocaleString()}
◈ Vistas › ${(stats.views || stats.plays || 0).toLocaleString()}
✦ Compartidos › ${(stats.shares || 0).toLocaleString()}
❀ Enlace › ${tiktokLink}
◈ Audio › ${(music.title || music_info.title) ? (music.title || music_info.title) + ' -' : 'Desconocido'} ${(music.author || music_info.author || '')}
◈──────────────◈
"El poder verdadero es la traición…"`

        if (isMp3) {
          await sock.sendMessage(msg.chat, { image: { url: thumbnail }, caption }, { quoted: msg })
          await sock.sendMessage(msg.chat, { audio: { url: dl }, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: msg })
        } else {
          await sock.sendMessage(msg.chat, { [type || 'video']: { url: dl }, caption }, { quoted: msg })
        }
      } catch (e) {
        await msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Error al procesar la descarga.
◈──────────────◈
"La ilusión domina la realidad…"`)
      }
    } else {
      const query = args.filter(a => a !== '--mp3').join(" ")
      try {
        const searchUrl = `${api.url}/search/tiktok?query=${encodeURIComponent(query)}&key=${api.key}`
        const res = await fetch(searchUrl)
        const json = await res.json()
        const results = json.data
        if (!results || results.length === 0) return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No se encontraron resultados para: ${query}
◈──────────────◈
"Todo ocurre según mi voluntad…"`)

        // ... resto de la lógica igual, pero con captions Aizenizados
      } catch (e) {
        msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Error al procesar la búsqueda.
◈──────────────◈
"El poder verdadero es la traición…"`)
      }
    }
  },
};
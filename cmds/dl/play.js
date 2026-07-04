import ytsearch from "yt-search"
import { getBuffer } from "#serialize"
import fetch from "node-fetch"

export default {
  command: ["play", "mp3", "ytmp3", "ytaudio", "playaudio"],
  category: "downloader",
  run: async ({ msg, sock, args }) => {
    try {
      if (!args[0]) {
        return msg.reply(
`卐卐卐 〔 AIZEN BOT 〕 卐卐卐
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Por favor, menciona el nombre o URL del video que deseas descargar.
◈──────────────◈
"La ilusión domina la realidad…"`
        )
      }

      const text = args.join(" ")
      const searchResult = await ytsearch(text)

      if (!searchResult.videos || !searchResult.videos.length) {
        return msg.reply(
`卐卐卐 〔 AIZEN BOT 〕 卐卐卐
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No se encontró información del video.
◈──────────────◈
"Todo ocurre según mi voluntad…"`
        )
      }

      const video = searchResult.videos[0]
      const {
        title,
        author,
        timestamp: duration,
        views,
        url,
        image
      } = video

      const vistas = (views || 0).toLocaleString()
      const canal = author?.name || author || "Desconocido"
      const thumbBuffer = await getBuffer(image)

      const caption =
`卐卐卐 〔 AIZEN BOT 〕 卐卐卐
━━ Kyōka Suigetsu ━━
◈──────────────◈
✦ Título › *${title}*
卐 Canal › ${canal}
◈ Duración › ${duration || ""}
✦ Vistas › ${vistas}
卐 Enlace › ${url}
◈──────────────◈
"Enviando audio, por favor espera…"`

      await sock.sendMessage(
        msg.chat,
        {
          image: thumbBuffer,
          caption
        },
        {
          quoted: msg
        }
      )

      let audioUrl
      let fileName = `${title}.mp3`

      // API principal
      try {
        const res = await fetch(
          `https://api.delirius.store/download/ytmp3?url=${encodeURIComponent(url)}`
        ).then(r => r.json())

        if (res?.status && res?.data?.download) {
          audioUrl = res.data.download
          fileName = `${res.data.title}.mp3`
        }
      } catch {}

      // API de respaldo
      if (!audioUrl) {
        const dlEndpoint = `${api.url}/dl/ytmp3v2?url=${encodeURIComponent(url)}&key=${api.key}`

        const res = await fetch(dlEndpoint).then(r => r.json())

        if (!res?.status || !res?.data?.dl) {
          return msg.reply(
`卐卐卐 〔 AIZEN BOT 〕 卐卐卐
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No se pudo descargar el audio, intenta más tarde.
◈──────────────◈
"El poder verdadero es la traición…"`
          )
        }

        audioUrl = res.data.dl
        fileName = res.data.fileName || fileName
      }

      const audioBuffer = await getBuffer(audioUrl)

      await sock.sendMessage(
        msg.chat,
        {
          audio: audioBuffer,
          mimetype: "audio/mpeg",
          fileName
        },
        {
          quoted: msg
        }
      )
    } catch (e) {
      console.error(e)

      await msg.reply(
`卐卐卐 〔 AIZEN BOT 〕 卐卐卐
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Error al procesar la descarga.
◈──────────────◈
"La ilusión domina la realidad…"`
      )
    }
  }
}

import db from "#db"

export default {
  command: ['delpasatiempo', 'removehobby'],
  category: 'profile',
  run: async ({ msg, sock, args }) => {
    const user = await db.getUser(msg.sender)

    if (!user.pasatiempo || user.pasatiempo === 'No definido') {
      return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No tienes ningún pasatiempo establecido.
◈──────────────◈
"La ilusión domina la realidad…"`)
    }

    const pasatiempoAnterior = user.pasatiempo
    user.pasatiempo = 'No definido'

    await db.updateUser(msg.sender, 'pasatiempo', user.pasatiempo)

    return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Tu pasatiempo ha sido eliminado.
◈──────────────◈
"Todo ocurre según mi voluntad…"`)
  },
};
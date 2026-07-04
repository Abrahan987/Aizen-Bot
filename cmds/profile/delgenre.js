import db from "#db"
export default {
  command: ['delgenre'],
  category: 'profile',
  run: async ({ msg, sock }) => {
    const user = await db.getUser(msg.sender)
    if (!user.genre) return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ No tienes un género asignado.
◈──────────────◈
"La ilusión domina la realidad…"`,
    )

    user.genre = ''
    await db.updateUser(msg.sender, 'genre', user.genre)

    return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Tu género ha sido eliminado.
◈──────────────◈
"Todo ocurre según mi voluntad…"`)
  },
};
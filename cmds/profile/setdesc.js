import db from "#db"
export default {
  command: ['setdescription', 'setdesc'],
  category: 'profile',
  run: async ({ msg, sock, args, command, text, usedPrefix: prefix }) => {
    const user = await db.getUser(msg.sender)
    const input = args.join(' ')

    if (user.description)
      return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Ya tienes una descripción. Usa › *${prefix}deldescription* para eliminarla.
◈──────────────◈
"La ilusión domina la realidad…"`,
      )

    if (!input)
      return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Debes especificar una descripción válida.
◈──────────────◈
"Todo ocurre según mi voluntad…"`,
      )

    user.description = input
    await db.updateUser(msg.sender, 'description', user.description)

    return msg.reply(
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Se ha establecido tu descripción:
> *${user.description}*
◈──────────────◈
"El poder verdadero es la traición…"`)
  },
};
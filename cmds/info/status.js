import db from "#db"
import os from 'os';

function getDefaultHostId() {
  if (process.env.HOSTNAME) {
    return process.env.HOSTNAME.split('-')[0]
  }
  return 'default_host_id'
}

export default {
  command: ['status'],
  category: 'info',
  run: async ({ msg, sock }) => {
    const users = await db.getUser()
    const hostId = getDefaultHostId()
    const chats = await db.getChat()
    const registeredGroups = chats ? Object.keys(chats).length : 0
    const botId = sock.user.id.split(':')[0] + "@s.whatsapp.net" || false
    const botSettings = await db.getSettings(botId)

    const botname = botSettings.namebot || 'Ai Surus'
    const comandos = botSettings.commandsejecut || '0'
    const botname2 = botSettings.namebot2 || 'Surus'
    const userCount = Object.keys(users).length || '0'

    const estadoBot =
`❀❀❀ 〔 AIZEN BOT 〕 ❀❀❀
━━ Kyōka Suigetsu ━━
◈──────────────◈
✐ Estatus :: *${botname2}*
◈──────────────◈
✦ Users Registrados › *${userCount.toLocaleString()}*
❀ Grupos Registrados › *${registeredGroups.toLocaleString()}*
◈ Comandos Ejecutados › *${comandos.toLocaleString()}*
◈──────────────◈
"La ilusión domina la realidad…"`

    const sistema = os.type()
    const cpu = os.cpus().length
    const ramTotal = (os.totalmem() / 1024 ** 3).toFixed(2)
    const ramUsada = ((os.totalmem() - os.freemem()) / 1024 ** 3).toFixed(2)
    const arquitectura = os.arch()

    const estadoServidor =
`◈──────────────◈
✦ Sistema › *${sistema}*
❀ CPU › *${cpu} cores*
◈ RAM Total › *${ramTotal} GB*
✦ RAM Usada › *${ramUsada} GB*
❀ Arquitectura › *${arquitectura}*
◈ Host ID › *${hostId}*
◈──────────────◈
"Todo ocurre según mi voluntad…"`

    const message = `${estadoBot}\n\n${estadoServidor}`

    await msg.reply(message)
  }
};
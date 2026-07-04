import fs from 'fs';
import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath } from 'url'

global.owner = ['573237649689']

global.api = {
  url: 'https://api.stellarwa.xyz',
  key: 'YOUR_API_KEY_HERE'
}

global.msgglobal = `┈┈┈〔 𖤐 〕┈┈┈
「 SYSTEM 」
Ha ocurrido una anomalía. Contacta con ABRAHAN-M.
┈┈┈┈┈┈┈┈┈`

global.dev = `┈┈┈〔 𖤐 〕┈┈┈
「 BUILT BY ABRAHAN-M 」
La perfección no es una meta, es el comienzo.
┈┈┈┈┈┈┈┈┈`

global.mess = {
  socket: `┈┈┈〔 𖤐 〕┈┈┈
「 RESTRICTION 」
Este comando solo puede ejecutarse desde un Socket.
┈┈┈┈┈┈┈┈┈`,

  admin: `┈┈┈〔 𖤐 〕┈┈┈
「 AUTHORITY 」
Solo los administradores pueden alterar este orden.
┈┈┈┈┈┈┈┈┈`,

  botAdmin: `┈┈┈〔 𖤐 〕┈┈┈
「 INSUFFICIENT STATUS 」
Concédeme privilegios de administrador para continuar.
┈┈┈┈┈┈┈┈┈`,

  nsfw: `┈┈┈〔 𖤐 〕┈┈┈
「 SEALED 」
Los comandos NSFW permanecen sellados en este grupo.
┈┈┈┈┈┈┈┈┈`,

  comandooff: `┈┈┈〔 𖤐 〕┈┈┈
「 DISABLED 」
Este comando ha sido deshabilitado en este grupo.
┈┈┈┈┈┈┈┈┈`
}

global.my = {
  ch: "120363427270057983@newsletter", // Oficial
  ch2: "120363427270057983@newsletter" // API
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  import(`${file}?update=${Date.now()}`)
})
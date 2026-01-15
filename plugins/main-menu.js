import fs from 'fs'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    exp = exp || '0'
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    const readMore = '\u200b'.repeat(850)

    await m.react('✅')

    // --- CONFIGURACIÓN DE IMÁGENES ---
    // Esta será la imagen GRANDE (la principal del mensaje)
    const imgMain = 'https://files.catbox.moe/szpilp.jpg' 
    
    // Esta será la imagen PEQUEÑA (la del cuadrito/enlace)
    // Puedes poner el mismo link o uno diferente (ej. tu logo)
    const imgThumb = 'https://files.catbox.moe/c0cwno.jpg' 

    let tags = {};
    let emojis = {
      main: "🎅",
      info: "🥥",
      config: "🛷",
      dl: "⛄",
      search: "🍄",
      ia: "🪢",
      ff: "🧋",
      frases: "🔥",
      converter: "🫗",
      tools: "🛠️",
      gc: "🪨",
      efectos: "🪻",
      fun: "😹",
      game: "🫘",
      anime: "🍭",
      logos: "🧈",
      emox: "🪼",
      sticker: "🍷",
      rpg: "💸",
      rg: "✒️",
      owner: "☕"
    };

    const tagTitles = {
      main: "Menus",
      info: "Info",
      config: "Ajustes",
      dl: "Download",
      search: "Search",
      ia: "Inteligencias",
      ff: "Free Fire",
      frases: "Frases",
      converter: "Converters",
      tools: "Herramientas",
      gc: "Grupos",
      efectos: "Efectos",
      fun: "Diversión",
      game: "Juegos",
      anime: "Random",
      logos: "Logos",
      emox: "Gifs-Nsfw",
      sticker: "Sticker",
      rpg: "Rpg",
      rg: "Registro",
      owner: "Owner"
    };

    for (let key in emojis) {
      tags[key] = `ᡴꪫ ° ‎◠ *${tagTitles[key]}* ׄ    ${emojis[key]}ㅤ ‎ ‎⊹`;
    }

    let defaultMenu = {
      before: `𓆩🤖𓆪   ׄ ㅤׅ  𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼  𓂃   ׄ   ᥀᥀
ʚꪶ      𝗠𝗲𝗻𝘂́ 𝗣𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹 ㅤׄㅤ𖦹      ִ
ㅤ꒰͜͡${taguser}
 ׄ  𓏲 ׅ  𝗦𝗲𝗹𝗲𝗰𝗰𝗶𝗼𝗻𝗮 𝘂𝗻𝗮 𝗳𝘂𝗻𝗰𝗶𝗼́𝗻   ❅⃨  ׄ

*𓈒𓏸* 🍩 𝗕𝗼𝘁𝗡𝗮𝗺𝗲: ${botname}
*𓈒𓏸* 🥡 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptime}
*𓈒𓏸* 🍺 𝗨𝘀𝗲𝗿𝘀: ${totalreg}
*𓈒𓏸* 🥛 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${vs}

${readMore}
ㅤㅤ *乂̴ ̴ʟ̴ɪ̴s̴ᴛ̴ᴀ̴ ̴ᴅ̴ᴇ̴ ̴ᴄ̴ᴏ̴ᴍ̴ᴀ̴ɴ̴ᴅ̴ᴏ̴s̴ ̴乂̴*
`,
      header: category => `${category}`,
      body: (cmd, emoji) => ` ࣪ ${emoji}˚ ${cmd}`,
      footer: '',
      after: `> ${wm}`
    }

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
      }))

    let groupsByTag = {}
    for (let tag in emojis) {
      groupsByTag[tag] = help.filter(plugin => plugin.tags.includes(tag))
    }

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag =>
        [
          defaultMenu.header(tags[tag]),
          groupsByTag[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, emojis[tag]))).join('\n'),
          defaultMenu.footer
        ].join('\n')
      ),
      defaultMenu.after
    ].join('\n')

    // --- AQUÍ ESTÁ EL CAMBIO CLAVE ---
    // Cambiamos 'text' por 'image' + 'caption'
    await conn.sendMessage(m.chat, {
      image: { url: imgMain }, // FOTO GRANDE
      caption: menuText,       // TEXTO DEL MENÚ
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: false,
        forwardingScore: 0,
        externalAdReply: {
          title: `${usname || 'User'}, Happy year-end!`,
          body: '𝗗𝗲𝘃 𝘀𝗵𝗮𝗱𝗼𝘄𝘀 𝗰𝗹𝘂𝗯',
          thumbnail: await (await fetch(imgThumb)).buffer(), // FOTO PEQUEÑA
          sourceUrl: ig || 'https://instagram.com/gio.dev',
          mediaType: 1,
          renderLargerThumbnail: false // FALSE para mantener la miniatura pequeña
        }
      }
    }, { quoted: fkontak });


  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}

handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
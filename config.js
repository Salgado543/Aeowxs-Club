import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

// Número del bot (déjalo vacío, se llena solo al escanear el QR)
global.botNumber = '' 

// 👑 dueños del Bot
global.owner = [
  // [Numero, Nombre, esCreador?]
  ['5217341011505', 'Gio', true],  // 🚩 TU NÚMERO PRINCIPAL (Ya configurado)
  // Si quieres agregar a otro admin, copia la línea de arriba y cambia el número
]

// Otras configuraciones de propietario
global.own = ['5217341011505'] // Tu número para otros comandos internos
global.ownname = 'Gio'
global.ownp = 'Mexico 🇲🇽'

// Listas de moderadores y premium (puedes dejarlas vacías por ahora)
global.mods = []
global.prems = []

// 🏷️ Marca de agua y Nombres
global.packname = 'Aeowxs Club'    // Nombre del paquete de stickers
global.author = 'Gio'              // Autor de los stickers
global.botname = 'Aeowxs - Bot'    // Nombre visible del Bot
global.wm = 'Aeowxs Club - Bot'    // Marca de agua en textos
global.wm2 = '@Gio'                // Marca secundaria
global.dev = 'Powered by Gio'      // Créditos del desarrollador
global.namebot = 'Aeowxs'
global.nameai = 'Aeowxs AI'
global.textbot = 'AEOWXS CLUB'
global.vs = '1.0.0'
global.emotg = '⚜️'                // Emoji decorativo principal
global.msgtagall = '⚠️ ATENCIÓN GRUPO ⚠️' // Título para menciones masivas
global.sessions = 'Session'        // Carpeta de sesión (NO CAMBIAR)
global.jadi = 'JadiBots'           // Carpeta de sub-bots
global.moneda = 'AeowxCoins 🪙'    // Nombre de tu moneda virtual


// 🖼️ Imágenes y Miniaturas
// Asegúrate de que este archivo exista en tu carpeta media, o cambia la ruta
try {
    global.catalogo = fs.readFileSync('./media/catalogo.jpg')
} catch (e) {
    // Si no encuentra la imagen, no da error, solo avisa
    console.log('⚠️ No se encontró ./media/catalogo.jpg, usando valor por defecto.')
    global.catalogo = fs.readFileSync('./media/menu.jpg') // Intenta usar menu.jpg si existe
}


// 🔗 ENLACES REDES SOCIALES (PON AQUÍ TUS LINKS)
global.grupo = 'https://chat.whatsapp.com/TU_LINK_DE_GRUPO'        // ⬅️ Pon aquí el link de tu grupo
global.comu = 'https://chat.whatsapp.com/TU_LINK_DE_COMUNIDAD'     // ⬅️ Pon aquí el link de tu comunidad
global.channel = 'https://whatsapp.com/channel/TU_CANAL'           // ⬅️ Pon aquí tu canal de WhatsApp
global.ig = 'https://www.instagram.com/TU_USUARIO'                 // ⬅️ Pon aquí tu Instagram


// Configuración visual de mensajes (Fake Reply)
global.estilo = { 
    key: { 
        fromMe: false, 
        participant: `0@s.whatsapp.net`, 
        ...(false ? { remoteJid: "5217341011505-120363317332020195@g.us" } : {}) 
    }, 
    message: { 
        orderMessage: { 
            itemCount : 999, 
            status: 1, 
            surface : 1, 
            message: 'Aeowxs Club ⚜️', // Texto que aparece en la "cita" falsa
            orderTitle: 'Gio Bot', 
            thumbnail: global.catalogo, 
            sellerJid: '0@s.whatsapp.net'
        }
    }
}


// Librerías globales (No tocar)
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        


// Configuraciones de RPG/Juegos
global.multiplier = 69 
global.maxwarn = '3'


// Auto-actualización de este archivo (No tocar)
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
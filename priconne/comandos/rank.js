const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js')
const libraryjp = require("../../config/rankjp.json")
module.exports = {
    name: "rank",//Nombre del comando
    aliases: ["rango"],//alternativas
    run: async (client, message, args, prefix) => {

        //console.log("ENTRO AL COMANDO INFO");
        //console.log(args);
        //#region servicio info
        const axios = require('axios');

        async function infoPriconne(personaje = '', version = '') {
            let payload = { accion: 'info_unidad', personaje: personaje, version: version };
            //console.log(payload);
            let res = await axios.post('https://www.priconne.helperplay.com/index.post.php', new URLSearchParams(payload));
            const Embed = new Discord.EmbedBuilder();
            let data = res.data.obj;
            if (data != undefined) {
                let data = res.data.obj;
                let valorBuscado = data.id_unidad;
                const resultadojp = libraryjp.waifus.find(persona => persona.id === valorBuscado)

                if (resultadojp != undefined) {
                    Embed.setTitle("__**RANKS RECOMENDADOS**__")
                        .setAuthor({ name: 'Yuuki Bot', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png', url: 'https://www.priconne.helperplay.com' })
                        .setDescription("Estas son las recomendaciones generales de " + resultadojp.name + "\nRecuerden que todos personajes comunmente se suben a 5.")
                        .setColor(resultadojp.color)
                    if (resultadojp.ue_lvl != "") {
                        Embed.addFields([{ name: "UE lvl recomendado: " + resultadojp.ue_lvl, value: resultadojp.ue_desc },])
                    }
                    if (resultadojp.rank_1 == "" && resultadojp.rank_2 == "") {
                        Embed.addFields([
                            { name: "Restriccion:", value: resultadojp.restriccion },
                        ])
                    }
                    if (resultadojp.rank_1 != "") {
                        Embed.addFields([
                            { name: "Restriccion:", value: resultadojp.restriccion },
                            { name: "Rank: " + resultadojp.rank_1, value: resultadojp.rank_1_desc }
                        ])

                    }
                    if (resultadojp.rank_2 != "") {
                        Embed.addFields([{ name: "Rank: " + resultadojp.rank_2, value: resultadojp.rank_2_desc },])
                    }
                    Embed.setThumbnail(data.img_victory)
                    Embed.setTimestamp()
                    if (data.galeria.length > 0) {
                        const randomElement = data.galeria[Math.floor(Math.random() * data.galeria.length)];
                        Embed.setImage(randomElement.src)
                    } else {
                        Embed.setImage(data.img_card)
                    }
                    Embed.setTimestamp()
                        .setFooter({ text: 'Ranks recomendados', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png' });

                    return message.channel.send({ embeds: [Embed] })
                } else {
                    Embed.setAuthor({ name: 'Yuuki Bot', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png', url: 'https://www.priconne.helperplay.com' })
                        .addFields([{ name: "Rangos", value: "Parece que ella aun no tiene ranking establecido, recomendamos esperar la valoracion final.", inline: true },])
                        .setThumbnail(data.img_victory)
                        .setColor(resultadojp.color)
                        .setTimestamp()
                    if (data.galeria.length > 0) {
                        const randomElement = data.galeria[Math.floor(Math.random() * data.galeria.length)];
                        Embed.setImage(randomElement.src)
                    } else {
                        Embed.setImage(data.img_card)
                    }
                    Embed.setTimestamp()
                        .setFooter({ text: 'Ranks recomendados', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png' });
                    return message.channel.send({ embeds: [Embed] })
                }

            } else {
                Embed.setAuthor({ name: 'Yuuki Bot', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png', url: 'https://www.priconne.helperplay.com' })
                    .setDescription("Error inesperado, el personaje que deseas buscar no existe o aun no se encuentra disponible en Helper Play")
                    .setTimestamp()
                    .setTimestamp()
                    .setFooter({ text: 'Ranks recomendados', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png' });
                return message.channel.send({ embeds: [Embed] })
            }
        }
        const personaje = args[0];
        const version = args[1];
        if (personaje == 'besto' && version == 'waifu') {

            return message.channel.send("tu sabes quien  es la besto waifu");

        } else if (!personaje) {

            let nobusqueda = new Discord.EmbedBuilder()
                .setTitle("__**IMPORTANTE**__")
                .setAuthor({ name: 'Yuuki Bot', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png', url: 'https://www.priconne.helperplay.com' })
                .setDescription("Para poder usar el comando debes nombrar a la waifu que deseas buscar, por ejemplo:\n>>waifu neneka (este muestra la info de las waifus, por lo que no sirve poner variantes)")
                .setColor("#9132a8")
                .setImage("https://media.discordapp.net/attachments/1045758832854437968/1046548157535883404/WAIFU2.jpg?width=960&height=225")
                .setTimestamp()
                .setFooter({ text: 'Habilidades de Waifus', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png' });
            return message.reply({ content: "oh no...", embeds: [nobusqueda] });
        } else {

            infoPriconne(personaje, version);
        }
    }
}
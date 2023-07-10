const Discord = require("discord.js")
module.exports={
    name:"ping",
    description:"comando de latencia",
    options:[{
        name:"user",
        type:6,
        description:"Elija la region",
        required:true
    }],
    run: async(client,int,args)=>{
        const user = int.options.getUser('user');
        const persona = int.user;
        const emoji = client.emojis.cache.get('1001969962241491074');
        let embed = new Discord.EmbedBuilder() 
        .setColor('#06c743')
        .setDescription(`**oh no, ${user} a sido funado por ${persona}, le aplicó la letal.**`)
        //.setDescription("oh no <@"+user+"> a sido funado por <@"+persona+">, le aplicó la letal<:kotorisurprised:1001965441444499609>")
        .setImage("https://cdn.discordapp.com/attachments/1003709868793921597/1003710102290841660/princess-connect-priconne.gif")
        .setTimestamp()
        .setFooter({ text: 'Menciones', iconURL: 'https://cdn.discordapp.com/attachments/995446875538853918/1000161685966946384/icon_unit_100011.png' });
        return int.reply({embeds: [embed] });
        //await int.reply({content:"puto tu",ephemeral:false});
    }
}

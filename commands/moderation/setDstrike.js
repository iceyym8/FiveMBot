const { RichEmbed } = require('discord.js');
const {set, fetch } = require('quick.db');
module.exports = {
    name: "set-dstrikes",
    category: "moderation",
    description: "Dept. Strike a user",
    permission: "MANAGE_ROLES",
    run: async(client, message, args, base, prefix) => {
        let embed = new RichEmbed()
        let user = message.mentions.users.first() || message.author;
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(`You don't have permission.`)
        let totalrem = args[0];

        if (!totalrem) return message.reply(`Please supply the number to set the user to!`)

        embed.setDescription(`${message.author} set ${user}'s strikes to ${totalrem}`)
        embed.setColor('RED')
        set(`PRP.strikes.dept.${message.guild.id}.${user.id}`, totalrem)
        message.channel.send(embed)

    }
}
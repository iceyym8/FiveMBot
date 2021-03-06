const ms = require('ms')
module.exports = {
    name: "delete",
    category: "giveaways",
    aliases: ["dgw"],
    description: "Delete a public giveaway",
    permissions: "KICK_MEMBERS",
    example: ">delete",
    run: async(client, message, args, manager) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You do not have permission`)

        const filter = response => {
            return response.author.id === message.author.id
        };
        message.channel.send(`What is the message ID of the giveaway you want to delete?`).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
                let messageID = collected.first().content;
                client.giveawaysManager.delete(messageID).then(() => {
                    message.channel.send(`Ok, I deleted the giveaway`)
                }).catch(e => {
                    message.channel.send(`The giveaway by ID ${messageID} was not found`)
                })
            }).catch(e => {
                message.channel.send(`You didnt respond in time`)
            })
        })
    }
}
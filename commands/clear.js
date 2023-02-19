/*module.exports = {
    name : "clear",
    execute(Client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
                return message.reply("Tu n'as pas la permission d'executer la comande !")
        }
            
        amount = args[0];

        if (!amount || isNaN(amount) || amount<1 || amount>100) {
            return message.reply("Merci de spécifier un nombre entier entre 1 et 100 !")
        }

        message.channel.messages.fetch({ limit: amount}).then(messages => {
            message.channel.bulkDeleted(messages);
            message.reply("les messages ont étés supprimées !")
        })
    }
        
}*/

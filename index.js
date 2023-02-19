const Discord = require("discord.js");

const bdd = require('./bdd.json');

const fstat = require("fs");
const path = require('path');
const fs = require("fs");
const { channel } = require("diagnostics_channel");

const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
const client = new Discord.Client({ partials: ["CHANNEL"], intents: [
    Discord.Intents.FLAGS.DIRECT_MESSAGES, 
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
]})


const config = require('./config.json');
Client.on("ready", () => {
    Client.user.setActivity(config.activity)
})
const prefix = config.prefix;
Client.on("ready", () => {  

    console.log("bot opérationel")
});
Client.login(config.token);



// Send the help message
Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "help") {
        message.delete()
        const help = new Discord.MessageEmbed()
        .setColor("#d90000")
        .setTitle("🤔 HELP")
        .setAuthor("Jocasta Nu", 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
            "https://discord.js.org")
        .setDescription("\u200b")
        .setThumbnail(`https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg`)
        .addField("🔑 Préfixe", `%`)   
        .addField("🖱️ Menu help des commandes", "Le menu d'aide pour les commandes de base : *%helpcommand*")
        .addField("⌨️ Menu help des commandes sans préfixe", "Le menu d'aide pour les commandes sans préfixe : *%helpprefix*")
        .setTimestamp()
        .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");
        message.channel.send({ embeds: [help]});

        const menuderoulanhelp = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("selecthelp")
                    .setPlaceholder("Selectionner un menu d'aide")
                    .addOptions([
                        {
                            label: "Commande",
                            description: "Le menu d'aide pour les commandes de base",
                            value: "helpcommand"
                        },
                        {
                            label: "Sans préfix",
                            description: "Le menu d'aide pour les commandes sans préfixe",
                            value: "helpprefix"
                        },
                        {
                            label: "Admin",
                            description: "Le menu d'aide pour les commandes admin",
                            value: "helpadmin"
                        }
                    ])
            );
        message.channel.send({content:"**Menu déroulant des rôles**", components: [menuderoulanhelp]})
    }
});

// Handle select menu interactions
Client.on("interactionCreate", interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "selecthelp") {
        if (interaction.values == "helpcommand") {
            interaction.channel.bulkDelete(parseInt(2)).catch()
                const helpcommand = new Discord.MessageEmbed()
        .setColor("#d90000")
        .setTitle("🤔 HELP COMMAND")
        .setAuthor("Jocasta Nu", 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
            "https://discord.js.org")
        .setDescription("\u200b")
        .setThumbnail(`https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg`)
        .addField("ℹ️ General", "*-Toutes les commandes générales*")   
        .addFields(
            { name: "%help", value: "Liste des commandes", inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
            { name: "%perso", value: "Liste des perso disponible", inline: true },
            { name: "%invite", value: "Crée une invitation pour ce serveur", inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
            { name: "%invitehub", value: "Crée une invitation pour le serveur The Hub", inline: true },
            { name: "%avatar", value: "Affiche ton avatar", inline: true },
            { name: "\u200b", value: "\u200b", inline: true },
            { name: "%infoserv", value: "Information sur le serveur", inline: true },
        )
        .setTimestamp()
        .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");

    interaction.channel.send({ embeds: [helpcommand]});
        }
        if (interaction.values == "helpprefix") {
            interaction.channel.bulkDelete(parseInt(2)).catch()
            const helpprefix = new Discord.MessageEmbed()
.setColor("#d90000")
.setTitle("🤔 HELP PREFIX")
.setAuthor("Jocasta Nu", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
    "https://discord.js.org")
.setDescription("\u200b")
.setThumbnail(`https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg`)
.addField("⌨️ Commande sans préfixe", "*-L'ensemble des commandes sans prefix*")
.addFields(
    { name: "prefix", value: "Le préfixe du bot", inline: true },
    { name: "\u200b", value: "\u200b", inline: true },
    { name: "bonnenuit", value: "Envoie un message de bonne nuit", inline: true },
    { name: "bvn", value: "Envoie un message de bienvenue", inline: true },
)
    .setTimestamp()
    .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");

interaction.channel.send({ embeds: [helpprefix]});
        }
        if (interaction.values == "helpadmin") {
            interaction.channel.bulkDelete(parseInt(2)).catch()
            if (!interaction.member.permissions.has("MANAGE_MESSAGES"))return;
            const helpadmin = new Discord.MessageEmbed()
.setColor("#d90000")
.setTitle("🤔 HELP ADMIN")
.setAuthor("Jocasta Nu", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
    "https://discord.js.org")
.setDescription("\u200b")
.setThumbnail(`https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg`)
.addField("ℹ️ Commande Admin", "*-Toutes les commandes des admins*")   
.addFields(
    { name: "%test", value: "créer un test de réponse du bot", inline: true },
    { name: "\u200b", value: "\u200b", inline: true },
    { name: "%clear ou clean + nombre", value: "Supprime le nombre de message demandé", inline: true },
    { name: "%annonce + id channel + message", value: "Crée un message dans le salon demandé", inline: true },
)
.setTimestamp()
.setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");
interaction.channel.send({ embeds: [helpadmin]});
        }
    }
});

Client.on("messageCreate", message => {
    if (message.channel.type === "dm") {
      // message privé
      message.reply("Bonjour !");
    }
  });

Client.on("messageCreate", message => {
//%perso
if(message.content === prefix + "perso"){
    const perso = new Discord.MessageEmbed()
        .setColor("#a004b5")
        .setTitle("Personnages disponibles")
        .setAuthor("Jocasta Nu", 
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
            "https://discord.js.org")
        .setThumbnail(
            `http://pm1.narvii.com/7012/66269bf1b4213c12a82cee93672f847aa2266742r1-2048-1152v2_00.jpg`)
        .setDescription("-_Voici tous les personnages diponibles avec la commandes %_")
        .addFields(
            { name: 'Yoda', value: '%Yoda', inline: true },
            { name: 'Anakin Skywalker', value: '%Anakin', inline: true },
        )
        .addField("Wiki star wars", "https://starwars.fandom.com/fr/wiki/Accueil")
        .setTimestamp()
        .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");
    
    message.channel.send({ embeds: [perso]});
    }

//%invitehub
if(message.content === prefix + "invitehub"){
    message.reply("**Fan de star wars** =============================================================\nBonjour ! 👋\n Voici un serveur communautaire qui n attend que toi ! 👈\n Rencontre des personnes sympas dans un environnement sain pour faire tout et rien ! 😎\n Tu voudrais faire quoi ? Discussion, partage dart, jeux vidéos, RP et bien plus encore ! 🥳============================================================= Rejoins la grande aventure de The Hub ! 👍\n https://discord.gg/WXskw3A ============================================================= PS: Lis bien le message de bienvenue ! Il explique tout ce que tu dois savoir sur le serveur ! \n🤵 Candidatures staff ouvertes !");
    }

//%invite
if(message.content === prefix + "invite"){
    message.reply("**Fan de star wars** =============================================================\nBonjour ! 👋\nTu cherches un serveur star wars fancophone, ne cherche plus tu as trouvé.\nCe serveur qui rallie jeu vidéo, débat sur l'univers sw et bot interactifs, il a tous pour te plaire.\n Rejoins donc nous sur Fan de star wars:\n https://discord.gg/qnzuDyyA  =============================================================A la prochaine, et au plaisir de se voir connecter")
    }

//info serveur
if(message.content === prefix + "infoserv"){
        const infoserv = new Discord.MessageEmbed()
                .setColor("#C016FF")
                .setThumbnail(message.guild.iconURL())
                .addField(`Plus d'information à propos du serveur **${message.guild.name}**`,
                `
                · Il y a ${message.guild.memberCount} membres
                · Il y a ${message.guild.roles.cache.size} rôles
                · Votre serveur possède ${message.guild.channels.cache.filter(
                    m => m.type === 'GUILD_TEXT').size} salons textuels et ${message.guild.channels.cache.filter(
                    m => m.type === 'GUILD_VOICE').size} salons vocaux
                `)
        
            message.channel.send({ embeds: [infoserv]});
}

//test
if(message.content === prefix + "test"){
message.reply("test")
console.log("test")
}

//embled
if(message.content === prefix + "sondage"){
    message.delete()
    const embledchangant = new Discord.MessageEmbed()
    .setColor("#C016FF")
    .addField("Sondage :", "Etes-vous un joueur abonné sur le jeu swtor ?")
    message.channel.send({ embeds: [embledchangant] });
    }
    
    if(message.content === prefix + "embled2"){
        const embledchangant2 = new Discord.MessageEmbed()
        .setTitle("Classement GAC")
        .setAuthor("Malakili/Maximus Decimus", 
            "https://i.pinimg.com/564x/cf/ad/5c/cfad5c68daa77b901598c5a166172310.jpg",
            "https://discord.js.org")
        .setColor("#C016FF")
        .setThumbnail(
            `https://wiki.swgoh.help/images/f/f7/Grand_Arena.jpg`)
        .addField("\u200b", `Salut à tous,\n \n Une nouvelle saison GAC vient de commencer.🎉\n \n Pour les nouveaux sur le serveur chaque semaine un classement de la GAC est faite.\n Si vous souhaitez y participer envoie un mp à MALAKILI en donnat votre **code allié** et votre **pseudo en jeu**.\n \n Je vous souhaite un bon jeu et bonne chance.`)
        .setTimestamp() 
        .setFooter(`Le staff de ${message.guild.name}`, "https://i.pinimg.com/564x/e0/ca/d9/e0cad954757b92f293979804b319e403.jpg");
        message.channel.send({ embeds: [embledchangant2] });
} 
    
//avatar
if(message.content === prefix + "avatar"){
    const avatar = new Discord.MessageEmbed()
    .setTitle(`Avatar de ${message.author.username}`)
    .setColor(`RANDOM`)
    .setDescription('`Ton avatar :`')
    .setImage(message.author.displayAvatarURL({dynamic: true, size: 256}))

    message.channel.send({ embeds: [avatar] });
    }

//id
if (message.content === prefix + 'id'){
    message.reply(message.author.id)
}

//comande perso sw
else if(message.content === prefix + "Yoda") {
    message.reply("Yoda était un individu d'une espèce inconnue qui comptait parmi les Maîtres Jedi les plus puissants et reconnus de toute l'histoire de la Galaxie, célèbre pour sa sagesse légendaire, sa maîtrise de la Force et ses talents au sabre laser.\n Il était membre du Haut Conseil Jedi pendant les dernières décennies de la République Galactique et en était le Grand Maître avant et pendant la Guerre des Clones.\n À la suite de la bataille de Geonosis, Yoda prit le titre de Maître de l'Ordre en plus de celui de Grand Maître.\n **Wiki star wars**\n https://starwars.fandom.com/fr/wiki/Accueil");
}
else if (message.content === prefix + "Anakin") {
   message.reply("Anakin Skywalker était un Chevalier Jedi originaire de la planète désertique Tatooine qui servit la République Galactique dans ses dernières années.\n Il fut le Maître Jedi de la jeune Togruta Ahsoka Tano pendant la Guerre des Clones.\n Succombant ensuite au Côté Obscur, il devint le Seigneur Sith Dark Vador.\n Indéfectible bras-droit de Dark Sidious durant l'ère Impériale, il prit part à la Purge Jedi, à la lutte contre la rébellion et à la Guerre Civile Galactique avant de revenir du Côté Lumineux grâce à son fils, Luke Skywalker.\n **Wiki star wars**\n https://starwars.fandom.com/fr/wiki/Accueil");
}
})

//commande admin 
Client.on("messageCreate", async (/** @type {Discord.Message} */ msg) => {
    if (!msg.content.startsWith(prefix)) return;
    let args = msg.content.slice(prefix.length).trim().split(/\s+/g); 
    switch (args[0].toLowerCase()) {
        
        /* CLEAN */
        case "clear":
        case "clean":
            if (!msg.member.permissions.has("MANAGE_MESSAGES")) return;
            if (!args[1] || typeof parseInt(args[1]) !== "number")
                return msg.reply("Il manque le nombre").catch();
            msg.channel.bulkDelete(parseInt(args[1])).catch();
            break;
        
            case "annonce": {
                if (!msg.member.permissions.has("ADMINISTRATOR")) return;
                let channelRegExp = /^<#(\d{17,19})>$/;
        
                if (!args[1] || !channelRegExp.test(args[1]) || !args[2])
                    return msg.reply("Commande Non Valide").catch();
        
                let channelID = args[1].match(channelRegExp)[1];
                let channel = await msg.client.channels.fetch(channelID).catch();
        
                if (!channel)
                    return msg.reply(
                        `Le channel <#${channelID}> n'existe pas`
                    ).catch();
        
                let annoucementMessage = args.slice(2).join(" ");
        
                if (!annoucementMessage.length)
                    return msg.reply("Message non valide").catch();
                    const anonceEmbed = new Discord.MessageEmbed()
                    .setColor("#0000FF")
                    .addField(
                        annoucementMessage,
                        `*Le staff ${msg.guild.name}*`)
                    channel.send({ embeds: [anonceEmbed] })
    }}}
)


//variable
Client.on("messageCreate", message => {
    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args;

    if (command === "asv"){
        let [age, sex, ville] = args;
        message.reply(`Bjr ${age} et ${sex} et ${ville}`)
    }
} );
Client.on("messageCreate", message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'asv'){
        message.delete()
        let [titre, salon, pconcerné] = args;
        const bnembled = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${titre}`)
        .setDescription(`Une annonce à été faite dans le salon : ${salon}`)
        .addField("\u200b", "Merci de répondre au question en avec les réactions adéquate");

        message.channel.send({ embeds: [bnembled] });
        message.channel.send(`${pconcerné}`)
    }

    
})     

//PREFIX
Client.on("messageCreate", message => {
    //bvn
    if(message.content === "bvn"){
        message.delete()
        const bvnembled = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:wave: **${message.member.displayName}** vous souhaite la bienvenue sur le serveur **${message.guild.name}** !`);

        message.channel.send({ embeds: [bvnembled] });
        }
    //bn
    if(message.content === "bn"){
        message.delete()
        const bnembled = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**${message.member.displayName}** vous souhaite une bonne nuit 🌃🛌 !`);
    
        message.channel.send({ embeds: [bnembled] });
        }
    //pfx
    if(message.content === "pfx"){
        message.delete()
        const pfxembled = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Le bot **${Client.user.username}** à pour prefix : **%**`);
        
        message.channel.send({ embeds: [pfxembled] });
        }
    }
)



Client.on('guildMemberAdd', (member) => {
    Client.guild.channels.get('933478051222782066').send(`Bienvenue sur le serveur ${member.user.username}! `)
})  



/*benmis

Client.on("messageCreate", message => {
    const msg = message
    if(message.content === prefix + "help"){
        const helpb = new Discord.MessageEmbed()
        .setTitle("Menu ~ Arazel")
                .setColor("#FF0000")
                .setAuthor('Arazel', 'https://media.gq.com/photos/5ddd59ff5bb28e00087a9df6/16:9/w_1280,c_limit/baby-yoda-explainer-gq-november-2019-112619.jpg', 'https://discord.js.org')
                .setThumbnail(`https://share.creavite.co/5vS6dXAYkST1IIB8.gif`)
                .addField(
                    "Préfixe", prefix)
                .addField(
                    ":mechanical_arm: Commandes disponibles",
                    "`help`, `bienvenue`, `idee`, `roll`, `member(s)`, `pub`, `merci`, `avatar`,`bvn`,`vente`,`botinfo`")
                .addField(
                    ":tada: Fun",
                    "`fish`, `salut`")
                .addField(
                    ":sunglasses: Commandes sans préfix",
                    "`bienvenue (bvn)`, `bonjour`, `aurevoir`")
                    .addField(
                        ":man_in_tuxedo: Commandes admin",
                        "`helpadmin`")
                .setTimestamp()
                .setFooter('Bot créé par Benmis et Malakili', 'https://media4.giphy.com/media/l3978y5HqiEtqupiM/giphy.gif?cid=790b761127a54aa29cb777fb6cd51ad38314eaf32b893b9b&rid=giphy.gif&ct=g');
            ;

            message.reply({ embeds: [helpb] }).catch();
    }
    
    if(message.content === prefix + "helpadmin"){
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        const helpadminEmbed = new Discord.MessageEmbed()
            .setTitle("Menu ~ Arazel")
            .setColor("#FF0000")
            .setAuthor('The Coding Time')
            .setThumbnail(`https://share.creavite.co/5vS6dXAYkST1IIB8.gif`)
            .addField(
                "Préfixe", prefix)
            .addField(
                ":man_in_tuxedo: Commandes admin",
                "`clean`, `annonce`")
            .setTimestamp()
            .setFooter('Bot créé par Benmis et Malakili', 'https://media4.giphy.com/media/l3978y5HqiEtqupiM/giphy.gif?cid=790b761127a54aa29cb777fb6cd51ad38314eaf32b893b9b&rid=giphy.gif&ct=g');
        ;

        message.reply({ embeds: [helpadminEmbed] }).catch(); 
            
    }

    if(message.content === prefix + ["infoserveur"]){
        const d = new Date(msg.guild.createdTimestamp);
            `${d.getUTCDay()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
            const infoEmbed = new Discord.MessageEmbed()
                .setTitle(`Informations ~ ${msg.guild.name}`)
                .setColor("#FF0000")
                .setAuthor('Arazel', 'https://media.gq.com/photos/5ddd59ff5bb28e00087a9df6/16:9/w_1280,c_limit/baby-yoda-explainer-gq-november-2019-112619.jpg', 'https://discord.js.org')
                .setThumbnail('https://gifimage.net/wp-content/uploads/2017/10/matrix-animated-gif-2.gif')
                .addField(
                    ` • Date de création : ${d.getUTCDay()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`,
                    "\u200B")
                .addField(
                    ` • Il y a ${message.guild.memberCount} membres sur le serveur !`,
                    "\u200B")
                .setTimestamp()
                .setFooter('Bot créé par Benmis et Malakili', 'https://media4.giphy.com/media/l3978y5HqiEtqupiM/giphy.gif?cid=790b761127a54aa29cb777fb6cd51ad38314eaf32b893b9b&rid=giphy.gif&ct=g');
            ;

            message.reply({ embeds: [infoEmbed] }).catch();
        }
    
    if(message.content === prefix + ["infobot"]){
        const botinfoEmbed = new Discord.MessageEmbed()
        .setTitle(`Informations ~ ${Client.user.tag}`)
        .setColor("#FF0000")
        .setAuthor('Arazel', 'https://share.creavite.co/E1L6ZGTCzv2qqXFg.png' , 'https://discord.js.org')
        .setThumbnail('https://share.creavite.co/5vS6dXAYkST1IIB8.gif')
        .addField(  
            ` • Date de création : 13/06/2020 `,
            "\u200B")
        .addField(
            ` • ${Client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)} personnes utilisent ce bot  `,
            "\u200B")
        .addField(
            ` • ${Client.guilds.cache.size} serveurs utilisent ce bot`,
            "\u200B")
        .setTimestamp()
        .setFooter('Bot créé par Benmis et Malakili', 'https://media4.giphy.com/media/l3978y5HqiEtqupiM/giphy.gif?cid=790b761127a54aa29cb777fb6cd51ad38314eaf32b893b9b&rid=giphy.gif&ct=g');
    ;
    msg.reply({ embeds: [botinfoEmbed] }).catch();
    }

    if(message.content === prefix + "clear"){
        let args = msg.content.slice(config.prefix.length).trim().split(/\s+/g); 
        if (!msg.member.permissions.has("MANAGE_MESSAGES")) return;
        if (!args[1] || typeof parseInt(args[1]) !== "number")
            return msg.reply("Il manque le nombre").catch();
        message.channel.bulkDelete(args[0] + 1);
    }
    }
)
*/



//bot commun 
//comande de monnaie
function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err => {
        if(err) message.channel.send("une erreur est survenue.");
    }))
}
Client.on("messageCreate", message => { 
    const msg = message   
        //pay
        if (message.content === prefix + 'pay'){
            utilisateur = message.author.id
            function random(min, max){
                min = Math.ceil(0);
                max = Math.floor(100);
                randnum = Math.floor(Math.random() * (max - min +1)+ min);
                }
            random()
                    bdd["Argent"][utilisateur] = bdd["Argent"][utilisateur]+randnum
                    Savebdd()
        message.channel.send("Argent gagné : " + randnum + ", tu as en réserve : " + bdd["Argent"][utilisateur])
        }
        //bank
        if (message.content === prefix + "bank"){
            const { readFileSync } = require("fs");
            const JsonToObject = JSON.parse(readFileSync('./bdd.json', 'utf-8'), (identifiant, argent) =>{
                if (identifiant === message.author.id){
                    message.reply("vous avez " + argent +" d'argent sur votre compte !!")
                }

            })
        }
        //shop
        if(message.content === prefix + "shop"){
            message.delete()
            const shop = new Discord.MessageEmbed()
                .setColor("	#ADD8E6")
                .setTitle("🛍️ Shop")
                .setAuthor("Jocasta Nu", 
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
                    "https://discord.js.org")
                .setDescription("\u200b")
                .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png`)
                .addField("⚔️ Rôle", "*Boutique des rôles*")   
                .addFields(
                    { name: "Richissime", value: "**Coût :** 10 000", inline: true },
                    { name: "\u200b", value: "\u200b", inline: true },
                    { name: "Test   ", value: "**En cours de programmation**", inline: true },
                )
                .setTimestamp()
                .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");
        
            message.channel.send({ embeds: [shop]})
            

            if (message.author.bot) return;
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId("select")
                        .setPlaceholder("Selectionner un article")
                        .addOptions([
                            {
                                label: "Richissime",
                                description: "Coût: 10 000",
                                value: "richissime"
                            }   
                            ,
                            {
                                label: "Test",
                                description: "En cours de progrmmation",
                                value: "veteran"
                            }
                        ])
                );
            message.channel.send({content:"**Menu déroulant des rôles**", components: [row]})
        }
    
    }

        
)

Client.on("interactionCreate", interaction => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "select") {

      if (interaction.values == "richissime") {
        const userId = interaction.user.id;

        if (bdd["Argent"][userId] < 10000) {

          const notEnoughMoney = new Discord.MessageEmbed()
            .setTitle("Not enough money")
            .setDescription("You do not have enough money to purchase the Richissime role.")
            .setColor("RED");
          return interaction.reply({ embeds: [notEnoughMoney], ephemeral: true });
        }


        interaction.channel.bulkDelete(parseInt(2)).catch();
        const shoproledeco = new Discord.MessageEmbed()
          .setColor("#ADD8E6")
          .setTitle("⚔️ *Boutique des rôles*");
        interaction.channel.send({ embeds: [shoproledeco] }).then(channel => {
          var row = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("acheter")
                .setLabel("ACHETER")
                .setStyle("PRIMARY")
                .setEmoji("🛒")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("quitter")
                .setLabel("QUITTER")
                .setStyle("DANGER")
                .setEmoji("❌")
            );
          const Achat = new Discord.MessageEmbed()
            .setColor("#ADD8E6")
            .setTitle("🛍️ Shop")
            .setDescription("\u200b")
            .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png`)
            .addField("**Confirmez-vous votre achat ?**", "Merci de fermer le channel quelle que soit votre décision")
            .setTimestamp()
            .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");
          interaction.channel.send({ embeds: [Achat], components: [row] });
        });
      }
    }
  }
});


/*const { readFileSync } = require("fs");
const JsonToObject = JSON.parse(readFileSync('./bdd.json', 'utf-8'), (identifiant, argent) =>{})*/

let alreadyBought = [];

Client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "acheter") {
    if (alreadyBought.includes(interaction.user.id)) {
      await interaction.send({ content: "Vous avez déjà acheté cet article !", ephemeral: true });
    } else {
      alreadyBought.push(interaction.user.id);


      const utilisateur = interaction.user.id;
      const merciachat = new Discord.MessageEmbed()
        .setColor("#ADD8E6")
        .setTitle("✅ **Merci de votre achat**");
      bdd["Argent"][utilisateur] = bdd["Argent"][utilisateur] - 10000;
      Savebdd();
      interaction.channel.bulkDelete(parseInt(2)).catch();
      interaction.member.roles.add("1047197631706828861");

      await interaction.send({ embeds: [merciachat] });
    }
  }
  if(interaction.customId === "quitter"){
    interaction.channel.bulkDelete(parseInt(2)).catch();
    await interaction.send({ content: "Achat annulée", ephemeral: true });
  }
});

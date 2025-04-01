const Discord = require("discord.js");

require('web-streams-polyfill');

const fstat = require("fs");
const path = require('path');
const fs = require("fs");
const { channel } = require("diagnostics_channel")



const bddPath = "./bdd.json";
function Savebdd() {
    try {
        fs.writeFileSync(bddPath, JSON.stringify(bdd, null, 4), "utf-8");
    } catch (err) {
        console.error("Erreur lors de la sauvegarde :", err);
    }
}
let bdd = Loadbdd(); // Charger les données au démarrage

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



// Commande : "help"
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
        message.channel.send({components: [menuderoulanhelp]})
    }
});

// Selectionne le menu help
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
    { name: "pfx", value: "Le préfixe du bot", inline: true },
    { name: "\u200b", value: "\u200b", inline: true },
    { name: "bn", value: "Envoie un message de bonne nuit", inline: true },
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

//1er test
/*
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
*/


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






//bot commun 
//comande de monnaie

// Charger la base de données en mémoire
function Loadbdd() {
    try {
        return JSON.parse(fs.readFileSync(bddPath, "utf-8"));
    } catch (error) {
        console.error("Erreur de lecture du fichier JSON :", error);
        return { Argent: {} }; // Renvoie une base vide si erreur
    }
}

// Sauvegarder la base de données


Client.on("messageCreate", message => { 
    if (message.content === prefix + "enregistrer") {
        let utilisateur = message.author.id;

        // Vérifier si l'utilisateur est déjà enregistré
        if (bdd.Argent.hasOwnProperty(utilisateur)) {
            return message.reply("✅ Vous êtes déjà enregistré avec **" + bdd.Argent[utilisateur] + "** crédits !");
        }

        // Ajouter l'utilisateur avec un solde initial de 100 crédits
        bdd.Argent[utilisateur] = 100;
        Savebdd();

        message.reply("✅ Vous êtes maintenant enregistré avec **100 crédits** !");
    }

    if (message.content === prefix + 'pay') {
        let utilisateur = message.author.id;
        bdd = Loadbdd(); // Recharger les données avant d'exécuter la commande

        //Délai de 12h
        const maintenant = Date.now(); 
        const cooldown = 12 * 60 * 60 * 1000; // 12 heures en millisecondes

        // Vérifier si l'utilisateur a déjà utilisé la commande et quand
        if (!bdd.dernierUsage) {
            bdd.dernierUsage = {}; // Initialiser si nécessaire
        }

        if (bdd.dernierUsage[utilisateur] && (maintenant - bdd.dernierUsage[utilisateur] < cooldown)) {
            const tempsRestant = cooldown - (maintenant - bdd.dernierUsage[utilisateur]);
            const heuresRestantes = Math.floor(tempsRestant / (60 * 60 * 1000));
            const minutesRestantes = Math.floor((tempsRestant % (60 * 60 * 1000)) / (60 * 1000));

            return message.reply(`❌ Vous devez attendre encore **${heuresRestantes}h ${minutesRestantes}min** avant d'utiliser cette commande à nouveau.`);
        }

        // Enregistrer le moment où la commande a été utilisée
        bdd.dernierUsage[utilisateur] = maintenant;
        fs.writeFileSync(bddPath, JSON.stringify(bdd, null, 4), "utf-8");

        //reste de la commande :

        // Vérifier si l'utilisateur est bien enregistré
        if (!bdd || !bdd.Argent || !bdd.Argent.hasOwnProperty(utilisateur)) {
            return message.channel.send("❌ Vous n'êtes pas encore enregistré ! Utilisez `" + prefix + "enregistrer` pour commencer.");
        }

        // Générer un montant aléatoire entre 0 et 100 crédits
        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let randnum = random(0, 100);

        // Ajouter les crédits au solde de l'utilisateur
        bdd.Argent[utilisateur] += randnum;
        Savebdd();

        message.channel.send(`💰 Argent gagné : **${randnum}** crédits\n💼 Solde actuel : **${bdd.Argent[utilisateur]}** crédits.`);
    };



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
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png")
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

//selection rôle richissime
const { readFileSync, writeFileSync } = require("fs");
let alreadyBought = [];

Client.on("interactionCreate", interaction => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "select") {

      if (interaction.values == "richissime") {
        const utilisateur = interaction.user.id;

        if (bdd["Argent"][utilisateur] < 10000) {
            interaction.channel.bulkDelete(2).catch()

          const notEnoughMoney = new Discord.MessageEmbed()
            .setTitle("Not enough money")
            .setDescription("Vous n'avez pas assez d'argent pour achter le rôle Richissime.")
            .setColor("RED");
          return interaction.reply({ embeds: [notEnoughMoney], ephemeral: true });
        }
        else {
    
        interaction.channel.bulkDelete(parseInt(2)).catch();
        const shoprolerichissime = new Discord.MessageEmbed()
          .setColor("#ADD8E6")
          .setTitle("⚔️ *Boutique des rôles*");
        interaction.channel.send({ embeds: [shoprolerichissime] }).then(channel => {
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
          const Achatrichissime = new Discord.MessageEmbed()
            .setColor("#ADD8E6")
            .setTitle("🛍️ Shop")
            .setDescription("\u200b")
            .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png`)
            .addField("**Confirmez-vous votre achat ?**", "Merci de fermer le channel quelle que soit votre décision")
            .setTimestamp()
            .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");
          interaction.channel.send({ embeds: [Achatrichissime], components: [row] });
        });
    }
      }
    }
  }
});

//vérification achat rôle richissime
Client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  const utilisateur = interaction.user.id;

  if (interaction.customId === "acheter") {
    interaction.channel.bulkDelete(2)
    if (alreadyBought.includes(utilisateur)) {
      return await interaction.reply({ content: "Vous avez déjà acheté cet article !", ephemeral: true });
    }

    alreadyBought.push(utilisateur);
    bdd["Argent"][utilisateur] -= 10000;
    Savebdd();

    const merciachat = new Discord.MessageEmbed()
      .setColor("#ADD8E6")
      .setTitle("✅ **Merci de votre achat**");

    await interaction.member.roles.add("1047197631706828861").catch(console.error);
    await interaction.reply({ embeds: [merciachat], ephemeral: true });
  }

  if (interaction.customId === "quitter") {
    interaction.channel.bulkDelete(2)
    await interaction.reply({ content: "Achat annulé", ephemeral: true });
  }
});


/*
Futur objectif :
- Mettre en ligne le bot 
- lorsque je fais la commande shop cela ouve un nouveau chanel 
- jeu pendu et labyrinthe
- rpg
*/








// jeu pendu

const { Permissions, MessageActionRow, MessageSelectMenu } = require("discord.js");

const penduStages = [
    "```\n  _______\n |/      |\n |\n |\n |\n |\n_|___\n```",
    "```\n  _______\n |/      |\n |      (_)\n |\n |\n |\n_|___\n```",
    "```\n  _______\n |/      |\n |      (_)\n |       |\n |       |\n |\n_|___\n```",
    "```\n  _______\n |/      |\n |      (_)\n |      \\|\n |       |\n |\n_|___\n```",
    "```\n  _______\n |/      |\n |      (_)\n |      \\|/\n |       |\n |\n_|___\n```",
    "```\n  _______\n |/      |\n |      (_)\n |      \\|/\n |       |\n |      /\n_|___\n```",
    "```\n  _______\n |/      |\n |      (_)\n |      \\|/\n |       |\n |      / \\\n_|___\n```"
];

// Listes des mots avec accents
const wordLists = {
    histoire: ["Moyen Âge", "Révolution", "Empire", "Monarchie", "République", "Guerre", "Bataille", "Civilisation", "Dynastie", "Dictature", "Constitution", "Archéologie", "Héritage", "Conquête", "Manuscrit", "Souverain",  "Mamelouks", "Charlemagne", "Phillipe Auguste", "Jeanne d'Arc", 
        "Préhistoire", "Féodalité", "Croisades", "Château", "Chevalier", "Inquisition", "Exploration", "Indépendance", "Réforme",   
        "Absolutisme", "Propagande", "Gouvernance", "Traité", "Frontière", "Alliance", "Coup d'État", "Hégémonie", "Épopée",  
        "Armée", "Rébellion", "Suffrage", "Patrimoine", "Censure", "Diplomatie", "Noblesse"
],
    jeux_video: ["Console", "Manette", "Graphismes", "Multijoueur", "Pixel", "The Legend of Zelda", "Call of Duty", "League of Legends", "Minecraft", "Quête",  
"Boss", "Niveau", "Checkpoint", "Sauvegarde", "Respawn", "Hitbox", "Super Mario", "Easter Egg", "Glitch", "The Witcher",  
"Skin", "Loot", "Crafting", "Grand Theft Auto", "Modding", "Inventaire", "HUD", "Compétence", "Classement", "Trophée",  
"Succès", "Gameplay", "Mode Histoire", "Coopératif", "Dark Souls", "Hollow Knight", "Fortnite", "Game Over", "Arcade",  
"Simulation", "Stratégie", "Survie", "Stardew Valley", "Beta", "Patch", "Esport", "Tournoi", "Streamer", "Twitch"
],
    espace: ["Soleil", "Lune", "Étoile", "Planète", "Galaxie", "Univers", "Cosmos", "Astéroïde", "Comète", "Météorite",  
"Satellite", "Orbite", "Gravité", "Espace", "Fusée", "Astronaute", "Station Spatiale", "Télescope", "Trou Noir", "Éclipse",  
"Voie Lactée", "Mars", "Vénus", "Jupiter", "Saturne", "Uranus", "Neptune", "Mercure", "Big Bang", "Atmosphère",  
"Oxygène", "Lumière", "Éruption Solaire", "Météore", "Astrophysique", "NASA", "Éclipse Lunaire", "Éclipse Solaire", "Rayon Cosmique", "Nébuleuse",  
"Système Solaire", "Constellation", "Exoplanète", "Observatoire", "Rayon X", "Énergie Sombre", "Matière Noire", "Cosmonaute", "Galaxie Spirale", "Anneaux de Saturne"
],
    sport: ["Football", "Zinedine Zidane", "Tennis", "Natation", "Athlétisme", "Julian Alaphilippe", "Rugby", "Handball", "Tony Parker", "Boxe",  
"Golf", "Martin Fourcade", "Snowboard", "Patinage", "Marathon", "Course", "Sprint", "Gymnastique", "Musculation", "Yoga",  
"Teddy Riner", "Judo", "Escrime", "Surf", "Planche à voile", "Triathlon", "Haltérophilie", "Plongeon", "Aviron", "Lutte",  
"Badminton", "Karim Benzema", "Softball", "Polo", "Équitation", "Motocross", "Sébastien Loeb", "Formule 1", "Skateboard", "Parkour",  
"Bowling", "Antoine Dupont", "Tir à l'arc", "Escalade", "Canöe", "Rafting", "Hockey", "Ping-pong", "Randonnée", "Renaud Lavillenie"
]
};
// Fonction pour enlever les accents d'un mot
function normalizeLetter(letter) {
    return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let games = new Map();

Client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const guild = message.guild;
    if (!guild) return;

    if (games.has(message.author.id)) {
        let game = games.get(message.author.id);

        if (message.channel.id !== game.channel.id) return;

        let guess = normalizeLetter(message.content.toLowerCase());
        if (guess.length === 1 && guess.match(/[a-z]/i)) {
            handleGuess(message, guess, game);
        }
        return;
    }

    if (message.content === `${prefix}pendu`) {
        startGame(message);
    }
});

async function startGame(message) {
    const guild = message.guild;
    const user = message.author;

    if (games.has(user.id)) {
        return message.reply("Tu as déjà une partie en cours !");
    }

    try {
        let channel = await guild.channels.create(`pendu-${user.username}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: Client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            ]
        });

        message.reply(`🔹 Ta partie de pendu a commencé ! Rejoins le salon : <#${channel.id}>`);

        let themeSelection = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("select_theme")
                .setPlaceholder("Choisis un thème pour commencer !")
                .addOptions([
                    { label: "Histoire", value: "histoire", emoji: "📜" },
                    { label: "Jeux Vidéo", value: "jeux_video", emoji: "🎮" },
                    { label: "Espace", value: "espace", emoji: "🌌" },
                    { label: "Sport", value: "sport", emoji: "🏆" }
                ])
        );

        let msg = await channel.send({
            content: `**${user.username}**, choisis un thème avant de commencer la partie :`,
            components: [themeSelection]
        });

        const filter = (interaction) => interaction.user.id === user.id && interaction.customId === "select_theme";
        const collector = channel.createMessageComponentCollector({ filter, time: 30000 });

        collector.on("collect", async (interaction) => {
            let chosenTheme = interaction.values[0];
            let word = wordLists[chosenTheme][Math.floor(Math.random() * wordLists[chosenTheme].length)];
            let hiddenWord = word.split("").map(char => (char === " " ? " " : "_")).join("")
            let errors = 0;
            let guessedLetters = [];

            games.set(user.id, { word, hiddenWord, errors, guessedLetters, channel, originChannel: message.channel });

            await interaction.update({ content: `Thème choisi : **${chosenTheme}** !\n\nMot à deviner : \`${hiddenWord}\`\n\n${penduStages[errors]}\n\nÉcris une lettre pour deviner !`, components: [] });
        });

    } catch (error) {
        console.error("Erreur lors de la création du salon :", error);
        message.reply("Je n'ai pas pu créer le salon. Vérifie mes permissions !");
    }
}

async function handleGuess(message, letter, game) {
    let utilisateur = message.author.id;
    if (game.guessedLetters.includes(letter)) {
        return message.channel.send(`Tu as déjà essayé la lettre **${letter}**.`);
    }

    game.guessedLetters.push(letter);
    let normalizedWord = normalizeLetter(game.word).toLowerCase();

    if (normalizedWord.includes(letter)) {
        let newHidden = game.hiddenWord.split('');
        for (let i = 0; i < game.word.length; i++) {
            if (normalizeLetter(game.word[i].toLowerCase()) === letter) {
                newHidden[i] = game.word[i];
            }
        }
        game.hiddenWord = newHidden.join('');

        if (!game.hiddenWord.includes("_")) {
            sendEndMessage(message.author.id, `🎉 **Victoire !** <@${message.author.id}>, tu as gagné 100 crédits!`);
            bdd.Argent[utilisateur] = (bdd.Argent[utilisateur] || 0) + 100;
            Savebdd();
            endGame(message.author.id);
        } else {
            message.channel.send(`Bonne lettre !\n\nMot : \`${game.hiddenWord}\`\n\n${penduStages[game.errors]}`);
        }
    } else {
        game.errors++;

        if (game.errors >= penduStages.length - 1) {
            sendEndMessage(message.author.id, `😵 **Défaite !** <@${message.author.id}> a perdu. Le mot était **${game.word}**.`);
            endGame(message.author.id);
        } else {
            message.channel.send(`Mauvaise lettre !\n\nMot : \`${game.hiddenWord}\`\n\n${penduStages[game.errors]}`);
        }
    }
}

// ⬇️ Ces fonctions doivent être placées ici, en dehors de `handleGuess()`
async function endGame(userId) {
    let game = games.get(userId);
    if (game) {
        if (game.channel) {
            try {
                await game.channel.delete();
            } catch (err) {
                console.error("Erreur lors de la suppression du salon :", err);
            }
        }
        games.delete(userId);
    }
}

function sendEndMessage(userId, messageContent) {
    let game = games.get(userId);
    if (game && game.originChannel) {
        game.originChannel.send(messageContent);
    }
}

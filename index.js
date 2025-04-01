const { 
    Client, GatewayIntentBits, Partials, 
    EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder
} = require("discord.js");
const fs = require("fs");
const config = require('./config.json');

const bddPath = "./bdd.json";

// Fonction de sauvegarde des données
function Savebdd() {
    try {
        fs.writeFileSync(bddPath, JSON.stringify(bdd, null, 4), "utf-8");
    } catch (err) {
        console.error("Erreur lors de la sauvegarde :", err);
    }
}

// Charger les données au démarrage
let bdd = Loadbdd();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Quand le bot est prêt
client.once("ready", () => {
    client.user.setActivity(config.activity);
    console.log("Bot opérationnel !");
});


const prefix = config.prefix;

const token(process.env.TOKEN);

// Commande help
client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "help") {
        message.delete();

        const helpEmbed = new EmbedBuilder()
            .setColor("#d90000")
            .setTitle("🤔 HELP")
            .setAuthor({ 
                name: "Jocasta Nu", 
                iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
                url: "https://discord.js.org"
            })
            .setThumbnail("https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg")
            .addFields(
                { name: "🔑 Préfixe", value: "%" },
                { name: "🖱️ Menu help des commandes", value: "Le menu d'aide pour les commandes de base : *%helpcommand*" },
                { name: "⌨️ Menu help des commandes sans préfixe", value: "Le menu d'aide pour les commandes sans préfixe : *%helpprefix*" }
            )
            .setTimestamp()
            .setFooter({ 
                text: "Bot créé par Malakili", 
                iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU"
            });

        message.channel.send({ embeds: [helpEmbed] });

        const menuDeroulant = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("selecthelp")
                    .setPlaceholder("Sélectionner un menu d'aide")
                    .addOptions([
                        {
                            label: "Commande",
                            description: "Le menu d'aide pour les commandes de base",
                            value: "helpcommand"
                        },
                        {
                            label: "Sans préfixe",
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

        message.channel.send({ components: [menuDeroulant] });
    }
});

// Sélection du menu help
client.on("interactionCreate", interaction => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === "selecthelp") {
        interaction.channel.bulkDelete(2).catch(() => {}); // Suppression des 2 derniers messages

        let embed;
        
        if (interaction.values[0] === "helpcommand") {
            embed = new EmbedBuilder()
                .setColor("#d90000")
                .setTitle("🤔 HELP COMMAND")
                .setAuthor({ name: "Jocasta Nu", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU", url: "https://discord.js.org" })
                .setThumbnail("https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg")
                .addFields(
                    { name: "%help", value: "Liste des commandes", inline: true },
                    { name: "%perso", value: "Liste des perso disponibles", inline: true },
                    { name: "%invite", value: "Crée une invitation pour ce serveur", inline: true },
                    { name: "%avatar", value: "Affiche ton avatar", inline: true },
                    { name: "%infoserv", value: "Informations sur le serveur", inline: true }
                )
                .setTimestamp()
                .setFooter({ text: "Bot créé par Malakili", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU" });

        } else if (interaction.values[0] === "helpprefix") {
            embed = new EmbedBuilder()
                .setColor("#d90000")
                .setTitle("🤔 HELP PREFIX")
                .setThumbnail("https://i.pinimg.com/originals/0a/ae/85/0aae85f8674735a413d587259dd332d7.jpg")
                .addFields(
                    { name: "pfx", value: "Le préfixe du bot", inline: true },
                    { name: "bn", value: "Envoie un message de bonne nuit", inline: true },
                    { name: "bvn", value: "Envoie un message de bienvenue", inline: true }
                )
                .setTimestamp()
                .setFooter({ text: "Bot créé par Malakili", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU" });

        } else if (interaction.values[0] === "helpadmin") {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
            
            embed = new EmbedBuilder()
                .setColor("#d90000")
                .setTitle("🤔 HELP ADMIN")
                .addFields(
                    { name: "%test", value: "Créer un test de réponse du bot", inline: true },
                    { name: "%clear ou clean + nombre", value: "Supprime un nombre de messages", inline: true },
                    { name: "%annonce + id channel + message", value: "Crée un message dans le salon demandé", inline: true }
                )
                .setTimestamp()
                .setFooter({ text: "Bot créé par Malakili", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU" });
        }

        if (embed) {
            interaction.channel.send({ embeds: [embed] });
        }
    }
});

client.on("messageCreate", async (message) => {
    if (!message.guild) return;

    if (message.content === prefix + "perso") {
        const perso = new EmbedBuilder()
            .setColor("#a004b5")
            .setTitle("Personnages disponibles")
            .setAuthor({
                name: "Jocasta Nu",
                iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
                url: "https://discord.js.org"
            })
            .setThumbnail("http://pm1.narvii.com/7012/66269bf1b4213c12a82cee93672f847aa2266742r1-2048-1152v2_00.jpg")
            .setDescription("-_Voici tous les personnages disponibles avec la commande %_")
            .addFields(
                { name: 'Yoda', value: '%Yoda', inline: true },
                { name: 'Anakin Skywalker', value: '%Anakin', inline: true }
            )
            .addFields({ name: "Wiki star wars", value: "https://starwars.fandom.com/fr/wiki/Accueil" })
            .setTimestamp()
            .setFooter({
                text: "Bot créé par Malakili",
                iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU"
            });
        message.channel.send({ embeds: [perso] });
    }

    if (message.content === prefix + "invitehub") {
        message.reply("**Fan de star wars** =============================================================\nBonjour ! 👋\n Voici un serveur communautaire qui n'attend que toi ! 👈\n Rencontre des personnes sympas dans un environnement sain pour faire tout et rien ! 😎\n Tu voudrais faire quoi ? Discussion, partage d'art, jeux vidéos, RP et bien plus encore ! 🥳============================================================= Rejoins la grande aventure de The Hub ! 👍\n https://discord.gg/WXskw3A ============================================================= PS: Lis bien le message de bienvenue ! Il explique tout ce que tu dois savoir sur le serveur ! \n🤵 Candidatures staff ouvertes !");
    }

    if (message.content === prefix + "invite") {
        message.reply("**Fan de star wars** =============================================================\nBonjour ! 👋\nTu cherches un serveur star wars francophone, ne cherche plus tu as trouvé.\nCe serveur qui rallie jeu vidéo, débat sur l'univers sw et bot interactifs, il a tout pour te plaire.\n Rejoins donc nous sur Fan de star wars:\n https://discord.gg/qnzuDyyA  =============================================================A la prochaine, et au plaisir de se voir connecté");
    }

    if (message.content === prefix + "infoserv") {
        const infoserv = new EmbedBuilder()
            .setColor("#C016FF")
            .setThumbnail(message.guild.iconURL())
            .addFields({
                name: `Plus d'informations sur **${message.guild.name}**`,
                value: `\n· Il y a ${message.guild.memberCount} membres\n· Il y a ${message.guild.roles.cache.size} rôles\n· Votre serveur possède ${message.guild.channels.cache.filter(m => m.type === 0).size} salons textuels et ${message.guild.channels.cache.filter(m => m.type === 2).size} salons vocaux`
            });
        message.channel.send({ embeds: [infoserv] });
    }

    if (message.content === prefix + "test") {
        message.reply("test");
        console.log("test");
    }

  if (message.content.startsWith(prefix + "clear")) {
        // Vérification des permissions
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply("Tu n'as pas la permission de gérer les messages !");
        }
        const args = message.content.split(" ");
        if (!args[1] || isNaN(args[1])) {
            return message.reply("Il faut spécifier un nombre valide de messages à supprimer !");
        }
        const deleteCount = parseInt(args[1]);
        if (deleteCount < 1 || deleteCount > 100) {
            return message.reply("Je peux supprimer entre 1 et 100 messages à la fois !");
        }
        try {
            // Supprimer les messages
            const deleteableMessages = (await message.channel.messages.fetch({ limit: deleteCount }));
            await message.channel.bulkDelete(deleteableMessages);
            } catch (error) {
            console.error("Erreur lors de la suppression des messages :", error);
            message.reply("Il y a eu une erreur en essayant de supprimer les messages.");
        }
    }
});

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

client.on("messageCreate", message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'asv') {
        message.delete();
        let [titre, salon, pconcerné] = args;
        const bnembled = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${titre}`)
            .setDescription(`Une annonce a été faite dans le salon : ${salon}`)
            .addFields({ name: "\u200b", value: "Merci de répondre aux questions avec les réactions adéquates" });

        message.channel.send({ embeds: [bnembled] });
        message.channel.send(`${pconcerné}`);
    }
});

client.on("messageCreate", message => {
    //bvn
    if (message.content === "bvn") {
        message.delete();
        const bvnembled = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`:wave: **${message.member.displayName}** vous souhaite la bienvenue sur le serveur **${message.guild.name}** !`);

        message.channel.send({ embeds: [bvnembled] });
    }
    //bn
    if (message.content === "bn") {
        message.delete();
        const bnembled = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`**${message.member.displayName}** vous souhaite une bonne nuit 🌃🛌 !`);

        message.channel.send({ embeds: [bnembled] });
    }
    //pfx
    if (message.content === "pfx") {
        message.delete();
        const pfxembled = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`Le bot **${client.user.username}** a pour préfixe : **%**`);

        message.channel.send({ embeds: [pfxembled] });
    }
});

client.on('guildMemberAdd', (member) => {
    client.channels.cache.get('933478051222782066').send(`Bienvenue sur le serveur ${member.user.username}!`);
});



function Loadbdd() {
    try {
        return JSON.parse(fs.readFileSync(bddPath, "utf-8"));
    } catch (error) {
        console.error("Erreur de lecture du fichier JSON :", error);
        return { Argent: {} };
    }
}

function Savebdd() {
    fs.writeFileSync(bddPath, JSON.stringify(bdd, null, 4), "utf-8");
}

client.on("messageCreate", message => {
    if (message.content === config.prefix + "enregistrer") {
        let utilisateur = message.author.id;

        // Vérifier si l'utilisateur est déjà enregistré
        if (bdd.Argent.hasOwnProperty(utilisateur)) {
            return message.reply(`✅ Vous êtes déjà enregistré avec **${bdd.Argent[utilisateur]}** crédits !`);
        }

        // Ajouter l'utilisateur avec un solde initial de 100 crédits
        bdd.Argent[utilisateur] = 100;
        Savebdd();

        message.reply("✅ Vous êtes maintenant enregistré avec **100 crédits** !");
    }

    if (message.content === config.prefix + 'pay') {
        let utilisateur = message.author.id;
        bdd = Loadbdd(); // Recharger les données avant d'exécuter la commande

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

        // Vérifier si l'utilisateur est bien enregistré
        if (!bdd || !bdd.Argent || !bdd.Argent.hasOwnProperty(utilisateur)) {
            return message.channel.send(`❌ Vous n'êtes pas encore enregistré ! Utilisez \`${config.prefix}enregistrer\` pour commencer.`);
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
    }

    // Shop command
    if (message.content === config.prefix + "shop") {
        message.delete();
        const shop = new EmbedBuilder()
            .setColor("#ADD8E6")
            .setTitle("🛍️ Shop")
            .setAuthor("Jocasta Nu", 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPOv3mF2SwoXLFh5UinX1yzp1HlmkqPofqg&usqp=CAU",
                "https://discord.js.org")
            .setDescription("\u200b")
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png")
            .addFields(
                { name: "⚔️ Rôle", value: "*Boutique des rôles*" },
                { name: "Richissime", value: "**Coût :** 10 000", inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
                { name: "Test", value: "**En cours de programmation**", inline: true }
            )
            .setTimestamp()
            .setFooter("Bot créé par Malakili", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTHkHMajWv-TJTjAjjiY8MUWgQNgfv3J_Eg&usqp=CAU");

        message.channel.send({ embeds: [shop] });

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("select")
                    .setPlaceholder("Sélectionner un article")
                    .addOptions([
                        {
                            label: "Richissime",
                            description: "Coût: 10 000",
                            value: "richissime"
                        },
                        {
                            label: "Test",
                            description: "En cours de programmation",
                            value: "test"
                        }
                    ])
            );
        message.channel.send({ content: "**Menu déroulant des rôles**", components: [row] });
    }
});

// Rôle selection
client.on("interactionCreate", interaction => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "select") {
            if (interaction.values[0] === "richissime") {
                const utilisateur = interaction.user.id;

                if (bdd["Argent"][utilisateur] < 10000) {
                    interaction.channel.bulkDelete(2).catch();

                    const notEnoughMoney = new EmbedBuilder()
                        .setTitle("Not enough money")
                        .setDescription("Vous n'avez pas assez d'argent pour acheter le rôle Richissime.")
                        .setColor("RED");
                    return interaction.reply({ embeds: [notEnoughMoney], ephemeral: true });
                } else {
                    interaction.channel.bulkDelete(2).catch();
                    const shoprolerichissime = new EmbedBuilder()
                        .setColor("#ADD8E6")
                        .setTitle("⚔️ *Boutique des rôles*");

                    interaction.channel.send({ embeds: [shoprolerichissime] }).then(channel => {
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("acheter")
                                    .setLabel("ACHETER")
                                    .setStyle(ButtonStyle.Primary)
                                    .setEmoji("🛒")
                            )
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("quitter")
                                    .setLabel("QUITTER")
                                    .setStyle(ButtonStyle.Danger)
                                    .setEmoji("❌")
                            );
                        const Achatrichissime = new EmbedBuilder()
                            .setColor("#ADD8E6")
                            .setTitle("🛍️ Shop")
                            .setDescription("\u200b")
                            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Shop.svg/1200px-Shop.svg.png")
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

// Vérification achat rôle richissime
client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    const utilisateur = interaction.user.id;

    if (interaction.customId === "acheter") {
        interaction.channel.bulkDelete(2);
        if (alreadyBought.includes(utilisateur)) {
            return await interaction.reply({ content: "Vous avez déjà acheté cet article !", ephemeral: true });
        }

        alreadyBought.push(utilisateur);
        bdd["Argent"][utilisateur] -= 10000;
        Savebdd();

        const merciachat = new EmbedBuilder()
            .setColor("#ADD8E6")
            .setTitle("✅ **Merci de votre achat**");

        await interaction.member.roles.add("1047197631706828861").catch(console.error);
        await interaction.reply({ embeds: [merciachat], ephemeral: true });
    }

    if (interaction.customId === "quitter") {
        interaction.channel.bulkDelete(2);
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

client.on("messageCreate", async (message) => {
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
        let channel = await guild.channels.create({
            name: `pendu-${user.username}`,
            type: 0, // GUILD_TEXT
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                },
                {
                    id: client.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                }
            ]
        });

        message.reply(`🔹 Ta partie de pendu a commencé ! Rejoins le salon : <#${channel.id}>`);

        let themeSelection = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
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

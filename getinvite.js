const ownerIDS = "YOUR ID";
  const ee = require(`../../botconfig/embed.json`);
  const {
    MessageEmbed
  } = require(`discord.js`);
module.exports = {

        name: "getinvite",
        aliases: ['getinv', 'gi'],
        category: "Owner",
        description: "Generates an invitation to the server in question.",
        usage: "[ID | name]",
        accessableby: "Owner",

    run: async(bot, message, args) => {
        if (message.author.id === ownerIDS) {
        let guild = null;

        if (!args[0]) return message.lineReplyNoMention(new MessageEmbed() .setDescription(`Enter An Name or Guild ID`))

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.lineReplyNoMention(new MessageEmbed() .setDescription(`Invalid ID or Name`));
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.lineReplyNoMention("An Error Has Occured Try Again!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.lineReplyNoMention(`${err} has occured!`);
            });
            message.lineReplyNoMention( new MessageEmbed() .setDescription(`Hey ${message.author} This is a invite  Link for [${guild.name}](${invite.url})`) .setColor(ee.color));
        } else {
            return message.lineReplyNoMention( (new MessageEmbed() .setDescription(`\`${args.join(' ')}\` - Real is Not in this server`) .setColor(ee.color)));
        }
    } else {
        return;
    }
    }

}
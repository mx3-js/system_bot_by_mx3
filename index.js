const express = require('express');
const app = express();

app.listen(() => console.log('Hi.'));

app.use('/ping', (req, res) => {
	res.send(new Date());
});

const Discord = require('discord.js');
const client = new Discord.Client();
//
client.on('ready', () => {
	console.log(`Iam Here...`);
});
var prefix = '!'; 
var owners = '566185438121820161 , 414198033547526145';  
//
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});
client.on('ready', () => {
	client.user.setStatus('online'); 
});
client.on('ready', () => {
	client.user.setActivity(`${prefix}help.`, {
		
		type: 'PLAYING'
	}); 
});
client.login(`ODY5ODMxODkyODE0NDE3OTMw.YQD8Ew.KgzoWe2HOEy58UB50dq31ds-Xzc`);
//
client.on('message', msg =>{
    if(msg.content === prefix +"bot"){
    const embed = new Discord.MessageEmbed()
    .setColor("blue")
    .setTitle(` ${client.user.username} `)
    .addField('``My Name``' , ` ${client.user.tag}` , true)
    .addField('``servers``', ` ${client.guilds.cache.size} `, true)
    .addField('``channels``', ` ${client.channels.cache.size} `, true)
    .addField('``Users``', ` ${client.users.cache.size} `, true)
    .addField('``My ID``' , ` ${client.user.id} ` , true)
    .addField('``Dev By``' , ` <@566185438121820161> ` , true)
    msg.channel.send(embed);
    }
    });
//
//mute/unmute
client.on('message', async normal => {
    if (normal.content.startsWith(prefix + "mute")){
          if(!normal.member.hasPermission('MANAGE_ROLES')) return normal.channel.send("You don't have permissions")
           const args = normal.content.slice(prefix.length).trim().split(/ +/g);
          var member = normal.mentions.members.first()||normal.guild.members.cache.get(args[1])||normal.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
                  if(!member) return normal.channel.send(`**Please Mention user or Type the user ID/Username ${args.slice(1).join(' ')} **`)
                  if (member.id === normal.author.id)return normal.reply(`**You can't mute yourself**`)
        if (member.id === normal.guild.me.id)return normal.reply(`**You can't mute me dumbass**`)
          let mutedrole = normal.guild.roles.cache.find(ro => ro.name === 'muted')
          if(!mutedrole) {
          try {
          var createdrole = await normal.guild.roles.create({
                        data : {
                          name : 'muted',
                          permissions: [],
                      }});
                          normal.guild.channels.cache.forEach(async (channel, id) => {
                              await channel.createOverwrite(createdrole, {
                                  SEND_MESSAGES: false,
                                  ADD_REACTIONS : false
                              })
                          })
                  } catch (err) {
                  console.log(err)
              }};
  let muterole = normal.guild.roles.cache.find(r => r.name === 'muted')
           member.roles.add(muterole)
          normal.channel.send(`**${member.user.username} Has been muted**`)
      } 
  })
  client.on('message', async normal => {
    if (normal.content.startsWith(prefix + "unmute")){
      var args = normal.content.slice(prefix.length).trim().split(/ +/g);
          if(!normal.member.hasPermission('MANAGE_ROLES')) return normal.channel.send("You don't have permissions");
          var member = normal.mentions.members.first()||normal.guild.members.cache.get(args[1])||normal.guild.members.cache.find(m => m.user.username === args.slice(1).join(' '));
                       if(!member) return normal.channel.send(`**Please Mention user or Type the user ID/Username **`)
                  let muterole = normal.guild.roles.cache.find(r => r.name === 'muted')
          if(!member.roles.cache.has(muterole.id))return normal.channel.send(`**${member.user.username} is not muted**`)
          await member.roles.remove(muterole);
          normal.channel.send(`**${member.user.username} Has been unmuted**`)
    }})

//
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "unban")) {
        if (message.channel.type == "dm") return;
        if (message.author.bot) return;
        try {
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(
                new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❌" + " **You Need `BAN_MEMBERS` Permission To Use This Command!**")
            );
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {
                    message.reply(
                        new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription(
                            `**❌ | Thare Is No Bannded Members!**`
                        )
                    );
                };
                bans.forEach(ban => {
                    message.guild.members.unban(ban.user.id);
                    let una = bans.size;
                    message.channel.send(
                        new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(
                            `**✅ | Done Unbaned ${una} Members!**`
                        )
                    )
                });
            })
        } catch (e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``)
            console.log()
        }
    }
})
//
client.on("message", (message) => {
    if (message.content.toLowerCase().startsWith(prefix + "ban")) {
        var args = message.content.split(' ')
        var member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        var trueUser = message.guild.member(member);
        var reason = message.content.split(' ').slice(3).join(' ') || 'undefined';
        var time = args[2] || '1y'
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **I Can't Bannd Any Member In This Server Becuse I Don't Have `BAN_MEMBERS` Permission!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **You Need `BAN_MEMBERS` Permission To Use This Command!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!trueUser) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **Please Mention/ID Same One!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!reason) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("❌" + " **Please Type Reason!**\n Ex: " + `${prefix}ban @user 4d spam`).setFooter(`Request By ${message.author.tag}`).setTimestamp());
        trueUser.ban({ reason: reason }).then(() => {
            message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription("✅" + ` **<@!${trueUser.user.id}> banned from the server ! :airplane: by:<@${message.author.id}> **`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
            setTimeout(() => {
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) return;
                    bans.forEach(ban => {
                        if (ban.user.id == trueUser.user.id) {
                            message.guild.members.unban(ban.user.id);
                        } else console.log(ban.user.id + " => " + trueUser.user.id)
                    });
                });
            }, ms(time))
        })
    }
})
//
client.on("message", msg => {
    if (
      msg.content == prefix + "roll"
    ) {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(error + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
   
      var x = ["0", "0", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
      var x3 = Math.floor(Math.random() * x.length);
      msg.channel.send(`${x[x3]}`)
    }
  })
//
client.on("message",message => {
    var args = message.content.split(" ");
    var command = args[0];
    var emojisname = args[1];
    var emojislink = args[2];
    if (command === prefix + "addemoji"){
        if (!message.guild){
            return message.channel.send("Only SERVER Commands");
        }
        if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS")){
            return message.channel.send("i don't have any premissions  `MANAGE_EMOJIS`");
        }
        if(!message.guild.member(message.author).hasPermission("MANAGE_EMOJIS")) {
            return message.channel.send("you don't hane any premissions `MANAGE_EMOJIS`");
        }
        if(!emojisname){
            return message.channel.send("Type emoji's name");
        }
        if (!emojislink){
            return message.channel.send("Type emoji's url");
        }
        message.guild.emojis.create(emojislink, emojisname).then(emoji =>{
            message.channel.send("Emoji Created . <:"+emoji.name+":"+emoji.id+">")
        }).catch(err => message.channel.send("Emoji must be under 256kb in size"));
    }
});
//
var moment = require("moment");
client.on(`message`, message => {
    if (message.content.startsWith(prefix + "server")) {
        if (!message.channel.guild) return message.channel.send('This is for servers only');
 
        const text = message.guild.channels.cache.filter(r => r.type === "text").size
        const voice = message.guild.channels.cache.filter(r => r.type === "voice").size
        const chs = message.guild.channels.cache.size
        const avaibles = message.guild.features.map(features => features.toString()).join("\n")
 
        const roles = message.guild.roles.cache.size
 
        const online = message.guild.members.cache.filter(m =>
            m.presence.status === 'online'
        ).size
 
        const idle = message.guild.members.cache.filter(m =>
            m.presence.status === 'idle'
        ).size
 
        const offline = message.guild.members.cache.filter(m =>
            m.presence.status === 'offline'
        ).size
 
        const dnd = message.guild.members.cache.filter(m =>
            m.presence.status === 'dnd'
        ).size
 
        const black = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setColor('BLACK')
            .addFields({
                name: `🆔 Server ID`,
                value: `${message.guild.id}`,
                inline: true
 
            }, {
                name: `📆 Created On`,
                value: moment(message.guild.createdAt).format("YYYY/MM/DD, HH:mm") + '\n' + moment(message.guild.createdAt, "YYYYMMDD").fromNow(),
                inline: false
            }, {
                name: `👑 Owned By`,
                value: `${message.guild.owner}`,
                inline: false
 
            }, {
                name: `👥 Members (${message.guild.memberCount})`,
                value: `**${online}** Online \n **${message.guild.premiumSubscriptionCount}** Boosts ✨`,
                inline: false
            }, {
                name: `💬 Channels (${chs})`,
                value: `**${text}** Text | **${voice}** Voice`,
                inline: false
            }, {
                name: `🌍 Others`,
                value: `**Region:** ${message.guild.region}\n**Verification Level:** ${message.guild.mfaLevel}`,
                inline: false
            }, {
                name: `🔐 Roles (${roles})`,
                value: `To see a list with all roles use ${prefix}roles`,
                inline: false
            }, )
            .setFooter('Rexy', message.author.avatarURL())
        message.channel.send(black)
    }
});
//
client.on("message", (ncrTeam) => {
    if (ncrTeam.content.startsWith(prefix + "roles")) {
        let Roles = ncrTeam.guild.roles.cache.map(ncr => `"${ncr.name}" - ${ncr.id} - ${ncr.members.array().length}`).sort().join("\n");
        ncrTeam.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(ncrTeam.author.username, ncrTeam.author.avatarURL({ dynamic: true }))
            .setColor(ncrTeam.member.displayHexColor)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(ncrTeam.guild.iconURL({ dynamic: true }))
            .setDescription(
                "```js\n" + Roles + "\n```", { split: { char: "\n" } }
            )
        );
    }
})
//
client.on('message', ncr => {
    if (!ncr.guild) return;
    if (ncr.content.startsWith( prefix + 'kick') || ncr.content.startsWith( prefix + 'طرد')) {
      if (!ncr.guild.member(ncr.author).hasPermission("KICK_MEMBERS"))
        return ncr.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
        if (!ncr.guild.member(client.user).hasPermission("KICK_MEMBERS"))
        return ncr.reply("**I Don't Have ` KICK_MEMBERS ` Permission**"); 
      const user = ncr.mentions.users.first();
      if (user) {
        const member = ncr.guild.member(user);
        if (member) {
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
            
          
              const embed = new Discord.MessageEmbed()
             .setColor("00e8ff")
            .setTitle(`Successfully kicked ${user.tag}`)
            ncr.channel.send(embed);
   
            })
            .catch(err => {
   
              ncr.reply(`🙄 - I couldn't kick that user. Please check my permissions and role position.`);
              
              console.error(err);
            });
        } else {
         
          ncr.reply("**🙄 - I can't find this member**");
        }
        
      } else {
   
  const embed = new Discord.MessageEmbed()
  .setColor("00e8ff")
  .setTitle(`**Command: kick**`)
  .setDescription(
  `Kicks a member.
   
  **Usage:**
  #kick (user) (reason)
   
  **Examples:**
  #kick ${ncr.author}`)
   
  ncr.channel.send(embed);
      }
    }
  });
//
client.on('message', async message => {
    if (message.content.startsWith(prefix + 'lock')) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**`);
        let channel = message.mentions.channels.first();
        let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
        if (!channel) channel_find = message.channel
        if (!channel_find) return;
        channel_find.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js\n🔒 | Done Locked ${channel_find.name}\n\`\`\``)
        );
    }
});
client.on('message', async message => {
    if (message.content.startsWith(prefix + 'unlock')) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**`);
        let channel = message.mentions.channels.first();
        let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
        if (!channel) channel_find = message.channel;
        if (!channel_find) return;
        channel_find.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js\n🔓 | Done Unlocked ${channel_find.name}\n\`\`\``)
        );
    }
});
//
client.on("message", async message => {
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    if (command == "clear" || command == "مسح") {
        message.delete({ timeout: 0 })
        if (!message.channel.guild) return message.reply(`** This Command For Servers Only**`);
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms :x:**`);
        if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms :x:**`);
        let args = message.content.split(" ").slice(1)
        let messagecount = parseInt(args);
        if (args > 100) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js
i cant delete more than 100 messages 
\`\`\``)
        ).then(messages => messages.delete({ timeout: 5000 }))
        if (!messagecount) messagecount = '100';
        message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
            message.channel.send(
                new Discord.MessageEmbed()
                .setDescription(`\`\`\`js
${msgs.size} messages cleared
\`\`\``)
            ).then(messages =>
                messages.delete({ timeout: 5000 }));
        })
    }
});
//
//
const color = 'FF00FB'; 
const description = `${prefix}bot "This code will show you the robot's information"
${prefix}avatar "This code shows you the profile picture of any account"
${prefix}server "This code shows you the information of any server"
${prefix}roll "This is like a dice that gives you a random number from 1 - 100"
${prefix}roles "This code shows the number of roles for any server"
${prefix}avatar server "This code shows the image of the server"
${prefix}user "This code shows your account's information"
${prefix}invite "to invite my bot to your server (:"
${prefix}support "to join the bot's support server"
--------**Admin Commands**---------
${prefix}ban 
${prefix}unban  
${prefix}kick
${prefix}create-colors
${prefix}mute
${prefix}unmute
${prefix}clear
${prefix}lock
${prefix}unlock
${prefix}set-nick
${prefix}addemoji
${prefix}role 

`; 
 
client.on('message', message => {
    if (message.content.startsWith(prefix + "help")) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setColor(color)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(description)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            message.react("✅")
        return message.author.send(embed);
    }
})
//

//

//
client.on("message", async(niro_sys) => {
    var error = "❌";
    var success = "✅";
    var lodeing = "🤔";
    if (niro_sys.author.bot) return;
    if (niro_sys.channel.type == "dm") return niro_sys.channel.send(new Discord.MessageEmbed().setTitle(error + " **You Can't Use This Command In DM!**"))
    if (niro_sys.content.startsWith(prefix + "help-adm")) {
        niro_sys.channel.send(lodeing + " **Processing data ...**").then((m) => {
            setTimeout(() => {
                m.edit(success + " **Processing is complete**")
            }, 1000)
        })
        setTimeout(() => {
            niro_sys.channel.send(
                new Discord.MessageEmbed()
                .setAuthor(niro_sys.author.username, niro_sys.author.avatarURL({ dynamic: true }))
                .setThumbnail(niro_sys.member.user.avatarURL({ dynamic: true }))
                .addField(prefix + "ban", "-", true )
                .addField(prefix + "unban", "-", true )
                .addField(prefix + "kick", "-", true )
                .addField(prefix + "mute", "-", true )
                .addField(prefix + "unmute", "-", true )
                .addField(prefix + "vmute", "-", true )
                .addField(prefix + "unvmute", "-", true )
                .addField(prefix + "addemoji", "addemojies for your discord server", true )
                .addField(prefix + "clear", "Clear text channels" )
                .addField(prefix + "role", "Manage roles for any member" )
                .addField(prefix + "lock", "lock any text channel" )
                .addField(prefix + "unlock", "unlock Any text channel" )
                .addField(prefix + "set-nick", "change the nickname for anyone at the server" )
                .addField(prefix + "create-colors", "to create a random colors" )
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(niro_sys.member.displayHexColor)
            )
        }, 1400);
    }
})
//

//
client.on("message", message => {
    if (message.content.startsWith(prefix + "set-nick")) {
      if (!message.member.hasPermission("CHANGE_NICKNAME")) return message.reply("You Dont Have Permission")
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      let member = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.user.username === args[1])
      if (!member) return message.reply(`Type User Example: ${prefix}setnick @user`)
      let nick = message.content.split(" ").slice(2).join(" ")
      let g = message.guild.members.cache.get(member.id)
      if (!nick) {
        g.setNickname(member.username)
      }
      g.setNickname(nick)
      const l = g.nickname || member.username
      let embed = new Discord.MessageEmbed()
        .setAuthor(message.member.user.username, message.member.user.avatarURL({ dynamic: true }))
        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
        .setTitle("New NickName:")
        .addField(`User Nick Change`, `${member}`, true)
        .addField(`Befor:`, `**${l}**`, true)
        .addField(`After:`, `**${nick}**`, true)


        .setFooter(message.member.user.username, message.member.user.avatarURL({ dynamic: true }))
        .setTimestamp()
      message.channel.send(embed)
    }
})
//
client.on("message", msg => {
    const error = "❌";
    const timeing = "⏱";
    const success = "✅";
    const lodeing = "🤔";
      let args = msg.content.split(" ").slice(1).join(" ");
      if (msg.content.startsWith(prefix + "create-colors")) {
        if (msg.author.bot) return;
        if (msg.channel.type == "dm") return msg.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(error + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
        if (!args) return msg.channel.send("` Please choose the number of colors `");
        if (!msg.member.hasPermission("MANAGE_ROLES"))
          return msg.channel.send("`**⚠ | you don't have this permission `[MANAGE_ROLES]`  **");
        msg.channel.send(`**${success} |Created __${args}__ Colors**`);
        setInterval(function() { });
        let count = 0;
        let ecount = 0;
        for (let x = 1; x < `${parseInt(args) + 1}`; x++) {
          msg.guild.roles.create({ data: { name: x, color: "RANDOM" } });
        }
      }
    });
//
client.on("message", (msg) => {
    if (msg.content.startsWith(prefix + 'invite')) {
        return msg.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL({ dynamic: true }))
            .setColor("RED")
            .setThumbnail(msg.guild.iconURL({ dynamic: true }))
            .setTitle('Click Here')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=869831892814417930&permissions=261993005047&scope=bot `)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        )
    }
})
//
client.on("message", (msg) => {
    if (msg.content.startsWith(prefix + 'support')) {
        return msg.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL({ dynamic: true }))
            .setColor("RED")
            .setThumbnail(msg.guild.iconURL({ dynamic: true }))
            .setTitle('Click Here')
            .setURL(`https://discord.gg/dNEfDEgtAD `)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        )
    }
})
//
client.on('message', message =>{
if(message.content === prefix +"hide"){
if(message.author.bot || !message.guild) return;
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.channel.createOverwrite(everyone, {
              VIEW_CHANNEL : false
            }).then(() => {
                                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
               .setThumbnail(message.guild.iconURL())
                .setDescription(`> **Done Hide This Room ${message.channel}**`)
                .setFooter(`By ${message.author.username}`)
                message.channel.send(embed)
                })
}
});
 
client.on('message', message =>{
if(message.content === prefix +"show"){
if(message.author.bot || !message.guild) return;
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
        message.channel.createOverwrite(everyone, {
               VIEW_CHANNEL: true
            }).then(() => {
                const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`> **Done Show This Room ${message.channel}**`)
                
                .setFooter(`By ${message.author.username}`)
                message.channel.send(embed)
                })
}
});
//
client.on('message', kmsg => {
    const pmention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (kmsg.content.match(pmention)) {
      return kmsg.reply(`**My prefix is : ${prefix}**`)
    }
  })
//
     
client.on("message", async (message) => {
    let DIG = require("discord-image-generation");
        if (message.content.startsWith(prefix + "delete")) {
                  let user = message.mentions.users.first();
                  if(!user) return message.reply("need mention user")
            let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
            const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
            let img = await new DIG.Delete().getImage(`${avatar2}`);
            let attach = new Discord.MessageAttachment(img, "Delete.png");;
            message.channel.send(attach)
        }
    });

//
const { Snake, TicTacToe, Calculator, ShuffleGuess } = require("weky");
 
client.on('message', async function(message) {
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type == "dm") return;
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'TicTacToe') || message.content.startsWith(prefix + 'ttt')) {
        const args = message.content.split(' ')
        const player2 =
            message.mentions.users.first() ||
            message.guild.members.cache.find(u => u.id == args[1]) ||
            message.guild.members.cache.find(u => u.user.username == args[1]) ||
            message.guild.members.cache.find(u => u.nickname == args[1]);
        if (!player2) return message.channel.send("**❌ | Please Type Player2 <id/ username/ mention/ nickname> after the command**");
        const game = new TicTacToe({
            message: message,
            opponent: player2,
            xColor: 'red',
            oColor: 'blurple',
            xEmoji: '❌',
            oEmoji: '⭕',
        });
        game.start()
    }
});
//
client.on('message', msg =>{
    if(msg.content === prefix +"bot"){
    const embed = new Discord.MessageEmbed()
    .setColor("blue")
    .setTitle(` ${client.user.username} `)
    .addField('Name :' , ` ${client.user.tag}` , true)
    .addField('Servers :', ` ${client.guilds.cache.size} `, true)
    .addField('Channels :', ` ${client.channels.cache.size} `, true)
    .addField('Users : ', ` ${client.users.cache.size} `, true)
    .addField('`ID' , ` ${client.user.id} ` , true)
    .addField('``Dev By``' , ` <@566185438121820161> ` , true)
    msg.channel.send(embed);
    }
    });
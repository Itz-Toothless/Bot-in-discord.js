const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'Add a role to a user',
    aliases: ['ar'],
    usage: 'ds!addrole <user> <role>',
    run: async (client, msg, args) => {
        try {
            if (!msg.member.permissions.has('MANAGE_ROLES')) {
                return msg.channel.send('You do not have permission to use this command!');
            }
            if (!msg.guild.me.permissions.has('MANAGE_ROLES')) {
                return msg.channel.send('I do not have permission to use this command!');
            }

            if (!args[0]) return msg.channel.send('Please provide a user and a role.')
            if (!args[1]) return msg.channel.send('Please provide a user and a role.')
            let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || await msg.guild.members.fetch(args[0]);
            let role = msg.mentions.roles.first() || msg.guild.roles.cache.find(r => r.id === args[1])
            if (msg.member.roles.highest.comparePositionTo(role) <= 0) {
                return msg.channel.send('You do not have permission to assign this role.')
            }
            if (!role.editable) {
                return msg.channel.send('I do not have permission to give this role!');
            }
            await user.roles.add(role.id)
            let embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${user.user.tag} has been given the role ${role.name}`)
                .setTimestamp()
            return msg.channel.send({ embeds: [embed] })
        } catch (err) {
            console.log(err);
        }
    }
};

const Discord = require('discord.js');
const token = require('./token.json');
const client = new Discord.Client();

const logChannelId = '450042280641036288';
let logChannel = undefined;

client.on('ready', () => {
	console.log(`${client.user.tag} initialised`);
	
	if (client.channels.get(logChannelId) == undefined)
		console.error('The defined logging channel is not found.');
	else 
		logChannel = client.channels.get(logChannelId);
});


client.on('messageDelete', message => {
	if (message.channel.type !== 'text' || message.channel.id === logChannelId) return;

	let log = new Discord.RichEmbed();
	log.setTitle('🗑 Message deleted');
	log.addField('User', message.author.tag, true);
	log.addField('UserID', message.author.id, true);
	log.addField('Message', (message.cleanContent === '' ? '<empty message>' : message.cleanContent));
	log.addField('MessageID', message.id);
	log.addField('Channel', message.channel.name);
	log.addField('ChannelID', message.channel.id);
	log.addField('Has attachment?', (message.attachments.size === 0) ? 'No' : 'Yes');
	log.setColor('#EE4444');
	logChannel.send(log).catch(console.error);
});

client.on('message', message => {
	if (message.channel.type !== 'text' || message.channel.id === logChannelId) return;
	if (message.attachments.size > 0) {
		let log = new Discord.RichEmbed();
		log.setTitle('📎 Attachment');
		log.addField('User', message.author.tag, true);
		log.addField('UserID', message.author.id, true);
		log.addField('Message', (message.cleanContent === '' ? '<empty message>' : message.cleanContent));
		log.addField('MessageID', message.id);
		log.addField('Channel', message.channel.name);
		log.addField('ChannelID', message.channel.id);
		log.attachFile(message.attachments.first().url);
		log.setColor('#44EE44');
		logChannel.send(log).catch(console.error);
	}
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.channel.type !== 'text' || oldMessage.channel.id === logChannelId) return;

	let log = new Discord.RichEmbed();
	log.setTitle('🔧 Message edited');
	log.addField('User', oldMessage.author.tag, true);
	log.addField('UserID', oldMessage.author.id, true);
	log.addField('Old Message', (oldMessage.cleanContent === '' ? '<empty message>' : oldMessage.cleanContent));
	log.addField('New Message', (newMessage.cleanContent === '' ? '<empty message>' : newMessage.cleanContent));
	log.addField('MessageID', oldMessage.id);
	log.addField('Channel', oldMessage.channel.name);
	log.addField('ChannelID', oldMessage.channel.id);
	log.addField('Has attachment?', (oldMessage.attachments.size === 0) ? 'No' : 'Yes');
	log.setColor('#EE4444');
	logChannel.send(log).catch(console.error);
});

client.login(token.discord);
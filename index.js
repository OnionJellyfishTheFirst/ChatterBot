// Require discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

// Creating client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

// Creating a collection to store commands on start
client.commands = new Collection();

// Creating file path and locating command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commansPath).filter(file => file.endsWith('.js'));

// Adding the command files to the collection
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in collection
    if ('data' in command && 'execute' in command)
    {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Command at ${filePath} is missing requirements`);
    }
}

// Print to console when client is running
client.once(Events.ClientReady, c => {
    console.log(`Client Logged in as ${c.user.tag}`);
});
// Creating an interaction listener
client.on(Events.InteractionCreate, async i => {
    if(!i.isChatInputCommand()) return;
    
    const command = i.client.commands.get(i.commandName);
    // Command execution handler
    if(!command) {
        console.error(`${i.commandName} no command found!`);
        return;
    }

    try {
        await command.execute(i);
    } catch (error) {
        console.error(error);
        await i.reply({ content: 'Error executing command!', ephemeral: true});
    }
})

// Logging into Discord using client token
client.login(process.env.TOKEN)
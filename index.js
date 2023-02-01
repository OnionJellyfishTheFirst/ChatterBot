// Require discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Creating client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

// Print to console when client is running
client.once(Events.ClientReady, c => {
    console.log(`Client Logged in as ${c.user.tag}`);
});

// Logging into Discord using client token
client.login(process.env.TOKEN)
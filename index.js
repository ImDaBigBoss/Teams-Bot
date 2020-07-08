// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// index.js is used to setup and configure your bot

// Import required pckages
const path = require('path');
const restify = require('restify');
var Client = require("uptime-robot");

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter } = require('botbuilder');
const { TeamsMessagingExtensionsActionBot } = require('./bots/extensions');
const { TeamsConversationBot } = require('./bots/teamsConversationBot');

// Read botFilePath and botFileSecret from .env file.
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const adapter2 = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId2,
    appPassword: process.env.MicrosoftAppPassword2
});

adapter.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('Please refer to ImDaBigBoss and tell him when and how your problem occured!');
};

adapter2.onTurnError = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('Please refer to ImDaBigBoss and tell him when and how your problem occured!');
};

// Create the bot that will handle incoming messages.
const bot = new TeamsConversationBot();
const bot2= new TeamsMessagingExtensionsActionBot();

// Create HTTP server.
const server = restify.createServer();
server.listen(process.env.PORT, function() {
    console.log(`Your app is listening on port ${process.env.PORT}`);
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});

server.post('/api/ext', (req, res) => {
    adapter2.processActivity(req, res, async (context) => {
        await bot2.run(context);
    });
});

server.get('/', restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.get('/help.html', restify.plugins.serveStatic({
  directory: './public',
}));


server.get('/terms', restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.get('/privacy', restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.get('/terms/', restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.get('/privacy/', restify.plugins.serveStatic({
  directory: './public',
  default: 'index.html'
}));

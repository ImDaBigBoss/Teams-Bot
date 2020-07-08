# Teams Conversation Bot

Bot Framework v4 Conversation Bot sample for Teams.

This bot has been created using [Bot Framework](https://dev.botframework.com). This sample shows
how to incorporate basic conversational flow into a Teams application. It also illustrates a few of the Teams specific calls you can make from your bot.

## Prerequisites

- Microsoft Teams is installed and you have an account
- [NodeJS](https://nodejs.org/en/)

## To try this sample

- remix on glitch
- make a teams app using appstudio
- add a bot and an extension bot (both different)
- add ```MicrosoftAppId``` and ```MicrosoftAppPassword``` to .env and put the simple bot's details in there
- add ```MicrosoftAppId2``` and ```MicrosoftAppPassword2``` to .env and put the extension bot's details in there
- **VERY IMPORTANT :** add ```PORT``` to .env and set it to ```3000``` or you will **not** be able to test your app! You may also use [ngrok](https://ngrok.com/) or equivalent tunnelling solution.
- now, go to test and distribute, install, and you are ready to go!


# To test the bot!

## Interacting with the bot

Type ```help``` or ```@{BOT NAME} help``` if you are in a team or group chat

### Avoiding Permission-Related Errors

You may encounter permission-related errors when sending a proactive message. This can often be mitigated by using `MicrosoftAppCredentials.trustServiceUrl()`. See [the documentation](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-proactive-message?view=azure-bot-service-4.0&tabs=javascript#avoiding-401-unauthorized-errors) for more information.

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.

## Further reading

- [How Microsoft Teams bots work](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics-teams?view=azure-bot-service-4.0&tabs=javascript)


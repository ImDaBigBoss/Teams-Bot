// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
  TurnContext,
  MessageFactory,
  TeamsInfo,
  TeamsActivityHandler,
  CardFactory,
  ActionTypes
} = require("botbuilder");
const TextEncoder = require("util").TextEncoder;
const GIPHY_API = "uY8oY3xE6fcKwffs6xlZhc2hlnLzLEkU";
const fs = require('fs');

class TeamsConversationBot extends TeamsActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {
      const mention = {
        mentioned: context.activity.from,
        text: `<at>${ new TextEncoder().encode(context.activity.from.name) }</at>`,
      };
      
      TurnContext.removeRecipientMention(context.activity);
      console.log("Message : " + context.activity.from.name + " : " + context.activity.text);
      const text = context.activity.text
        .trim()
        .toLocaleLowerCase()
        .split(" ")[0];
      const rest = context.activity.text
        .trim()
        .toLocaleLowerCase()
        .replace(text + " ", "");
      const restBig = context.activity.text.trim().replace(text + " ", "");

      if (text.includes("magic8")) {
        let ans = [
          "No",
          "Yes",
          "Maybe",
          "Think about is a bit more then try again...",
          "Absolutely",
          "Not at all",
          "Of couse!",
          "As it seems... Yes",
          "As it seems... No",
          "Could be",
          "Hell NO!"
        ];
        var num = Math.floor(Math.random() * ans.length);
        await context.sendActivity(ans[num]);
      } else if (text.includes("question")) {
        if (rest == "question") {
          await context.sendActivity("Yes?");
        } else {
          if (rest.includes("where")) {
            let ans = ["Mexico", "Paris", "France", "US"];
            var num = Math.floor(Math.random() * ans.length);
            await context.sendActivity(ans[num]);
          } else if (rest.includes("what")) {
            let ans = [
              "Food",
              "Pie",
              "iPhone",
              "chips",
              "Feet",
              "Pan",
              "Box",
              "poo"
            ];
            var num = Math.floor(Math.random() * ans.length);
            await context.sendActivity(ans[num]);
          } else if (rest.includes("why")) {
            let ans = [
              "Because",
              "That's the way it is...",
              "That's life",
              "It's a fact"
            ];
            var num = Math.floor(Math.random() * ans.length);
            await context.sendActivity(ans[num]);
          } else if (rest.includes("how")) {
            let ans = ["By doing it", "The way it will be done"];
            var num = Math.floor(Math.random() * ans.length);
            await context.sendActivity(ans[num]);
          } else {
            let ans = [
              "Hmmmm...",
              "Yes...",
              "Indeed...",
              "Mmmmmm...",
              "Ohhhhh..."
            ];
            var num = Math.floor(Math.random() * ans.length);
            await context.sendActivity(ans[num]);
          }
        }
      } else if (text == "searchgif") {
        var gifVar = "Failed to get GIF...";
        gifVar = fetch(`https://api.giphy.com/v1/gifs/search?&q=${restBig}&limit=100&api_key=${GIPHY_API}`)
        .then(async (response) => {return response.json(); })
        .catch(err => {
          console.log(err);
        })
        .then((resp => {
          let dataArray = resp.data
          gifVar = '<img src="' + dataArray[Math.floor(Math.random() * dataArray.length)].images.fixed_width.url.split('?')[0] + '">';
          this.returnTEXT(gifVar, context); 
        }));
        await context.sendActivity("Your gif");
      } else if (text == "gif") {
        var gifs = [
          "https://media.giphy.com/media/IMDSOJvLn9RaU/giphy.gif",
          "https://media.giphy.com/media/3o85xsGXVuYh8lM3EQ/giphy.gif",
          "https://media.giphy.com/media/3osxYefnq73uPKW2hG/giphy.gif",
          "https://media.giphy.com/media/IcifS1qG3YFlS/giphy.gif",
          "https://media.giphy.com/media/5xtDarobRW68tNCgjUA/giphy.gif",
          "https://media.giphy.com/media/khl6RE8XNiwxstKNzE/giphy.gif",
          "https://media.giphy.com/media/3o6ZtfV2PklGXZZkxG/giphy.gif",
          "https://media.giphy.com/media/zSFwihFta76P6/giphy.gif",
          "https://media.giphy.com/media/taR5Hge20Ur0k/giphy.gif",
          "https://media.giphy.com/media/2UEMOVIDd0CPBveU3w/giphy.gif",
          "https://media.giphy.com/media/l0IxZXvvqqedj9Y9q/giphy.gif",
          "https://media.giphy.com/media/LSQIITahhGK5SE9b6j/giphy.gif",
          "https://media.giphy.com/media/3o7aDbX1g0YDCyLWyQ/giphy.gif",
          "https://media.giphy.com/media/XOXdQszYm4I3m/giphy.gif"
        ];
        var num = Math.floor(Math.random() * gifs.length);
        await context.sendActivity('<img src="' + gifs[num] + '"></img>');
      } else if (text.includes("huge")) {
        const replyText = ': <h1 style="font-size: 150px;">' + restBig + "</h1>";
        this.messageAndTag(context, replyText);
      } else if (text.includes("enormous")) {
        const replyText = ': <h1 style="font-size: 300px;">' + restBig + "</h1>";
        this.messageAndTag(context, replyText);
      } else if (text.includes("magictext")) {
        const replyText = ': <p style="font-size: 100px;color:red;"><b><u><i>' + restBig + "</i></u></b></p>";
        this.messageAndTag(context, replyText);
      } else if (text.includes("large")) {
        const replyText = ': <h1 style="font-size: 50px;">' + restBig + "</h1>";
        this.messageAndTag(context, replyText);
      } else if (text.includes("spam")) {
        while (true == true) {
          await context.sendActivity(restBig);
        }
      } else if (text.includes("suggested")) {
        if (context.activity.from.name = "Alex, HUGHES") {
          if (rest.includes("list")) {
            await context.sendActivity("<h1>Suggestions:</h1>" + fs.readFileSync('/app/suggested.txt'));
          }
          else if (rest.includes("clear")) {
            fs.writeFileSync("suggested.txt", "");
            await context.sendActivity("Suggestions have been cleared!");
          }
          else {
            await context.sendActivity("Use suggested clear OR suggested list!");
          }
        }
        else {
          await this.cardActivityAsync(context, false);
        }
      } else if (text.includes("suggest")) {
        fs.appendFileSync("suggested.txt", "\n <br />"+  context.activity.from.name + " : " + restBig);
        await context.sendActivity("Your suggestion has been sent, we will check it out!");
      } else if (text.includes("help")) {
        var file = fs.readFileSync('/app/public/help.html');
        await context.sendActivity(file + "<br /><h1>By Alex</h1>");
      } else if (text.includes("praise")) {
        let ans = ["You are a good person.", "You are clever.", "You are a nice person.", "You're a gift to those around you.", "You're a smart cookie.", "You are awesome!", "I appreciate you.", "You have the best laugh.", "You are strong.", "You have the courage of your convictions.", "You bring out the best in other people.", "You're like a ray of sunshine on a really dreary day.", "You're even more beautiful on the inside than you are on the outside.", "You've got an awesome sense of humor!", "You light up the room.", "You are the most perfect you there is.", "You're a great listener.", "Being around you makes everything better!", "You're wonderful.", "You're one of a kind!", "You're a candle in the darkness.", "You're a great example to others.", "Who raised you? They deserve a medal for a job well done.", "Your voice is magnificent.", "You're so thoughtful.", "Your creative potential seems limitless.", "There's ordinary, and then there's you.", "You're someone's reason to smile.", "You're even better than a unicorn, because you're real.", "You have a good head on your shoulders.", "Thank you for being you.", "You're really something special."];
        await context.sendActivity(ans[Math.floor(Math.random() * ans.length)]);
      } else if (text.includes("math")) {
        await context.sendActivity("Answer = " + eval(rest.replace("x", "*").replace(":", "/").replace("÷", "/").replace("/[^-()\d/*+.]/g", '')));
      } else if (false) {
        await context.sendActivity("I'm talking w/ my dad!");
      } else {
        await this.cardActivityAsync(context, false);
      }
    });

    this.onMembersAddedActivity(async (context, next) => {
      context.activity.membersAdded.forEach(async teamMember => {
        if (teamMember.id !== context.activity.recipient.id) {
          await context.sendActivity(
            `Welcome to the team ${teamMember.givenName} ${teamMember.surname}`
          );
        }
      });
      await next();
    });
  }
  
  async returnTEXT(text, context) {
    var gifVar = text;
    await context.sendActivity(gifVar);
  }

  async cardActivityAsync(context, isUpdate) {
    const cardActions = [
      {
        type: "",
        title: "",
        value: "I did not understand!",
        text: "I did not understand!"
      },
      {
        type: ActionTypes.MessageBack,
        title: "help",
        value: null,
        text: "help"
      }
    ];

    if (isUpdate) {
      await this.sendUpdateCard(context, cardActions);
    } else {
      await this.sendWelcomeCard(context, cardActions);
    }
  }
  
  async messageAndTag(context, replyText) {
    const mention = {
      mentioned: context.activity.from,
      text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>`,
      type: "mention"
    };

    const replyActivity = MessageFactory.text(mention.text + replyText);
    replyActivity.entities = [mention];
    await context.sendActivity(replyActivity);
  }

  async sendUpdateCard(context, cardActions) {
    const data = context.activity.value;
    data.count += 1;
    cardActions.push({
      type: ActionTypes.MessageBack,
      title: "Update Card",
      value: data,
      text: "UpdateCardAction"
    });
    const card = CardFactory.heroCard(
      "Updated card",
      `Update count: ${data.count}`,
      null,
      cardActions
    );
    card.id = context.activity.replyToId;
    const message = MessageFactory.attachment(card);
    message.id = context.activity.replyToId;
    await context.updateActivity(message);
  }

  async sendWelcomeCard(context, cardActions) {
    const initialValue = {
      count: 0
    };
    /*cardActions.push({
            type: ActionTypes.MessageBack,
            title: 'Update Card',
            value: initialValue,
            text: 'UpdateCardAction'
        });*/
    const card = CardFactory.heroCard("Crazy bot!", "", null, cardActions);
    await context.sendActivity(MessageFactory.attachment(card));
  }

  async getSingleMember(context) {
    var member;
    try {
      member = await TeamsInfo.getMember(context, context.activity.from.id);
    } catch (e) {
      if (e.code === "MemberNotFoundInConversation") {
        context.sendActivity(MessageFactory.text("Member not found."));
        return;
      } else {
        console.log(e);
        throw e;
      }
    }
    const message = MessageFactory.text(`You are: ${member.name}`);
    await context.sendActivity(message);
  }
  
  async query(restBig) {
    return fetch(`https://api.giphy.com/v1/gifs/search?&q=${restBig}&limit=100&api_key=${GIPHY_API}`)
    .then(async (response) => {return response.json(); })
    .catch(err => {
      console.log(err);
      var gifVar = "Failed to get GIF...";
    })
    .then((resp => {
      // Here we get the data array from the response object
      let dataArray = resp.data
      // We pass the array to showGiphs function
      return '<img src="' + dataArray[Math.floor(Math.random() * dataArray.length)].images.fixed_width.url.split('?')[0] + '">';
    }));
  }

  async mentionActivityAsync(context) {
    const mention = {
      mentioned: context.activity.from,
      text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>`,
      type: "mention"
    };

    const replyActivity = MessageFactory.text(`Hi ${mention.text}`);
    replyActivity.entities = [mention];
    await context.sendActivity(replyActivity);
  }

  async deleteCardActivityAsync(context) {
    await context.deleteActivity(context.activity.replyToId);
  }

  // If you encounter permission-related errors when sending this message, see
  // https://aka.ms/BotTrustServiceUrl
  async messageAllMembersAsync(context) {
    const members = await this.getPagedMembers(context);

    members.forEach(async teamMember => {
      const message = MessageFactory.text(
        `Hello ${teamMember.givenName} ${teamMember.surname}. I'm a Teams conversation bot.`
      );

      var ref = TurnContext.getConversationReference(context.activity);
      ref.user = teamMember;

      await context.adapter.createConversation(ref, async t1 => {
        const ref2 = TurnContext.getConversationReference(t1.activity);
        await t1.adapter.continueConversation(ref2, async t2 => {
          await t2.sendActivity(message);
        });
      });
    });

    await context.sendActivity(
      MessageFactory.text("All messages have been sent.")
    );
  }

  async getPagedMembers(context) {
    var continuationToken;
    var members = [];
    do {
      var pagedMembers = await TeamsInfo.getPagedMembers(
        context,
        100,
        continuationToken
      );
      continuationToken = pagedMembers.continuationToken;
      members.push(...pagedMembers.members);
    } while (continuationToken !== undefined);
    return members;
  }
}

module.exports.TeamsConversationBot = TeamsConversationBot;

const TelegramBot = require("node-telegram-bot-api");
let token = "1091765898:AAG4cCfeBtg2y83Qij7xHe-vhVxnekQlxKw";
let bot = new TelegramBot(token, { polling: true });
let request = require("request");
bot.onText(/\/movie (.+)/, (msg, match) => {
  let movie = match[1];
  let chatId = msg.chat.id;
  request(
    `http://www.omdbapi.com/?apikey=ff517144&t=${movie}`,
    (err, response, body) => {
      if (!err && response.statusCode == 200) {
        bot
          .sendMessage(chatId, "_Looking for_ " + movie + "...", {
            parse_mode: "Markdown"
          })
          .then(msg => {
            let res = JSON.parse(body);
            bot.sendPhoto(chatId, res.Poster, {caption: 
                "Result: \nTitle: " +
                res.Title +
                "\n Year: " +
                res.Year +
                "\n Rated: " +
                res.Rated +
                "\n Released: " +
                res.Released +
                "\n Runtime: " +
                res.Runtime +
                "\n Genre: " +
                res.Genre +
                "\n Director: " +
                res.Director +
                "\n Writer: " +
                res.Writer +
                "\n Actors: " +
                res.actors +
                "\n Plot: " +
                res.Plot +
                "\n Language: " +
                res.Language +
                "\n Country: " +
                res.Country +
                "\n Awards" +
                res.Awards
            })
          });
      }
    }
  );
});

// bot.onText(/\/echo (.+)/,function(msg, match){
//     let chatId = msg.chat.id;
//     var echo = match[1];
//     bot.sendMessage(chatId,echo);
// })

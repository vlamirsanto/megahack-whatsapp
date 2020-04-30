const twilio = require("twilio");
const express = require("express");
const bodyParser = require("body-parser");
const MessagingResponse = twilio.twiml.MessagingResponse;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5521980610494",
      body: "Your appointment is coming up on Oct 7 at 12h",
    })
    .then(console.log)
    .catch(console.log);
});

app.post("/webhook", (req, res) => {
  const message = req.body.Body;
  const twiml = new MessagingResponse();
  twiml.message(`Obrigado por enviar a mensagem: ${message}`);
  res.send(twiml.toString());
});

app.listen(3000, console.log("Servidor funcionando..."));

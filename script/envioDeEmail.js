const nodemailer = require("nodemailer");
const data = require("./test");

const userAndPassRequest = (param) => {
  if (!param) console.log("Dados incorretos");
  const userName = "felipefrancafj";
  const pass = "2307edsa";
  if (param === "user") return userName;
  if (param === "pass") return pass;
};

const remetente = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: userAndPassRequest("user"),
    pass: userAndPassRequest("pass"),
  },
  tls: { rejectUnauthorized: false },
  debug: true,
});

function emailConstructor(to, subject, text) {
  this.from = `${userAndPassRequest("user")}@gamil.com`;
  this.to = to;
  this.subject = subject;
  this.text = text;
}

const nome = data.name;
const email = data.email;
const text = data.text;

const emailConstructed = () => {
  const emailASerEnviado = new emailConstructor(email, nome, text);
  return emailASerEnviado;
};

remetente.sendMail(emailConstructed(), (error) => {
  if (error) console.log(error);
  else {
    console.log("Enviado com Sucesso!");
  }
});

const router = require("express").Router();
const nodemailer = require("nodemailer");


const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "contact.tratop@gmail.com",
      pass: "tratopadmin"
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });
  router.post("/help", (req, res) => {
    const name = req.body.name;
    const title = req.body.title;
    const phone = req.body.phone;
    const projet = req.body.projet;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "contact.tratop@gmail.com",
      subject: `Help : ${title}`,
      html: `<p>Nom du client: ${name}</p>
              <p>Téléphone du client: ${phone}</p>
             <p>Projet objet d'email: ${projet}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });

  module.exports = router;
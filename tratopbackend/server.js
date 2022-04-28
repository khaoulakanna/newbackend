const express = require("express");
const router = express.Router();
const cors = require("cors");
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
  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "contact.tratop@gmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
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
  router.post("/devis", (req, res) => {
    const project = req.body.project;
    const name = req.body.name;
    const objet = req.body.objet;
    const email = req.body.email;
    const phone = req.body.phone;
    const place = req.body.place;
    const area = req.body.area;
    const consistance = req.body.consistance;
    const ref = req.body.ref;
    const specifications = req.body.specifications;
    const comments = req.body.comments; 
    const mail = {
      from: email,
      to: "contact.tratop@gmail.com",
      subject: `Demande de devis pour ${objet}`,
      html: `<p>Nom et Prénom du client: ${name}</p> 
              <p>Téléphone: ${phone}</p>
             <p>Email: ${email}</p>
             <p>Dénomination du projet: ${project}</p>
             <p>Lieu du projet: ${place}</p>
             <p>Consistance du projet:  ${consistance}</p>
             <p>Superficie du projet en ha: ${area}</p>
             <p>Référence foncière: ${ref}</p>
             <p>Specifications: ${specifications}</p>
             <p>Comments: ${comments}</p>
             `,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));
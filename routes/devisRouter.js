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


  module.exports = router;
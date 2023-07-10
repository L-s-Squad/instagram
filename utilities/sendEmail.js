const nodeMailer = require('nodemailer');
// const fs = require('fs').promises;
// const ejs = require('ejs');
require('dotenv').config();


const sendEmail = async (options) => {

    console.log(options);
    console.log(process.env.GMAIL_ID);
    console.log(process.env.GAMIL_PASSWORD);

    // 1) Create a transporter
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    try{
        //  let templateString =  await fs.readFile('./mail1.html', 'utf-8');

        //  templateString = templateString.replaceAll(
        //     "{name}", options.name
        //  )
        //  templateString = templateString.replaceAll(
        //     "{age}", options.age
        //     )
        // templateString = templateString.replaceAll(
        //     "{message}", options.message
        // )

        //  const htmlString = ejs.render(templateString, {...options})


    let mailOptions = {
        from:   process.env.GAMIL_ID,       // access it from env
        to: options.to,
        subject: options.subject,
        // html:   templateString
        text: options.message,

      }
       // 3) Actually send the email

      try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info);
    }
    catch(err){
        console.log(err);
    }
  }
    catch(err){
        console.log(err);
    }   
}



module.exports = sendEmail;
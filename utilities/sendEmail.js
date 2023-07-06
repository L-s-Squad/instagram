const nodeMailer = require('nodemailer');
const fs = require('fs').promises;
// const ejs = require('ejs');


const sendEmail = async (options) => {

    // 1) Create a transporter
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: "abhishekchoudhary.me@gmail.com",
            pass: "cmclqddufwzpmolz"
        }
    })

    try{
         let templateString =  await fs.readFile('./mail1.html', 'utf-8');

         templateString = templateString.replaceAll(
            "{name}", options.name
         )
         templateString = templateString.replaceAll(
            "{age}", options.age
            )
        templateString = templateString.replaceAll(
            "{message}", options.message
        )

        //  const htmlString = ejs.render(templateString, {...options})


    let mailOptions = {
        from: "abhishekchoudhary.me@gmail.com",
        to: options.to,
        subject: options.subject,
        html:   templateString
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

sendEmail({
    to: "theabhishek.ofc@gmail.com",
    subject: "Happy Birthday last time definately",
    name: "Piysuh Dubey",
    age: 21,
    message: "Happy Birthday"
})
 const nodemailer =require("nodemailer");


module.exports.sendEmail=async (email,text)=> {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: '' 
    }
  });

  let mailOptions = {
    from: '',
    to: email, //
    subject: 'welcome to study challenge arena',
    text: text
  }

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('send email fixed ', info.messageId);
  } catch (error) {
    console.error('error send email', error);
  }
}
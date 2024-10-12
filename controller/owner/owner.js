
import OWNER from '../../model/owner/owner.js';
import jwt from 'jsonwebtoken'
import nodeMailer from 'nodemailer';


export async function ownerRegister(req,res,next){
    try{

        const { emailOrPhone , password } = req.body;
        if(!emailOrPhone){
            return res.status(400).json({message:'Please enter the email or phone number'})
        }

        if(!password){
            return res.status(400).json({ message:'Please enter the password'})
        }

        let searchCriteria = {};

        if(/^\S+@\S+\.\S+$/.test(emailOrPhone)){
          searchCriteria.email = emailOrPhone;
        }else if(/^\d{10}$/.test(emailOrPhone)){
          searchCriteria.phone = emailOrPhone;
        }else{
          return res.status(400).json({ message: 'Please enter a valid email or phone number' });
        }

        const existOwner = await OWNER.findOne(searchCriteria);
        if (existOwner) {
            return res.status(400).json({ message: 'Account already exists. Please login.' });
        }


       const owner =  await OWNER.create({ 
        email: searchCriteria.email || null,
        phone: searchCriteria.phone || null,
            password,
        });

        const token = jwt.sign({ userId: owner._id,email:owner.email },process.env.JWT_SECRET,{expiresIn:'1y'});
        return res.status(200).json({ message:'Registration successful',owner,token})

    }catch(error){
        next(error);
    }
}


export async function ownerLogin (req,res){
    try{

        const { emailOrPhone, password } = req.body;
        if(!emailOrPhone){
            return res.status(400).json({message:'Please enter email or phone number'})
        }

        if(!password){
            return res.status(400).json({ message:'Please enter the password'})
        }

        let searchCriteria = {};

        if(/^\S+@\S+\.\S+$/.test(emailOrPhone)){
          searchCriteria.email = emailOrPhone;
        }else if(/^\d{10}$/.test(emailOrPhone)){
          searchCriteria.phone = emailOrPhone;
        }else{
          return res.status(400).json({ message: 'Please enter a valid email or phone number' });
        }


        const owner = await OWNER.findOne( searchCriteria);
        if(!owner){
            return res.status(404).json( { message:'User not exist!'})
        }

        if(password !== owner.password){
            return res.status(400).json({ message:'Passwrod not matching'})
        }

        const token = jwt.sign({ userId: owner._id,email:owner.email },process.env.JWT_SECRET,{expiresIn:'1y'});
        return res.status(200).json({ message:'Login successful',owner,token})


    }catch(error){
        next(error);
    }
}
//working
export async function ownerforgotPassoword(req,res){
    try{
        const { email } = req.body;
        //done
        if (!email) {
          return res.status(400).json({ message: 'Please enter your email' });
        }
        const owner = await OWNER.findOne({ email });
        if(!owner){
            return res.status(404).json({ message: 'User not found' });
        }

        let transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.ADMIN_EMAIL,
              pass: process.env.ADMIN_PASS,
            },
          });

             // Email content
    let mailOptions = {
        from: `Kbus <${process.env.ADMIN_EMAIL}>`,
        to: email,
        subject: "Forgot password",
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  color: #000;
                }
                h3 {
                  color: #3498db; /* Set your desired color */
                }
                strong {
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <h3>Your password</h3>
              <p><strong>Password:</strong> ${owner.password}</p>
              <!-- Add your logo with the appropriate URL -->
              <p>Thank you for using Kbus</p>
            </body>
          </html>
        `,
      };
      // Send email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log('Email sent successfully');
          return res.status(200).json({ message: "Password sent to your registration email successfully" });
        }
      });
    }catch(error){
        next(error);
    }
}

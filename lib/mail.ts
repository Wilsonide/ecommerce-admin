import nodemailer from "nodemailer"


export const sendVerificationEmail = async (email:string, token:string)=>{
    try{
        const confirmLink = `${process.env.DOMAIN}/auth/new-verification?token=${token}`

        const transporter = nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        port: 587,
        secure: false,
           
            
        auth: {
            user : process.env.USER_EMAIL ,
            pass : process.env.APP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
            }

        })

        const mailOptions = {
            from : process.env.USER_EMAIL,
            to: email,
            subject: 'Verification email',
            html: `<p>click <a href='${confirmLink}'>here</a> to confirm email</p>`
                      
               
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse
    }
    
     catch (error:any) {
        throw new Error(error.message)

        
    }
}

export const sendTwoFactorTokenEmail = async (email:string, token:string)=>{
    try{
        const confirmLink = `${process.env.DOMAIN}/auth/new-verification?token=${token}`

    const transporter = nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        port: 587,
        secure: false,
           
            
        auth: {
            user : process.env.USER_EMAIL ,
            pass : process.env.APP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
            }

        })

        const mailOptions = {
            from : process.env.USER_EMAIL,
            to: email,
            subject: '2FA Code',
            html: `<p>This is your 2FA code : ${token}</p>`,
                      
               
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse
    }
    
     catch (error:any) {
        throw new Error(error.message)

        
    }
}

export const sendResetPasswordEmail = async (email:string, token:string)=>{
    try{
        const resetLink = `${process.env.DOMAIN}/auth/new-password?token=${token}`

        const transporter = nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        port: 587,
        secure: false,
           
            
        auth: {
            user : process.env.USER_EMAIL ,
            pass : process.env.APP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false,
            }

        })

        const mailOptions = {
            from : process.env.USER_EMAIL,
            to: email,
            subject: 'Reset Your Password',
            html: `<p>click <a href='${resetLink}'>here</a> to reset password</p>`,
                      
               
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse
    }
    
     catch (error:any) {
        throw new Error(error.message)

        
    }
}
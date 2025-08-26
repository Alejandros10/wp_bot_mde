import nodemailer from 'nodemailer';

type EmailOptions = {
    to: string;
    subject: string;
    body: string;
};

export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(options: EmailOptions): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            text: options.body
        });
        console.log(`Correo enviado a ${options.to}`);
    }
}

const env = require('./env');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(env.SENDGRID_KEY);
module.exports = function sendMail(path, email, token) {
    let message = {}
    if (path === 'reset-password') {
        message = {
            msg1: 'You recently requested to reset your password',
            msg2: 'Click  the button below to reset your password',
            btnText: 'Reset Password',
            subject: 'Reset Password'
        }
    } else {
        message = {
            msg1: 'Welcome to TimeOff there is just one more step before you get to the fun part',
            msg2: 'Verify  we have the right email address by clicking on the button below',
            btnText: 'Verify My Account',
            subject: 'Please Confirm Your Mail'
        }
    }
    const msg = {
        to: `${email}`,
        from: 'support@invoiceNG.com',
        subject: message.subject,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Invoice Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
    <div class="container text-secondary p-3 text-center">
        <h3 class="text-primary"><i>Invoice Generation</i></h3>
        <p class="mt-3">${message.msg1}</p>
        <p class="mt-2">${message.msg2}</p>
        <div class="mt-3"><button class="btn btn-primary btn-md">
            <a class="text-light" href='${env.BASEURL}/${path}/${token}'>${message.btnText}</a>
        </button></div>
    </div>
</body>
</html> `,
      };
      return sgMail.send(msg)
}

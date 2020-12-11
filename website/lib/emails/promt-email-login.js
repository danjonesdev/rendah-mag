import sendinblue from './sendinblue';
import emailCommon from '~/emails/component/common';

export default (username, hash, salt) => {
  const title = 'Password Reset.';

  const body = `
      Click below to login and change your Rendah Mag password.
    `;

  const image = null;

  const buttonText = 'Reset Password';

  const buttonLink = `${process.env.SITE_URL}/login?username=${username}&hash=${hash}&salt=${salt}&fwdRoute=profile`;

  const sendSmtpEmail = {
    sender: {
      name: 'Rendah Mag',
      email: 'no-reply@rendahmag.com',
    },
    to: [
      {
        email: username,
      },
    ],
    subject: 'Reset your Rendah Mag password',
    htmlContent: emailCommon(title, body, image, buttonText, buttonLink),
  };

  sendinblue(sendSmtpEmail);
};

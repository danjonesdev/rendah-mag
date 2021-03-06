export default (title, body, image, buttonText, buttonLink) => {
  const emailTitle = title
    ? `
      <tr>
        <td>
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="150" valign="top">
              </td>
              <td width="300" valign="top">
                <h1 style="text-align: center;">${title}</h1>
              </td>
              <td width="150" valign="top">
              </td>
            </tr>
            <tr>
              <td height="30">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    `
    : '';

  const emailBody = body
    ? `
      <tr>
        <td>
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="150" valign="top">
              </td>
              <td width="300" valign="top">
                <p>${body}</p>
              </td>
              <td width="150" valign="top">
              </td>
            </tr>
            <tr>
              <td height="40">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
      `
    : '';

  const emailImage = image
    ? `
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="150" valign="top">
                </td>
                <td width="300" valign="top">
                  <img width="300" src="${image}" />
                </td>
                <td width="150" valign="top">
                </td>
              </tr>
              <tr>
                <td height="40">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        `
    : '';

  const emailButton =
    buttonText && buttonLink
      ? `
        <tr>
          <td>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td width="200" valign="top">
                </td>
                <td width="200" valign="top" style="text-align: justify; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px;">
                  <div>
                    <a class="btn" href="${buttonLink}"
                      style="border-radius:0px;display:inline-block;font-family:Arial, Helvetica, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;"
                     >
                      ${buttonText}
                    </a>
                  </div>
                </td>
                <td width="200" valign="top">
                </td>
              </tr>
              <tr>
                <td height="40">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        `
      : '';

  const email = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rendah Mag</title>

      <style type="text/css">
        body, .bg, p, span, strong, em, strong, ul, li, h1, h2, h3, h4, h5 ,h6, h7, a:not(.btn) {
          font-family: Arial, Helvetica, sans-serif;
          color: #000000;
          background: #ffffff !important;
          color: #111111 !important;
        }

        a.btn {
          background: #111111 !important;
          color: #ffffff !important;
        }

        @media (prefers-color-scheme: dark) {
          body, .bg, p, span, strong, em, strong, ul, li, h1, h2, h3, h4, h5 ,h6, h7, a:not(.btn) {
            background: #111111 !important;
            color: #ffffff !important;
          }

          a.btn {
            background: #111111 !important;
            color: #ffffff !important;
            outline: 1px solid #ffffff !important;
          }

          a {
            color: #ffffff !important;
          }
        }

        body {
          width: 100%;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }

        #outlook a {
          padding: 0;
        }

        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }

        p, ul, li, a, span, strong, em, h2, h3, h4, h5, h6 {
          text-align: justify;
          font-size: 16px;
          line-height: 22px;
        }

        h1 {
          font-size: 20px;
          line-height: 28px;
        }

        .footnote {
          font-size: 16px !important;
          line-height: 22px !important;
        }

        @media only screen and (max-width:768px) {
          /* For mobile phones: */
          p, ul, li, a:not(.btn), span, strong, em, h2, h3, h4, h5, h6 {
            font-size: 26px !important;
            line-height: 38px !important;
          }

          h1 {
            font-size: 28px !important;
            line-height: 40px !important;
          }

          .footnote {
            font-size: 16px !important;
            line-height: 22px !important;
          }
        }

        table td {
          border-collapse: collapse;
        }

        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }

        img {
          display: block;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }

        a img {
          border: none;
        }

        a {
          text-decoration: none;
        }

        a.phone {
          text-decoration: none;
          pointer-events: auto;
          cursor: default;
        }

        .showy {
          height: 100% !important;
          width: 100% !important;
        }
      </style>

      <!--[if gte mso 9]>
      <style>
      /* Target Outlook 2007 and 2010 */
      </style>
    <![endif]-->
    </head>

    <body>
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0;padding: 0;width: 100%;line-height: 100% !important;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
        <tr>
          <td valign="top">
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="bg">
              <tr>
                <td valign="top">
                  <center class="bg">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600">

                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td height="10">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="290" valign="top">
                              </td>
                              <td width="80" valign="top" style="text-align: center;">
                                <a href="https://www.rendahmag.com/">
                                  <img width="80" style="width: 80px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1600125427/email/logo.png" alt="Rendah Mag">
                                </a>
                              </td>
                              <td width="290" valign="top">
                              </td>
                            </tr>
                            <tr>
                              <td height="30">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${emailTitle}
                      ${emailBody}
                      ${emailImage}
                      ${emailButton}

                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="600" valign="top">
                                <hr />
                              </td>
                            </tr>
                            <tr>
                              <td height="40">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="144" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://www.facebook.com/rendahmag" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/facebook_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://www.instagram.com/rendahmag/" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/instagram_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://twitter.com/RendahMag" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/twitter_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://soundcloud.com/rendahmag" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/soundcloud_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://www.youtube.com/channel/UC4dYeD1ceX8sSY3J3UuMn8w" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/youtube_1.png" alt="">
                                </a>
                              </td>
                              <td width="24" valign="top">
                              </td>
                              <td width="43" valign="top">
                                <a href="https://discord.gg/gPkQF8n" style="width: 43px;">
                                  <img style="width: 43px;" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607130749/email/social-icons/discord_1.png" alt="">
                                </a>
                              </td>
                              <td width="144" valign="top">
                              </td>
                            </tr>
                            <tr>
                              <td height="40">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr style="background-color: #0000000; color: #ffffff">
                        <td style="background-color: #0000000; color: #ffffff">
                          <table cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0000000; color: #ffffff">
                            <tr style="background-color: #0000000; color: #ffffff">
                              <td width="150" valign="top">
                              </td>
                              <td mc:edit="description" width="300" style="text-align: center;">
                                <span style="color: #000000; font-size: 16px; line-height: 24px; text-align: center;">Rendah Mag Ltd.</span>
                              </td>
                              <td width="150" valign="top">
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td width="600" valign="top" style="text-align: center;">
                                <img width="600" src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1607125368/email/ghost-padding.png" alt="Rendah Mag">
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>
                  </center>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>

    </html>
  `;

  return email;
};

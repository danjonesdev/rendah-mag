import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

export default async (req, res) => {
  try {
    const { email, tags } = req.body;
    const emailHashed = md5(email.toLowerCase());
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}/tags`,
      {
        body: JSON.stringify({ tags: tags }),
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    if (!response.ok) {
      // Error
      throw new Error(JSON.stringify(await response.json()));
    }

    // Success
    if (res) return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error('Error in api/mailchimp/update-member-tags:', error);
    return res.status(500).json({ error: error });
  }
};

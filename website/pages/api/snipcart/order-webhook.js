import fetch from 'isomorphic-unfetch';

import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';

export default async (req, res) => {
  try {
    const { order } = req.body;

    const addUpdateMailchimpUser = async (
      email,
      firstName,
      lastName,
      address,
      isDominion
    ) => {
      const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          ADDRESS: address,
        },
      };

      const addOrUpdateMember = async () => {
        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/add-or-update-member`,
          {
            body: JSON.stringify({
              email: email,
              data: data,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        if (!response.ok) {
          // Error
          throw new Error(JSON.stringify(await response.json()));
        }
      };

      const addMembertags = async () => {
        const tags = [
          {
            name: 'Customer',
            status: 'active',
          },
        ];

        if (isDominion) {
          tags.push({
            name: 'Dominion Subscription',
            status: 'active',
          });
        }

        const response = await fetch(
          `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
          {
            body: JSON.stringify({
              email: email,
              tags: tags,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        // Error
        if (!response.ok) {
          throw new Error(JSON.stringify(await response.json()));
        }
      };

      await addOrUpdateMember();
      await addMembertags();
    };

    if (order?.eventName === 'order.completed') {
      const { content } = order;
      const { user } = content;
      const { items } = content;
      const { billingAddress, shippingAddress } = user;
      const { email } = user;
      const fullName = billingAddress?.fullName || shippingAddress?.fullName;
      const firstName = fullName.split(' ')[0];
      const lastName = fullName.split(' ')[1];

      const address = {
        addr1: shippingAddress?.address1 || null,
        addr2: shippingAddress?.address2 || null,
        city: shippingAddress?.city || null,
        state: shippingAddress?.province || null,
        zip: shippingAddress?.postalCode || null,
        country: shippingAddress?.country || null,
      };

      let isDominion = false;

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];

        // Send dominion email
        if (item.id === 'dominion-subscription') {
          isDominion = true;
          welcomeDominionEmail(email);
          break;
        }
      }

      // Add or update mailchimp user
      await addUpdateMailchimpUser(
        email,
        firstName,
        lastName,
        address,
        isDominion
      );
    }

    return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/order-webhook:', error);
    return res.status(500).json({ error: error });
  }
};

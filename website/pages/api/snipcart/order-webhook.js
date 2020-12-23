import fetch from 'isomorphic-unfetch';
import md5 from 'js-md5';

import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';

export default async (req, res) => {
  const order = req.body;

  try {
    const addUpdateMailchimpUser = async (
      email,
      firstName,
      lastName,
      address,
      isDominion
    ) => {
      const emailHashed = md5(email.toLowerCase());
      const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];

      const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          ADDRESS: address,
        },
      };

      // Add or update member
      const addOrUpdateMember = await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}`,
        {
          body: JSON.stringify(data),
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }
      );

      if (!addOrUpdateMember.ok) {
        // Error
        throw new Error(await addOrUpdateMember.json());
      }

      // Add tags
      const tagsData = {
        tags: [
          {
            name: 'Customer',
            status: 'active',
          },
        ],
      };

      if (isDominion) {
        tagsData.tags.push({
          name: 'Dominion Subscription',
          status: 'active',
        });
      }

      // const addMembertags = await fetch(
      //   `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/${emailHashed}/tags`,
      //   {
      //     body: JSON.stringify(tagsData),
      //     headers: {
      //       Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
      //       'Content-Type': 'application/json',
      //     },
      //     method: 'POST',
      //   }
      // );
      //
      // if (!addMembertags.ok) {
      //   // Error
      //   throw new Error(addMembertags.json());
      // }

      // Update member tags (mailchimp)
      const addMembertags = await fetch(
        `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
        {
          body: JSON.stringify({
            email: email,
            tags: tagsData.tags,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );

      // Error
      if (!addMembertags.ok) {
        throw new Error(await addMembertags.json());
      }
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
    console.error(error.message || error.toString());
    return res
      .status(400)
      .json({ error: 'Error in api/snipcart/order-webhook.' });
  }
};

// import fetch from 'isomorphic-unfetch';
//
// import welcomeDominionEmail from '~/lib/emails/welcome-dominion-subscription';
//
// export default async (req, res) => {
//   const order = req.body;
//
//   try {
//     const addUpdateMailchimpUser = async (
//       email,
//       firstName,
//       lastName,
//       address,
//       isDominion
//     ) => {
//       // Add or update member
//       const addOrUpdateMember = async () => {
//         const response = await fetch(
//           `${process.env.SITE_URL}/api/mailchimp/subscribe`,
//           {
//             body: JSON.stringify({
//               data: {
//                 email_address: email,
//                 status: 'subscribed',
//                 merge_fields: {
//                   FNAME: firstName,
//                   LNAME: lastName,
//                   ADDRESS: address,
//                 },
//               },
//               methodType: 'PUT',
//             }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             method: 'POST',
//           }
//         );
//
//         if (!response.ok) {
//           // Error
//           throw new Error(await response.json());
//         }
//       };
//
//       // Add tags
//       const addMemberTags = async () => {
//         const tags = [
//           {
//             name: 'Customer',
//             status: 'active',
//           },
//         ];
//
//         if (isDominion) {
//           tags.push({
//             name: 'Dominion Subscription',
//             status: 'active',
//           });
//         }
//
//         const response = await fetch(
//           `${process.env.SITE_URL}/api/mailchimp/update-member-tags`,
//           {
//             body: JSON.stringify({
//               email: email,
//               tags: tags,
//             }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             method: 'POST',
//           }
//         );
//
//         if (!response.ok) {
//           // Error
//           throw new Error(response.json());
//         }
//       };
//
//       await addOrUpdateMember();
//       await addMemberTags();
//     };
//
//     if (order?.eventName === 'order.completed') {
//       const { content } = order;
//       const { user } = content;
//       const { items } = content;
//       const { billingAddress, shippingAddress } = user;
//       const { email } = user;
//       const fullName = billingAddress?.fullName || shippingAddress?.fullName;
//       const firstName = fullName.split(' ')[0];
//       const lastName = fullName.split(' ')[1];
//
//       const address = {
//         addr1: shippingAddress?.address1 || null,
//         addr2: shippingAddress?.address2 || null,
//         city: shippingAddress?.city || null,
//         state: shippingAddress?.province || null,
//         zip: shippingAddress?.postalCode || null,
//         country: shippingAddress?.country || null,
//       };
//
//       let isDominion = false;
//
//       for (let i = 0; i < items.length; i += 1) {
//         const item = items[i];
//
//         // Send dominion email
//         if (item.id === 'dominion-subscription') {
//           isDominion = true;
//           welcomeDominionEmail(email);
//           break;
//         }
//       }
//
//       // Add or update mailchimp user
//       await addUpdateMailchimpUser(
//         email,
//         firstName,
//         lastName,
//         address,
//         isDominion
//       );
//     }
//
//     return res.status(200).json({ error: '' });
//   } catch (error) {
//     // Handle catch
//     console.error(
//       `Error in api/snipcart/order-webhook: ${
//         error.message || error.toString()
//       }`
//     );
//
//     return res.status(400).json({ error: 'Error fetching customer orders.' });
//   }
// };

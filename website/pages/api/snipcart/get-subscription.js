import fetch from 'isomorphic-unfetch';
import find from 'lodash/find';

import { SNIPCART_SECRET_KEY } from '~/constants';

const getSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const secret = Buffer.from(SNIPCART_SECRET_KEY).toString('base64');

    const response = await fetch(
      `http://app.snipcart.com/api/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Basic ${secret}`,
          Accept: 'application/json',
        },
        method: 'GET',
      }
    );

    if (!response.ok) {
      // Error
      throw new Error(JSON.stringify(await response.json()));
    }

    // Handle response
    return res.status(200).json(await response.json());
  } catch (error) {
    // Handle catch
    console.error('Error in api/snipcart/get-subscription:', error);
    return res.status(500).json({ error: error });
  }
};

export default getSubscription;

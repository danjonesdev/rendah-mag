import fs from 'fs';
import Cors from 'cors';
import tinify from 'tinify';


import initMiddleware from '~/lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const handler = async (req, res) => {
  console.log('handler');
  try {
    // Run cors
    await cors(req, res);

    tinify.key = process.env.TINIFY_KEY;

    const { imageUrl, size } = req.body;
    const source = await tinify.fromUrl(imageUrl);
    const resized = await source.resize({ method: 'scale', width: size });

    // Compress image
    await resized.toFile(`/tmp/optimized.png`);

    console.log('resized', resized);

    // Write to temporary folder
    const file = fs.readFileSync('/tmp/optimized.png');

    // Delete temp image
    try {
      fs.unlinkSync('/tmp/optimized.png');
    } catch (error) {
      console.log('unlinkSync error:', error.message);
    }

    // Send image
    return res.send(file);
  } catch (error) {
    // Handle catch
    // console.error(error.message || error.toString());
    return res
      .status(500)
      .json({ error: `Error compressing image: ${error.message}` });
  }
};

export default handler;

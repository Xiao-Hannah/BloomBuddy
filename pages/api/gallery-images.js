import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const galleryDir = path.join(process.cwd(), 'public', 'Gallery');
  let files = [];
  try {
    files = fs.readdirSync(galleryDir)
      .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
      .map(file => `/Gallery/${file}`);
  } catch (e) {
    // Directory might not exist
  }
  res.status(200).json({ images: files });
} 
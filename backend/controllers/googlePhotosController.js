// googlePhotosController.js

const { google } = require('googleapis');
const multer = require('multer');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://wedding-salome-michael.onrender.com/api/auth/callback'
);

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Configurer multer pour gérer les fichiers uploadés
const upload = multer({ dest: 'uploads/' });

// Fonction pour gérer l'upload des photos
const uploadPhotos = async (req, res) => {
  const { files } = req;
  try {
    const albumId = 'your_album_id'; // Remplacez par l'ID de votre album
    const promises = files.map(file => {
      return drive.files.create({
        resource: {
          name: file.originalname,
          parents: [albumId],
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path),
        },
      });
    });
    await Promise.all(promises);
    res.status(200).json({ message: 'Photos uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading photos' });
  }
};

// Fonction pour visualiser les photos
const viewPhotos = async (req, res) => {
  try {
    const albumId = 'your_album_id'; // Remplacez par l'ID de votre album
    const response = await drive.files.list({
      q: `'${albumId}' in parents`,
      fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
    });
    res.status(200).json(response.data.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving photos' });
  }
};

module.exports = {
  uploadPhotos,
  viewPhotos,
};

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '721792176670-bdqk44r275nrbbrj6bg52l9ssuhpset1.apps.googleusercontent.com',
  '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',
  'Yhttp://localhost:3000/gtoken'
);

// Generate a url that asks permissions for Google Photos scope
const scopes = [
  'https://www.googleapis.com/auth/photoslibrary.readonly',
  'https://www.googleapis.com/auth/photoslibrary.appendonly'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

module.exports = {
  oauth2Client,
  url
};

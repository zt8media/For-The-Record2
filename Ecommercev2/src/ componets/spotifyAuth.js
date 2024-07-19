// spotifyAuth.js
const CLIENT_ID = '04c8c19d432b40249d52eebbbc996405';
const CLIENT_SECRET = '8b84b30fe5e04d7cad9362fc16854612';
const REDIRECT_URI = 'https://for-the-record.onrender.com/';

const getSpotifyToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  return data.access_token;
};

export default getSpotifyToken;

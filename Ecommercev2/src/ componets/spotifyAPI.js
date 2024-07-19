// spotifyAPI.js
import getSpotifyToken from './spotifyAuth';

const getAlbumDetails = async (albumName, artistName, releaseYear) => {
  try {
    const token = await getSpotifyToken();

    const query = `${albumName} artist:${artistName} year:${releaseYear}`;
    const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    if (data.albums && data.albums.items && data.albums.items.length > 0) {
      const album = data.albums.items[0]; // Take the first album found

      // Fetch the album tracks
      const tracksResult = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      const tracksData = await tracksResult.json();
      album.tracks = tracksData.items; // Add tracks to the album details

      return album;
    } else {
      throw new Error('No albums found');
    }
  } catch (error) {
    console.error('Error fetching album details:', error);
    return null;
  }
};

export default getAlbumDetails;

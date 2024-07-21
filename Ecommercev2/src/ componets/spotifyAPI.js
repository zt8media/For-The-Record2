import getSpotifyToken from './spotifyAuth'; // Import the function to get the Spotify token

// Function to get album details from Spotify
const getAlbumDetails = async (albumName, artistName, releaseYear) => {
  try {
    // Get the Spotify token using the imported function
    const token = await getSpotifyToken();

    // Create the search query string using the album name, artist name, and release year
    const query = `${albumName} artist:${artistName} year:${releaseYear}`;
    
    // Fetch the search results from Spotify API
    const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });

    // Parse the JSON response from the search request
    const data = await result.json();

    // Check if any albums are found in the search results
    if (data.albums && data.albums.items && data.albums.items.length > 0) {
      // Take the first album found in the search results
      const album = data.albums.items[0];

      // Fetch the tracks for the found album
      const tracksResult = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      // Parse the JSON response from the tracks request
      const tracksData = await tracksResult.json();
      
      // Add the tracks to the album details
      album.tracks = tracksData.items;

      // Return the album details including tracks
      return album;
    } else {
      // Log a warning if no albums are found for the search query
      console.warn(`No albums found for query: ${query}`);
      return null;
    }
  } catch (error) {
    // Log any errors that occur during the fetch requests
    console.error('Error fetching album details:', error);
    return null;
  }
};

export default getAlbumDetails; // Export the function as the default export

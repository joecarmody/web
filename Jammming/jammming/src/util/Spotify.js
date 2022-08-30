let accessToken;
const clientID = "99628c0081b8445398a6d62ed172b8b3";
const redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const url = window.location.href;
    const urlAccessToken = url.match(/access_token=([^&]*)/);
    const urlExpiresIn = url.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
  },

  async search(term) {
    accessToken = Spotify.getAccessToken();

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        const trackArray = jsonResponse.tracks.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            uri: item.uri,
          };
        });
        return trackArray;
      }
    } catch (error) {
      console.log(error);
    }

    return [];
  },

  async savePlaylist(name, trackURIArray) {
    if (!name && !trackURIArray.length) {
      return;
    }

    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    let userID, playlistID;

    const usernameEndpoint = "https://api.spotify.com/v1/me";
    try {
      const usernameResponse = await fetch(usernameEndpoint, {
        headers: headers,
      });
      if (usernameResponse.ok) {
        const jsonUsernameResponse = await usernameResponse.json();
        userID = jsonUsernameResponse.id;
      }
    } catch (error) {
      console.log(error);
    }

    if (!userID) {
      return;
    }

    const playlistIDEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    try {
      const playlistIDResponse = await fetch(playlistIDEndpoint, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      });
      if (playlistIDResponse.ok) {
        const jsonPlaylistIDResponse = await playlistIDResponse.json();
        playlistID = jsonPlaylistIDResponse.id;
      }
    } catch (error) {
      console.log(error);
    }

    if (!playlistID) {
      return;
    }

    const newPlaylistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
    try {
      const newPlaylistEndpointResponse = await fetch(newPlaylistEndpoint, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackURIArray }),
      });
      if (newPlaylistEndpointResponse.ok) {
        const jsonNewPlaylistEndpointResponse = await newPlaylistEndpointResponse.json();
        playlistID = jsonNewPlaylistEndpointResponse.id;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;

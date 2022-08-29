const fs = require('fs');

let accessToken;
const clientID = "99628c0081b8445398a6d62ed172b8b3";
const redirectURI = "http://localhost:3000";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const url = window.location.href;
    const urlAccessToken = url.match(/access_token=([^&]*)/);
    const urlExpiresIn = url.match(/expires_in=([^&]*)/);

    if (accessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
  },

  async search(term) {
    Spotify.getAccessToken();

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        const trackArray = jsonResponse.tracks.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
        return trackArray;
      }
    } catch (error) {
      fs.writeFile('../output.txt', error, (err) => {
        if (err) throw err
      });
    }

    return [];
  },
};

export default Spotify;

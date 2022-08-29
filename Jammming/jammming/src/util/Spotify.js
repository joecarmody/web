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
      accessToken = urlAccessToken;
      const expiresIn = urlExpiresIn;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } 

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
  },
};

export default Spotify;

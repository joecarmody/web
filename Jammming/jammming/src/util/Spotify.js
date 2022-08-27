let accessToken;
const clientId = "99628c0081b8445398a6d62ed172b8b3";
const redirectURI = "http://localhost:3000";
const Spotify = {
  getAccessToken: () => {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken;
      const expiresIn = urlExpiresIn;
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
};
export default Spotify;

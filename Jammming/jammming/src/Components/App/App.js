import React from "react";
import "./App.css";
import { SearchResults } from "../SearchResults/SearchResults";
import { SearchBar } from "../SearchBar/SearchBar";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        /*{ name: "name", album: "album", artist: "artist", id: "1" },*/
      ],
      playlistName: "playlist",
      playlistTracks: [
        { name: "name", album: "album", artist: "artist", id: "2", uri: "asdf" },
      ],
      searchTerm: ""
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const playlistTrackIds = this.state.playlistTracks.map(
      (trackObj) => trackObj.id
    );
    if (!playlistTrackIds.includes(track.id)) {
      const newPlaylistTracks = this.state.playlistTracks.concat(track);
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(
      (trackObj) => !(trackObj.id === track.id)
    );
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    return trackURIs;
  }

  async search(term) {
    const results = await Spotify.search(term);
    console.log(results);
    this.setState({ searchResults: results });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

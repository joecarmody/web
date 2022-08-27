import React from "react";
import "./App.css";
import { SearchResults } from "../SearchResults/SearchResults";
import { SearchBar } from "../SearchBar/SearchBar";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "name", album: "album", artist: "artist", id: "1" },
      ],
      playlistName: "playlist",
      playlistTracks: [
        { name: "name", album: "album", artist: "artist", id: "2" },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

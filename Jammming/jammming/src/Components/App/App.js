import React from "react";
import "./App.css";
import { SearchResults } from "../SearchResults/SearchResults";
import { SearchBar } from "../SearchBar/SearchBar";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <div className="App-playlist">
            <SearchResults />
            <SearchBar />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

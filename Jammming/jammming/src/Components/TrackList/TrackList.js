import React from "react";
import { Track } from "../Track/Track";
import "./TrackList.css";

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <Track />
        <Track />
        <Track />
      </div>
    );
  }
}
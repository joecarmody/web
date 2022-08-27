import React from "react";

export class Track extends React.Component {
  renderAction() {
    return (
      <button className="Track-action">
        {this.props.isRemoval ? "-" : "+"}
      </button>
    );
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button className="Track-action">{/* + or - will go here */}</button>
      </div>
    );
  }
}

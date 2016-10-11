import React, { Component } from 'react';

class SearchList extends Component {
  renderTweets() {
    return (
      <div>
        <li className="list-group-item">This will be the tweets</li>
        <li className="list-group-item">This will be the tweets</li>
        <li className="list-group-item">This will be the tweets</li>
        <li className="list-group-item">This will be the tweets</li>
      </div>
    );
  }
  render() {
    return (
      <div className="col-md-10 col-md-offset-1 search-list">
        <ul className="list-group">
          {this.renderTweets()}
        </ul>
      </div>
    );
  }
}

export default SearchList;
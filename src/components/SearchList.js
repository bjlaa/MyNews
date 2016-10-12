import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchList extends Component {
  renderTweets() {
    if(this.props.news != '') {
      const arrayNews = this.props.news.slice(1, 10).map((item) => {
        return(
          <div className="list-group-item">
            <a key={item.uuid} href={item.url}>
            {item.title ? item.title : 'An article related to your search'}
            </a>            
          </div>
 
        );
      });
      return (
        <div>
          { arrayNews }          
        </div>
      );
    }
    return;
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

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}
export default connect(mapStateToProps, null)(SearchList);
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SearchList extends Component {
  renderTweets() {
    if(this.props.news != []) {
      const arrayNews = this.props.news.slice(1, 10).map((item) => {
        return(
          <div key={item.id} className="list-group-item">
            <a href={item.webUrl}>
            {`${item.sectionName}: ${item.webTitle}`}
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

SearchList.propTypes = {
  news: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}
export default connect(mapStateToProps, null)(SearchList);
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import idb from 'idb';

class SearchList extends Component {
  componentDidUpdate() {
    this.updateDB();
  }
  renderTweets() {
    if(this.props.news != []) {
      const arrayNews = this.props.news.slice(1, 10).map((item) => {
        return (
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

  renderErrorMessage() {
    if (this.props.news === 'Network Error' || this.props.news === []) {
      return (
        <div>Oups, there was an error while loading the news. Please check your connection.</div>
      );
    }
    return;
  }

/* eslint-disable */
  createDB() {
    return idb.open('myNews-db2', 1, (upgradeDb) => {
      const articlesStore = upgradeDb.createObjectStore('articlesStore');
    });
  }
/* eslint-enable */
  updateDB() {
    console.log('updating');
    if (this.props.news !== []) {
      this.clearDB();
      return;
    }
    this.createDB()
    .then((db) => {
      const articles = this.props.news;
      const tx = db.transaction('articlesStore', 'readwrite');
      const store = tx.objectStore('articlesStore');  
      store.clear();
      articles.forEach((article) => {
        store.put(article);
      });
      return tx.complete;
    });
  }

  clearDB() {
    console.log('clearing');
    this.createDB()
    .then(db => {
      const tx = db.transaction('articlesStore', 'readwrite');
      const store = tx.objectStore('articlesStore');
      store.clear();
      return tx.complete;
    });
  }

  render() {
    return (
      <div className="col-md-10 col-md-offset-1 search-list">
        {this.renderErrorMessage()}
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
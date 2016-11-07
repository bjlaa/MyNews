import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import idb from 'idb';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      savedArticles: '',
      status: 'connected'
    };
  }
  componentDidUpdate() {
    if (this.state.status !== 'error') {
      this.updateDB();      
    }

  }
  renderTweets() {
    /*
    if (this.state.status === 'error') {
      if (this.state.savedArticles !== '') {
        const arrayNews = this.state.savedArticles.slice(0, 10).map((item) => {
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
      return <div>No News were stored. Please visit MyNews while being connected to internet in order to fully experience the power of offline first Web Apps.</div>;
    }
    */
    if(this.props.news !== [] && this.props.news !== 'Network Error') {
      const arrayNews = this.props.news.slice(0, 10).map((item) => {
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
    if (this.state.status === 'error') {
      return (
        <div className="col-md-10 col-md-offset-1">Oups, there was an error while loading the news. Please check your connection.</div>
      );
    }
    return;
  }

/* eslint-disable */
  createDB() {
    return idb.open('myNews-db4', 1, (upgradeDb) => {
      const articlesStore = upgradeDb.createObjectStore('articlesStore', { autoIncrement: true});
    });
  }
/* eslint-enable */
  updateDB() {
    if (this.props.news === 'Network Error') {
      this.setState({ status: 'error' });
      this.getData();
      return;
    }
    this.setState({ status: 'ok' });
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

  getData() {
    this.createDB()
    .then((db) => {
      const tx = db.transaction('articlesStore', 'readwrite');
      const store = tx.objectStore('articlesStore');
      let savedArticles;
      store.getAll()
      .then((data) => {
        savedArticles = data;
      })
      .then(() => this.setState({ savedArticles }));
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

};

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}
export default connect(mapStateToProps, null)(SearchList);
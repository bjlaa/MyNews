import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/searchBarActions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'interval': '',
      'searchTerm': 'football',
      'isSubmitDisabled': true,
      'previousNews': '',
      'freshNews': '',
    };
    this.saveInterval = this.saveInterval.bind(this);
    this.clearInt = this.clearInt.bind(this);
    this.saveSearchTerm = this.saveSearchTerm.bind(this);
    this.setDisableSubmit = this.setDisableSubmit.bind(this);
    this.savePreviousNews = this.savePreviousNews.bind(this);
    this.saveFreshNews = this.saveFreshNews.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  saveInterval(interval) {
    this.setState({'interval': interval});
  }

  clearInt() {
    if(this.state.interval != '') {
      clearInterval(this.state.interval);
    }
  }

  saveSearchTerm(searchTerm) {
    this.setState({'searchTerm': searchTerm});
  }

  setDisableSubmit() {
    this.setState({'isSubmitDisabled': false});
  }

  savePreviousNews(news) {
    this.setState({'previousNews': news});
  }

  saveFreshNews(news) {
    this.setState({'freshNews': news});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setDisableSubmit();
    this.clearInt();
    this.savePreviousNews(this.props.news);

    const searchTerm = this.refs.searchInput.value;
    this.saveSearchTerm(searchTerm);
    this.props.actions.launchSearch(searchTerm);

    const interval = setInterval(() => this.props.actions.launchSearch(searchTerm), 10000);
    this.saveInterval(interval);
  }

  handleChange(event) {
    this.
    this.setState({'searchTerm': event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="col-md-10 col-md-offset-1 search-bar">
        <input onChange={this.handleChange} ref="searchInput" value={this.state.searchTerm} autoFocus type="text" />
        <input disabled={!this.state.isSubmitDisabled} ref="submitButton" type="submit" value="Submit" />
      </form>
    );
  }
}

SearchBar.propTypes = {
  launchSearch: PropTypes.func,
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
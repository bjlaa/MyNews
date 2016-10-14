import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/searchBarActions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'interval': '',
      'searchTerm': '',
      'isSubmitDisabled': true,
      'previousNews': '',
      'validationClass':'',
    };
    this.setBasicNewsDisplay = this.setBasicNewsDisplay.bind(this);
    this.saveInterval = this.saveInterval.bind(this);
    this.clearInt = this.clearInt.bind(this);
    this.saveSearchTerm = this.saveSearchTerm.bind(this);
    this.setEnableSubmit = this.setEnableSubmit.bind(this);
    this.setDisableSubmit = this.setDisableSubmit.bind(this);
    this.savePreviousNews = this.savePreviousNews.bind(this);
    this.addValidationClass = this.addValidationClass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if(this.state.searchTerm == '') {
      this.setBasicNewsDisplay();
    }
  }

  componentDidUpdate() {
    if(this.props.news != this.state.previousNews && this.state.isSubmitDisabled == true) {
      this.setEnableSubmit();
    }
  }

  setBasicNewsDisplay() {
    this.props.actions.launchSearch();
    const interval = setInterval(() => this.props.actions.launchSearch(), 10000);
    this.saveInterval(interval);    
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

  clearSearchTerm() {
    this.setState({'searchTerm': ''});
  }

  setEnableSubmit() {
    this.setState({'isSubmitDisabled': false});
  }

  setDisableSubmit() {
    this.setState({'isSubmitDisabled': true});
  }

  savePreviousNews(news) {
    this.setState({'previousNews': news});
  }

  addValidationClass() {
    if(this.state.validationClass == '') {
      this.setState({'validationClass': 'get-invalid-status'});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setDisableSubmit();
    this.addValidationClass();
    this.clearInt();
    this.savePreviousNews(this.props.news);

    const searchTerm = this.refs.searchInput.value;
    this.saveSearchTerm(searchTerm);
    this.props.actions.launchSearch(searchTerm);
  }

  handleChange(event) {
    this.addValidationClass();
    this.setEnableSubmit();
    this.setState({'searchTerm': event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="col-md-10 col-md-offset-1 search-bar">
        <input onBlur={this.addValidationClass} className={this.state.validationClass} required onChange={this.handleChange} ref="searchInput" value={this.state.searchTerm} autoFocus type="text" />
        <input disabled={this.state.isSubmitDisabled} ref="submitButton" type="submit" value="Submit" />
      </form>
    );
  }
}

SearchBar.propTypes = {
  launchSearch: PropTypes.func,
  actions: PropTypes.object,
  news: PropTypes.array,
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
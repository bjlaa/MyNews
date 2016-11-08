import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
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
      'updatedTime': '',
      'toggleAnimationClass': '',
      'valueSubmitButton': 'Search',
      'coordinates': '',
     };
    this.refreshNews = this.refreshNews.bind(this);
    this.saveInterval = this.saveInterval.bind(this);
    this.clearInt = this.clearInt.bind(this);
    this.setEnableSubmit = this.setEnableSubmit.bind(this);
    this.setDisableSubmit = this.setDisableSubmit.bind(this);
    this.savePreviousNews = this.savePreviousNews.bind(this);
    this.addValidationClass = this.addValidationClass.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.selectText = this.selectText.bind(this);
    this.renderUpdateMessage = this.renderUpdateMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if(this.state.searchTerm == '') {
      this.refreshNews();
    }
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}`)
          .then((response) => response.json())
          .then((data) => {
            const city = data.results[3].address_components[0].long_name;
            if (typeof city !== undefined) {
              this.setState({'valueSubmitButton': `Search from ${city}`});              
            }
          });
        }, 
        (error) => console.log(error), 
        options
      );
    }
  }

  componentDidUpdate() {
    // This checks whether the latest news request was received 
    if(this.props.news != this.state.previousNews && this.state.isSubmitDisabled == true) {
      this.setEnableSubmit();
    }
  }

  refreshNews(searchTerm) {
    if(!searchTerm) {
      this.props.actions.launchSearch();
      this.updateTime();
      const interval = setInterval(() => {
        this.props.actions.launchSearch();
        this.updateTime();
      }, 10000);
      this.saveInterval(interval);
      return;
    }
    this.props.actions.launchSearch(searchTerm);
    this.updateTime();
    const interval = setInterval(() => {
      this.props.actions.launchSearch(searchTerm);
      this.updateTime();
    }, 10000);
    this.saveInterval(interval);   
  }

  saveInterval(interval) {
    this.setState({'interval': interval});
  }

  clearInt() {
    clearInterval(this.state.interval);
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

  updateTime() {
    this.toggleClass();
    const time = moment().format('LTS');
    this.setState({'updatedTime': time});
    setTimeout(() => this.toggleClass(), 1000);
  }

  toggleClass() {
    if(this.state.toggleAnimationClass == ''){
      this.setState({'toggleAnimationClass': 'updated-time-onupdate'});
      return;
    }
    this.setState({'toggleAnimationClass': ''});
  }

  selectText() {
    setTimeout(() => {
      this.refs.searchInput.select();
    }, 50);
  }

  renderUpdateMessage() {
    if(this.props.news !== 'Network Error') {
      const messageClass = `${this.state.toggleAnimationClass} updated-time col-md-10 col-md-offset-1`;
      return <p className={messageClass} >Updated at {this.state.updatedTime}.</p>;      
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.refs.searchInput.blur();
    this.setDisableSubmit();
    this.addValidationClass();
    this.clearInt();
    this.savePreviousNews(this.props.news);
    this.refreshNews(this.state.searchTerm);
  }

  handleChange(event) {
    this.addValidationClass();
    this.setEnableSubmit();
    this.setState({'searchTerm': event.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="col-md-10 col-md-offset-1 search-bar">
          <label className="label" htmlFor="input-search">Search</label>
          <input ref="searchInput" id="input-search" onFocus={this.selectText} onBlur={this.addValidationClass} className={this.state.validationClass} required onChange={this.handleChange} value={this.state.searchTerm} autoFocus type="text" />
          <input disabled={this.state.isSubmitDisabled} ref="submitButton" type="submit" value={this.state.valueSubmitButton} />
        </form>
        {this.renderUpdateMessage()}
      </div>

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
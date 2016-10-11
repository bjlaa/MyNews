import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/searchBarActions';

class SearchBar extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = this.refs.searchInput.value;
    this.props.actions.launchSearch(searchTerm);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="col-md-10 col-md-offset-1 search-bar">
        <input ref="searchInput" placeholder="#sounddesign"autoFocus type="text" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

SearchBar.propTypes = {
  launchSearch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
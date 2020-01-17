import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  state = {
    text: ""
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter a search term", "light");
    } else {
      this.props.searchUsers(this.state.text);
    }
  };

  handleClear = () => {
    this.setState({ text: "" });
    this.props.clearUsers();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            value={this.state.text}
            onChange={this.onChange}
            type="text"
            name="text"
            placeholder="Search Users..."
          ></input>
          <input
            type="submit"
            value="search"
            className="btn btn-dark btn-block"
          ></input>
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.handleClear}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;

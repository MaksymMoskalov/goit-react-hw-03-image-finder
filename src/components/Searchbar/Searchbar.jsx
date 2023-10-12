import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    curentKeyWord: '',
  };

  onInputChange = event => {
    this.setState({ curentKeyWord: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.curentKeyWord);
    this.setState({ curentKeyWord: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onFormSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.curentKeyWord}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

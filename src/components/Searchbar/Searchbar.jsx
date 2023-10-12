import css from './SearchBar.module.css';
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
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
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

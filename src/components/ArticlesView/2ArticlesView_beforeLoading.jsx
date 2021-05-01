import React, { Component } from 'react';
import SearchBar from '../SearchBar';
// import axios from 'axios';
// const KEY = '20575585-f86bba565132ad4f87d3b8fdb';
// const URL = 'https://pixabay.com/api/';

import ApiPixabay from '../../api/pixabay';

class ArticlesView extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    //it call when in searchQuery we got new value
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, hits: [] });
  };

  fetchArticles = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    ApiPixabay.fetchArticles(options).then(hits => {
      this.setState(prevState => ({
        hits: [...prevState.hits, ...hits],
        currentPage: prevState.currentPage + 1,
      }));
    });
  };

  render() {
    return (
      <>
        <h1>Search images on Pixabay</h1>

        <SearchBar onSubmit={this.onChangeQuery} />

        <ul>
          {this.state.hits.map(hit => (
            <li key={hit.id} className="ImageGalleryItem">
              <img
                src={hit.webformatURL}
                width="100"
                height="100"
                alt=""
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
        </ul>

        {this.state.hits.length > 0 && (
          <button type="button" onClick={this.fetchArticles}>
            Load more
          </button>
        )}
      </>
    );
  }
}

export default ArticlesView;

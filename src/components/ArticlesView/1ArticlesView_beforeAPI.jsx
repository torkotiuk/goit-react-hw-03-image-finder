import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import axios from 'axios';
const KEY = '20575585-f86bba565132ad4f87d3b8fdb';
const URL = 'https://pixabay.com/api/';

// import ApiPixabay from '../../api/pixabay'

class ArticlesView extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    //it call when in searchQuery we got new value
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  onChangeQuery = query => {
    // - save 'query' from SearchBar to this.state 'searchQuery'
    // this.setState({ searchQuery: query});

    // when we have new query, we should drop currentPage and hits
    this.setState({ searchQuery: query, currentPage: 1, hits: [] });
  };

  fetchArticles = () => {
    axios
      .get(
        `${URL}?&page=${this.state.currentPage}&key=${KEY}&q=${this.state.searchQuery}&image_type=photo&pretty=true&per_page=3`,
      )
      .then(response => {
        // v.1 --- this.setState({ hits: response.data.hits }); -- only look per 1 page

        // v2. --- load more
        this.setState(prevState => ({
          // reload our state
          // hits: response.data.hits,

          // add more state
          hits: [...prevState.hits, ...response.data.hits],
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

        <button type="button" onClick={this.fetchArticles}>
          Load more
        </button>
      </>
    );
  }
}

export default ArticlesView;

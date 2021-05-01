import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import Modal from '../Modal';
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
    error: null,
    showModal: false,
    activeObj: '',
  };

  componentDidUpdate(prevProps, prevState) {
    //it call when in searchQuery we got new value
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchArticles = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    ApiPixabay.fetchArticles(options)
      .then(hits => {
        // console.log('>>>>', hits);
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(err => this.setState({ err }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleModal = () => {
    console.log('this state>>>>', this.state.activeObj);
    this.setState(state => ({
      showModal: !state.showModal,
      activeObj: state.index,
    }));
  };

  render() {
    const { hits, isLoading, error, showModal } = this.state;
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <>
        {showModal && <Modal onClose={this.toggleModal} />}

        {error && <h1>Ups, error in your query, please search again</h1>}
        <h1>Search images on Pixabay</h1>

        <SearchBar onSubmit={this.onChangeQuery} />

        <ul>
          {hits.map((hit, index) => (
            <li key={hit.id} className="ImageGalleryItem">
              <img
                // onClick={this.toggleModal}
                onClick={() => this.toggleModal(index)}
                src={hit.webformatURL}
                width="100"
                height="100"
                alt=""
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
        </ul>

        {isLoading && <h1>Loading...</h1>}

        {shouldRenderLoadMoreButton && (
          <button type="button" onClick={this.fetchArticles}>
            Load more
          </button>
        )}
      </>
    );
  }
}

export default ArticlesView;

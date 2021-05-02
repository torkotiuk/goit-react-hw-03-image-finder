import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import Modal from '../Modal';
import ApiPixabay from '../../api/pixabay';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class ArticlesView extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: '',
    showModal: false,
    activeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    //it calls when in searchQuery we got new value
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
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error: 'Ups...' }))
      .finally(() => {
        this.setState({ isLoading: false });
        this.scrollSmooth();
      });
  };

  scrollSmooth = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  toggleModal = (index, largeImg) => {
    this.setState(state => ({
      showModal: !state.showModal,
      activeImg: largeImg,
    }));
  };

  render() {
    const { hits, isLoading, error, showModal } = this.state;
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <>
        {error && <h1>Ups, error in your query, please search again</h1>}

        <h1>Search images on Pixabay</h1>

        <SearchBar onSubmit={this.onChangeQuery} />

        <ImageGalleryItem hits={hits} toggleModal={this.toggleModal} />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.activeImg} alt="" width="200" height="200" />
          </Modal>
        )}

        {isLoading && (
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        )}

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

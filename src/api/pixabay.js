import axios from 'axios';

const KEY = '20575585-f86bba565132ad4f87d3b8fdb';
const URL = 'https://pixabay.com/api/';

const fetchArticles = ({ currentPage = 1, searchQuery = '', perPage = 5 }) => {
  return axios
    .get(
      `${URL}?&page=${currentPage}&q=${searchQuery}&image_type=photo&pretty=true&per_page=${perPage}&key=${KEY}`,
    )
    .then(response => response.data.hits);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchArticles };

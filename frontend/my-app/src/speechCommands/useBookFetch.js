import { useEffect, useState } from 'react'; 
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const useBookFetch = () => {
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isFetchingBooks, setIsFetchingBooks] = useState(false);

  const fetchBooksByAuthor = userName => {
    setIsFetchingBooks(true);
    axios.get(`${apiUrl}/userFetchByVoice/${userName}`)
      .then(res => {
        setAuthorBooks(res.data)
        setIsFetchingBooks(false);
      })
      .catch(err => console.error(err))
  }

  return {
    authorBooks,
    fetchBooksByAuthor,
    isFetchingBooks,
  };
};

export {
  useBookFetch,
}
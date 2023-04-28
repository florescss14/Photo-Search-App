import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import Pagination from './components/Pagination';
import PhotoCard from './components/PhotoCard';

// const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [photos, setPhotos] = useState([]); //Holds list of photos containing fields from https://www.pexels.com/api/documentation/#photos-overview
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10); 
  const [loading, setLoading] = useState(false);
  const [prevPage, setPrevPage] = useState(''); //url for previous page
  const [nextPage, setNextPage] = useState(''); //url for next page
  
  useEffect(() => { //Try to load and save search term if exists
    let term = window.localStorage.getItem('searchTerm'); 
    if(term !== null && term.length > 0){
      setSearchTerm(term);
    }
  }, []);
  
  useEffect(() => { //Save search term in case of page refresh
    window.localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if(searchTerm.length > 0){ //Load search term if it exists
      loadSearch();
    }else{ //Load currated page
      loadCurated();
    }
  }, [perPage]); //Refresh based on items per pagination

  // Call Backend API given the url excluding the domain
  const callApi = (url) => {
    setLoading(true);
    axios.get(
      'http://localhost:3000/' + url
    )
    .then((response) => {
      setPhotos(response.data.photos);
      setPrevPage(response.data.prev_page);
      setNextPage(response.data.next_page);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const handleSearch = (event) => {
    event.preventDefault();
    loadSearch();
  }

  const loadSearch = () => {
    if(searchTerm.length < 1)
      return;
    callApi(`api/search?query=${searchTerm}&page=1&per_page=${perPage}`);
  }

  const loadCurated = () => {
    setSearchTerm('');
    callApi(`api/curated?page=1&per_page=${perPage}`);
  };


  const handlePreviousPage = () => {
    callApi(`api/path?url=${encodeURIComponent(prevPage)}`);
  };

  const handleNextPage = () => {
    console.log(nextPage);
    callApi(`api/path?url=${encodeURIComponent(nextPage)}`);
  };

  return (
    <div>
      <h1 className="title">Photo Gallery</h1>
        <div className="search-bar">
          <label className="search-bar__label">See My Curated: </label>
          <button className="button" onClick={loadCurated}>
            Curated
          </button>
          <form className="search-bar__form" onSubmit={handleSearch}>
            <label className="search-bar__label">
              Search photos:
              <input
                className="search-bar__input"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <button className="button" type="submit">
              Search
            </button>
          </form>
        <Pagination changePerPage = {setPerPage} perPage = {perPage} prevPage = {prevPage} nextPage = {nextPage} handlePrev = {handlePreviousPage} handleNext = {handleNextPage}/>
        </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="photo-container">
          {photos.map((photo) => (
            <PhotoCard photo={photo} key={photo.id}/>
          ))}
        </div>
      )}
      <Pagination changePerPage = {setPerPage} perPage = {perPage} prevPage = {prevPage} nextPage = {nextPage} handlePrev = {handlePreviousPage} handleNext = {handleNextPage}/>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

import Film from './Filmler/Film';
import FilmListesi from './Filmler/FilmListesi';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
 
  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          setMovieList(response.data);
          console.log(response);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    let isSaved = saved.find((f) => f.id == id);
    if (!isSaved) {
      let savedMovie = movieList.find((f) => f.id == id);
      let newSaved = [...saved, savedMovie];
      setSaved(newSaved);
    }
  };


  return (
    <BrowserRouter>
      <div className="App">
        <KaydedilenlerListesi list={[ /* Burası esnek */]} />

   

        <div className="content">
        
          <main>
         
            <Switch>
              <Route path="/filmler/:id" component={Film} />
             
                <ul>
                  {movieList.map(movie => (
                    <section key={movie.id}>
                      <Link to={`/filmler/${movie.id}`}> <FilmListesi movies={movieList} /></Link>
                    </section>
                  ))}
                </ul>
            
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
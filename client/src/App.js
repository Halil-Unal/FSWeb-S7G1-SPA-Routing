import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route} from "react-router-dom";
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




  return (
    
      <div className="App">
        <KaydedilenlerListesi list={[ /* Burası esnek */]} />

        
       
         
            <Switch>
              <Route path="/movies/:id" >
             <Film movies={movieList} />
             </Route>
             <Route path="/" >
             <FilmListesi movies={movieList} />
             </Route>
               
            </Switch>
        
      </div>
   
  );
}
const getData = async (url, params) => {
    try {
      return await axios.get(url, params);
    } catch (error) {
      console.log(error);
    }
  };
   
  const getMovies1 = async () => {
    let info= document.getElementById("info");
    info.innerHTML="";
    let selectedMovie = document.getElementById("select")
    const movieData = await getData ("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "c6b2390c3ab4bfbd0e064d952df483c9",
        query: selectedMovie.value,
      }
    });
   
    if (movieData.data.results.length < 1) {
      return;
    }
   
    let movie= movieData.data.results[0];
      const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "c6b2390c3ab4bfbd0e064d952df483c9",
          append_to_response: "videos",
        }
      });
   
      const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
      const p = document.createElement('p');
      const img = document.createElement('img');
      const iframe = document.createElement('iframe');
   
      p.innerHTML = `${movie.title} -- ${movie.release_date} -- ${movie.popularity}`;
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      iframe.src = `https://www.youtube.com/embed/${trailer}`
   
      info.append(p);
      info.append(img);
      info.append(iframe);
    }
   
  ;
   
  getMovies1();  
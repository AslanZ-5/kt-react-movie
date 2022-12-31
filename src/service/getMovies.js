class GetMovies {
  async serchMovies(query = "return", page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1d5095d2457fa9660e61107e3db5b1e7&language=en-US&query=${query}&page=${page}`,
    );

    if (!res.ok) {
      throw new Error("Faild to fetch data!!!!!!!!!");
    }
    const movies = await res.json();
    return movies;
  }

  async getImage(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=1d5095d2457fa9660e61107e3db5b1e7&language=en-US`,
    );
    const image = await res.json();
    return image;
  }
}

export default GetMovies;

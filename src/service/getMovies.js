class GetMovies {
  session = localStorage.getItem("guest_session");

  session_id = this.session ? JSON.parse(this.session).guest_session_id : "";

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

  async getGuestSes() {
    const res = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=1d5095d2457fa9660e61107e3db5b1e7",
    );
    const session = await res.json();
    return session;
  }

  async sendRateRequest(id, rating) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=1d5095d2457fa9660e61107e3db5b1e7&guest_session_id=${this.session_id}`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify({
          value: rating,
        }),
      },
    );
    return res;
  }

  async getRatedMovies(page = 1) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${this.session_id}/rated/movies?api_key=1d5095d2457fa9660e61107e3db5b1e7&language=en-US&sort_by=created_at.asc&page=${page}`,
    );
    const movies = await res.json();
    return movies;
  }

  async getGenres() {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=1d5095d2457fa9660e61107e3db5b1e7&language=en-US",
    );
    const genres = await res.json();
    return genres;
  }
}

export default GetMovies;

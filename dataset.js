
let dataset = [];
let genres = [];
let occupations = [];


async function setdata() {
    const movieCsv = await (await fetch('../dataset/movie.csv')).text();
    const ratingCsv = await (await fetch('../dataset/ratings.csv')).text();
    const userCsv = await (await fetch('../dataset/user.csv')).text();
    const occupationsCsv = await (await fetch('../dataset/u.occupation')).text();
    const genresCsv = await (await fetch('../dataset/u.genre')).text();
    var movies = Papa.parse(movieCsv, { header: true }).data;
    var ratings = Papa.parse(ratingCsv, { header: true }).data;
    var users = Papa.parse(userCsv, { header: true }).data;
    genres = Papa.parse(genresCsv, { header: true }).data.filter(
        (g) => g.name !== "unknown" || g.name === ""
      );
    occupations = Papa.parse(occupationsCsv, { header: true }).data.filter((o) => o !== "none");

    for (const Rating of ratings) {
        const user = users.find((u) => u.UserID === Rating.UserID);
        const movie = movies.find((m) => m.MovieID === Rating.MovieID);
        if (!movie) continue;
        var gen = movie.Genres;
        const _genres = gen.split("|");
        dataset.push({
            user,
            movie,
            rating: Rating.Rating,
            genres: _genres,
        })
    }
    console.log(dataset);
}

window.addEventListener("load", async () => {
    await setdata();
    var event = new CustomEvent("dataset-ready");
    document.dispatchEvent(event);
});
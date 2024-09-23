import "../App.css";
import Banner from "./Banner";
import Row from "./Row";
import requests from "../utils/requests";

function MainPage() {
  return (
    <>
      <Banner reqUrl={requests.getNetflixOriginals} />
      <Row
        title="NETFLIX ORIGINALS"
        reqUrl={requests.getNetflixOriginals}
        netflixOrginal
      />
      <Row title="Trendings" reqUrl={requests.getTrending} />
      <Row title="HorrorMovies" reqUrl={requests.getHorrorMovies} />
      <Row title="ComedyMovies" reqUrl={requests.getComedyMovies} />
      <Row title="RomanceMovies" reqUrl={requests.getRomanceMovies} />
      <Row title="ActionMovies" reqUrl={requests.getActionMovies} />
      <Row title="TopRatedMovie" reqUrl={requests.getTopRatedMovies} />
      <Row title="Documentaries" reqUrl={requests.getDocumentaries} />
    </>
  );
}

export default MainPage;

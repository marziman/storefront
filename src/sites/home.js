import React, { useState } from "react";
import { Container, Typography, Divider } from "@material-ui/core";
import StoresService from "../services/stores";
import { makeStyles } from "@material-ui/core/styles";
import CardCarousel from "./card-carousel";
import "./Home.css";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const kiezList = [
  "Körtekiez",
  "Donaukiez",
  "Weserkiez",
  "Kollwitzkiez",
  "Helmholtzkiez",
  "Winsviertel",
  "Boetzowkiez",
  "Bergmannkiez",
  "Boxhagener Kiez",
  "Boxhagener Platz",
  "Samariterkiez",
  "Graefekiez",
  "Wrangelkiez",
  "Ludwigkirchkiez",
  "Stuttgarter Platz",
  "Brüsseler Kiez",
  "Prenzlauer Berg",
  "Kreuzberg",
  "Friedrichshain",
  "Neukölln",
  "Treptow",
  "Bohnenviertel",
  "Heusteigviertel",
  "Killesberg",
  "Belgisches Viertel",
  "Agnesviertel",
  "Kunibertsviertel",
  "Severinsviertel",
  "Kwartier Latäng",
  "Eigelstein",
  "Rathenauviertel",
  "Kortländer-Kiez",
  "Ehrenfeld",
  "Treppenviertel",
  "Karolinenviertel",
  "Schanzenviertel",
  "St. Georg",
  "Glockenbachviertel",
  "Schwabing",
  "Maxvorstadt",
  "Au"
];

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

export default function Home() {
  const classes = useStyles();
  const [kiez, setKiez] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [storeData, setStoreData] = useState([]);

  const fetchStoreData = async location => {
    const StoreServiceInstance = new StoresService();
    setStoreData(await StoreServiceInstance.getStores(location));
  };

  return (
    <Container maxWidth={"xs"}>
      <div className="home__search_panel">
        <Typography variant="h5" className="home__align-right">
          Sei ein Held zu Zeiten von Corona.
          <br />
          Rette den Laden bei Dir um die Ecke.
          <br />
          Hier kannst Du helfen.
        </Typography>
        <form
          className="home__form"
          onSubmit={e => {
            e.preventDefault();
            fetchStoreData(kiez);
          }}
        >
          <div className="home__search-wrapper">
            <label htmlFor="home__search" className="home__search-label">
              Ort
            </label>
            <FontAwesomeIcon
              className="home__search-marker"
              icon={faMapMarkerAlt}
            />
            <input
              id="home__search"
              className="home__search"
              type="text"
              autoComplete="off"
              value={kiez}
              placeholder="Wähle einen Ort…"
              onChange={e => {
                setKiez(e.target.value);
                setFilteredLocations(
                  e.target.value
                    ? kiezList.filter(location =>
                        location
                          .toLowerCase()
                          .match(e.target.value.toLowerCase())
                      )
                    : []
                );
              }}
            />
            {kiez && filteredLocations && filteredLocations.length > 0 && (
              <ul className="home__selection-list">
                {filteredLocations.map(option => (
                  <li
                    className="home__selection-list-item"
                    onClick={e => {
                      e.preventDefault();
                      setKiez(option);
                      setFilteredLocations([]);
                      fetchStoreData(option);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="home__submit-btn"
            type="submit"
            onClick={e => {
              //e.preventDefault();
              fetchStoreData(kiez);
            }}
          >
            Suchen
          </button>
        </form>
      </div>
      {storeData.length > 0 ? (
        <>
          <CardCarousel storeData={storeData} />
        </>
      ) : (
        kiez.length > 0 && `Keine Ergebnisse für Suche nach "${kiez}"`
      )}
    </Container>
  );
}

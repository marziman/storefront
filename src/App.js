import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { theme } from "./Theme";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import About from "./sites/aboutus";
import Home from "./sites/home";
import Samples from "./sites/samples";
import StoreProfile from "./sites/StoreProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import BackgroundImg from "./assets/images/main-bg.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    background: `white url(${BackgroundImg}) no-repeat`,
    backgroundSize: "cover"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  appBar: {
    borderTop: `3px solid #006735`,
    background: "white",
    fontWeight: "bold",
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    padding: "10px 0"
  },
  logo: {
    textDecoration: "none"
  },
  logoSubtitle: {
    color: "#888",
    fontWeight: "normal"
  },
  logoSubtitleHighlight: {
    color: "#006735",
    fontWeight: "bold"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1
  },
  appname: {
    color: "black",
    fontSize: "1.1em",
    margin: "0"
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar
            color={"transparent"}
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              <Container maxWidth="xs" className={classes.header}>
                <FontAwesomeIcon icon={faBars} />
                <Link to="/" className={classes.logo}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="app__logo"
                      src="/assets/images/logo.png"
                      style={{
                        width: "64px",
                        height: "auto"
                      }}
                      alt="Main Logo"
                    />
                    <Typography variant="h6" className={classes.logoSubtitle}>
                      small business{" "}
                      <span className={classes.logoSubtitleHighlight}>
                        hero
                      </span>
                    </Typography>
                  </div>
                  {/*  Placeholder text for logo*/}
                </Link>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Container>
            </Toolbar>
          </AppBar>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/stores/:storeId" component={StoreProfile} />
                <Route path="/samples">
                  <Samples />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

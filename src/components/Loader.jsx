import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: "2"
  },
  spinnerContainer: {
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0)"
  },
  progress: {
    //margin: theme.spacing.unit * 2
  },
  textCenter: {
    textAlign: "center"
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class Loader extends Component {
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  //   constructor(props) {
  //     super(props);
  //     this.state = {};
  //   }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.spinnerContainer}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} className={classes.textCenter}>
            <CircularProgress
              className={classes.progress}
              variant="determinate"
              value={this.state.completed}
            />
            <Typography component="p">Please wait loading...</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Loader);

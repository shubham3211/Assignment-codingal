import React, { useEffect, useRef, useState } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as ReactRouterDomLink } from "react-router-dom";
const EndClassModal = React.lazy(() => import("../EndClassModal"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

const convertTimeToMinutes = (miliSeconds: number): string => {
  const minutes = parseInt(String(miliSeconds / 60));
  const seconds = parseInt(String(miliSeconds)) % 60;
  return `${minutes}:${String(seconds).length === 1 ? "0" + seconds : seconds}`;
};

const useTimer = () => {
  const [time, setTime] = useState<number>(10 * 60);
  const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    if (time <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t: number) => {
        return t - 1;
      });
    }, 1000);
    intervalRef.current = interval;
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { time: convertTimeToMinutes(time), setTime };
};

const CodingalDrawer = ({
  open,
  closeDrawer,
  time,
  openEndClassDialog,
}: {
  open: boolean;
  closeDrawer: () => void;
  time: string;
  openEndClassDialog: () => void;
}) => {
  return (
    <Drawer anchor={"right"} open={open} onClose={closeDrawer}>
      <List>
        <ListItem>
          <Button
            color="secondary"
            variant="contained"
            onClick={openEndClassDialog}
          >
            End Class
          </Button>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary={time} style={{ textAlign: "center" }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

function Header() {
  const classes = useStyles();
  const { time, setTime } = useTimer();
  const theme = useTheme();
  const screenSizeLessThanLg = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [openEndClassDialog, setOpenEndClassDialog] = useState(false);

  return (
    <>
      <React.Suspense fallback="">
        {openEndClassDialog && (
          <EndClassModal
            open={openEndClassDialog}
            onClose={() => setOpenEndClassDialog(false)}
            endClass={() => setTime(0)}
          />
        )}
      </React.Suspense>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Typography variant="h6" style={{ marginRight: theme.spacing(2) }}>
              <ReactRouterDomLink to="/">
                <img
                  src="https://cdn.codingal.com/images/logos/logos-main/logo-with-text.svg"
                  alt=""
                  width="119"
                  height="32"
                  style={{ cursor: "pointer" }}
                />
              </ReactRouterDomLink>
            </Typography>
            <Link
              color="secondary"
              className={classes.title}
              component={ReactRouterDomLink}
              to="/passengers"
            >
              Passengers
            </Link>
            {screenSizeLessThanLg ? (
              <IconButton onClick={() => setShowDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Box p={2}>
                  <Typography variant="body1" color="textPrimary">
                    {time}
                  </Typography>
                </Box>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setOpenEndClassDialog(true)}
                >
                  End Class
                </Button>
              </>
            )}
          </Toolbar>

          <CodingalDrawer
            time={time}
            open={showDrawer}
            closeDrawer={() => setShowDrawer(false)}
            openEndClassDialog={() => setOpenEndClassDialog(true)}
          />
        </AppBar>
      </div>
    </>
  );
}

export default Header;

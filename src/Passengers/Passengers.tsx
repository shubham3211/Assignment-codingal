import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { useCallback } from "react";
import { useRef } from "react";
import useGetPassenger from "../hooks/useGetPassenger";
import Backdrop from "@material-ui/core/Backdrop";
import MuiAlert from "@material-ui/lab/Alert";

function Passengers() {
  const [page, setPage] = useState(0);
  const { passengers, loading, error, hasMore } = useGetPassenger({ page });
  const observer = useRef<IntersectionObserver | undefined>();
  const lastPaggengerRef = useCallback(
    (node) => {
      if (loading || !hasMore) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      });
      node && observer.current.observe(node);
    },
    [loading]
  );

  if (loading && !passengers.length) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <MuiAlert severity="error">{error}</MuiAlert>
      </Snackbar>
      <Box mt={2}>
        <Typography variant="h3" align="center">
          Passengers
        </Typography>
      </Box>
      <Grid
        container
        style={{
          height: "300px",
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <List style={{ width: "100%" }}>
          {passengers.map((passenger, index) => (
            <React.Fragment key={passenger._id}>
              <ListItem
                {...(index === passengers.length - 1
                  ? { ref: lastPaggengerRef }
                  : {})}
                button
              >
                <ListItemText primary={passenger.name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}

          {loading && (
            <ListItem button style={{ justifyContent: "center" }}>
              <CircularProgress color="inherit" />
            </ListItem>
          )}
        </List>
      </Grid>
    </>
  );
}

export default Passengers;

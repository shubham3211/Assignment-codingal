import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Collapse from "@material-ui/core/Collapse";

const questions = ["Class Completed", "Class interrupted/aborted"];
const subQuestions = [
  "Student didn't show up for the class",
  "Student didn't show any interest",
  "Student got disconnected",
  "I got disconnected",
  "Other Reason",
];

enum specialQuestionVal {
  ClassInteruppted = 1,
  OtherResson = 4,
}

function EndClassModal({
  open,
  onClose,
  endClass,
}: {
  open: boolean;
  onClose: () => void;
  endClass: () => void;
}) {
  const [mainQuestionAnswer, setMainQuestionAnswer] = useState<
    number | undefined
  >();
  const [subQuestionAnswer, setSubQuestionAnswer] = useState<
    number | undefined
  >();
  const theme = useTheme();

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        style={{ marginLeft: "auto" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Select a reason to end the class
        </Typography>
      </DialogTitle>
      <DialogContent>
        {questions.map((question, index) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  name="jason"
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                  checked={mainQuestionAnswer === index}
                  onChange={() => {
                    setMainQuestionAnswer(index);
                    setSubQuestionAnswer(undefined);
                  }}
                />
              }
              label={question}
              key={index}
            />
            <br />
          </>
        ))}
        {
          <Collapse
            in={mainQuestionAnswer === specialQuestionVal.ClassInteruppted}
          >
            <Box pl={2}>
              {subQuestions.map((question, index) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="jason"
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleCheckedFilled />}
                        checked={subQuestionAnswer === index}
                        onChange={() => setSubQuestionAnswer(index)}
                        size="small"
                      />
                    }
                    label={question}
                    key={index}
                  />
                  <br />
                </>
              ))}
            </Box>
          </Collapse>
        }
        {
          <Collapse in={subQuestionAnswer === specialQuestionVal.OtherResson}>
            <Box pl={2} pt={1}>
              <TextareaAutosize
                aria-label="Type Here"
                minRows={3}
                placeholder="Type Here"
                style={{ border: "1px solid black", width: "100%" }}
              />
            </Box>
          </Collapse>
        }
      </DialogContent>
      <Grid>
        <Box pl={3} pb={2} pt={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: theme.spacing(2) }}
            onClick={() => {
              endClass();
              onClose();
            }}
          >
            End Class
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Grid>
    </Dialog>
  );
}

export default EndClassModal;

import React, { Fragment, useRef, useState } from "react";
import "./index.scss";
import { Translate } from "react-localize-redux";
import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import VideoPlayer from "spotify-shared-web/components/common/VideoPlayer";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { Check, Close } from "@material-ui/icons";
import Button from "spotify-shared-web/components/common/Button";

import SCREEN_CONFIG from "../../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registrationEducation;

const useStyles = makeStyles((theme) => ({
  select: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#007BFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#007BFF",
      },
    },
  },
  menuItem: {
    width: "100%", // Ensures full width for items
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#e8f4ff",
    },
    "&.Mui-selected": {
      backgroundColor: "#dff6f0", // Matches the light green-blue color in the screenshot
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#c5e6e0",
    },
  },
}));

export const EducationModule = ({
  agentProfile,
  educationModule,
  SubmitAnswers,
  outstandingTask,
  fetchCorrectAnswers,
  skipModule,
}) => {
  const firstOption = useRef(null);
  const classes = useStyles();
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctAns, setCorrectAns] = useState({});

  // Handle answer selection
  const handleAnswerChange = (questionName, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionName]: selectedOption.trim(),
    }));
  };

  // Handle form submission
  const submitAnswer = async (redirect) => {
    let score = 0;
    let correctAnsweredQuestions = "";

    if (!redirect) {
      let correctAnswers = await fetchCorrectAnswers();
      setCorrectAns(correctAnswers);

      for (const [key, value] of Object.entries(answers)) {
        if (value === correctAnswers[key].trim()) {
          correctAnsweredQuestions += `${key} : ${value}, `;
          score += 1;
        }
      }
    }

    const result = {
      educationalContentId:
        educationModule.questions.length > 0
          ? educationModule.questions[0].educationalContentId
          : "",
      agentId: agentProfile.agentId,
      assessmentAnswer: correctAnsweredQuestions,
      numberOfCorrectAnswer: score,
      isVideoWatched: isVideoPlayed && isVideoCompleted,
      mandatoryTask: outstandingTask && redirect,
      redirect: redirect,
    };

    if (parseInt(educationModule.completionCriteria, 10) <= score) {
      Object.assign(result, {
        isPass: true,
      });
    } else {
      Object.assign(result, {
        isPass: false,
      });
    }
    SubmitAnswers(result);
  };

  const handleNext = () => {
    if (isSubmitted) {
      setIsSkipping(true);
      skipModule({ mandatoryTask: outstandingTask });
    } else {
      setIsLoading(true);
      submitAnswer(true);
    }
  };

  const handleSubmit = () => {
    submitAnswer(false);
    setIsSubmitted(true);
  };


  if (educationModule.isFetching) return <LoadingComponent />;

  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          <div className="container">
            <h1 className="learn-heading">
              {translate(`${CURRENT_SCREEN}.learn`)}
            </h1>
            <div className="grid-container">
              <p className="intro-text">
                {translate(`${CURRENT_SCREEN}.introText`)}
              </p>
              <p className="intro-text">
                {translate(`${CURRENT_SCREEN}.questionSection`)}
              </p>

              {/* Bottom Section: Questions */}

              <div className="video-section">
                <VideoPlayer
                  url={educationModule.videoUrl}
                  controls
                  width={"100%"}
                  height={"100%"}
                  setPlayed={() => setIsVideoPlayed(true)}
                  setCompleted={() => setIsVideoCompleted(true)}
                />
              </div>
              <Box
                sx={{
                  padding: "16px 25px",
                  backgroundColor: "#EAEFF2",
                  flex: 1,
                  width: "100%",
                }}
              >
                {educationModule.questions.length &&
                  educationModule.questions.map((item) => {
                    return (
                      <Box key={item.questionId} className="question-box">
                        <Typography className="question-text">
                          {item.questionText}
                        </Typography>
                        <TextField
                          id={item.questionId}
                          select
                          fullWidth
                          variant="standard"
                          disabled={
                            isSubmitted || isLoading || educationModule.isSaving
                          }
                          value={
                            answers[item.questionName] || "Choose your answer"
                          }
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              backgroundColor:
                                answers[item.questionName] &&
                                correctAns[item.questionName]
                                  ? answers[item.questionName].trim() ===
                                    correctAns[item.questionName]
                                    ? "#DFFFD6"
                                    : "#FFD6D6" // Green for correct, Red for wrong
                                  : "white",
                            },
                            endAdornment:
                              answers[item.questionName] &&
                              correctAns[item.questionName] ? (
                                <InputAdornment position="end">
                                  {answers[item.questionName].trim() ===
                                  correctAns[item.questionName] ? (
                                    <Check color="green" />
                                  ) : (
                                    <Close color="red" />
                                  )}
                                </InputAdornment>
                              ) : (
                                ""
                              ),
                          }}
                          onChange={(e) =>
                            handleAnswerChange(
                              item.questionName,
                              e.target.value,
                              e
                            )
                          }
                          className={classes.select}
                          SelectProps={{
                            MenuProps: {
                              getContentAnchorEl: () => firstOption.current,
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              PaperProps: {
                                style: {
                                  //maxHeight: 200, // Limit dropdown height
                                  maxWidth: 400,
                                },
                              },
                            },
                          }}
                        >
                          <MenuItem
                            className="menu-item"
                            ref={firstOption}
                            value="Choose your answer"
                            disabled
                          >
                            <span> Choose your answer </span>
                          </MenuItem>
                          {item.answerOptions.split("\n").map((option) => (
                            <MenuItem
                              className="menu-item"
                              key={option.split(/[.\])]+/)[0]}
                              value={option.split(/[.\]]+/)[1].trim()}
                            >
                              <span className="option-text">
                                {option.split(/[.\]]+/)[1].trim()}{" "}
                              </span>
                            </MenuItem>
                          ))}
                        </TextField>
                        {isSubmitted &&
                          correctAns[item.questionName] !==
                            answers[item.questionName] && (   
                              <Typography
                                variant="body1"
                                style={{
                                  marginTop: "8px",
                                }}
                              >
                                <span style={{marginRight: "5px"}}>
                                <b>Correct Answer : </b>
                                <i>{correctAns[item.questionName]}</i>
                                </span>
                                ✔
                                {/* <Check color="green" /> */}
                              </Typography>
                            
                          )}
                      </Box>
                    );
                  })}
              </Box>
            </div>
            <div className="nextbutton-container">
              <Button
                size="newSmall"
                isSubmitting={educationModule.isSaving && !isLoading}
                onClick={handleSubmit}
                disabled={
                  Object.entries(answers).length <
                    parseInt(educationModule.completionCriteria, 10) ||
                  isSubmitted
                }
              >
                {translate(`${CURRENT_SCREEN}.Submit`)}
              </Button>
              <Button
                size="newSmall"
                isSubmitting={isLoading || isSkipping}
                onClick={handleNext}
                disabled={educationModule.isSaving && !isLoading}
              >
                {!isSubmitted ? translate(`${CURRENT_SCREEN}.Skip`): translate(`${CURRENT_SCREEN}.Next`)}
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </Translate>
  );
};

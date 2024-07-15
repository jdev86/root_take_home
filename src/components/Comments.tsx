import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  TextField,
  Box,
} from "@mui/material";

import { useCallback, useEffect, useRef, useState } from "react";
import useAppStore from "../store";
import { deepOrange } from "@mui/material/colors";
import { defaultChatMessageColor } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "../types";

export const SuggestionComments = () => {
  const scrollRef = useRef<null | HTMLLIElement>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const { getSuggestion, selectedSuggestion, addComment, getComments, user } =
    useAppStore();

  const isOriginalSuggester = (userId: string) => userId === user.id;

  useEffect(() => {
    if (!selectedSuggestion) return;
    const suggestion = getSuggestion(selectedSuggestion);

    const latestComments = suggestion?.comments;

    if (!suggestion || !latestComments) return;

    setComments(latestComments);
    setComment("");
  }, [getSuggestion, selectedSuggestion]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const handleAddComment = useCallback(() => {
    if (!comment || !selectedSuggestion) return;
    const dateTime = new Date();

    const newComment: Comment = {
      id: uuidv4(),
      userId: user.id,
      userName: user.name,
      text: comment,
      createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
    };

    addComment(selectedSuggestion, newComment);
    const comments = getComments(selectedSuggestion) || [];

    setComments(comments);
    setComment("");
  }, [selectedSuggestion, comment, getComments, addComment, user]);

  return (
    <Box
      width={"100%"}
      height={"91%"}
      border="1px solid grey"
      borderRadius="1.5rem"
    >
      <Grid
        borderRadius="1.5rem"
        height={"100%"}
        overflow={"auto"}
        bgcolor="rgb(3,1,39,0.3)"
      >
        {!comments.length ? (
          <Box height={"100%"} color={"#fff"} padding={2}>
            No comments yet! Use textbox below to add one!
          </Box>
        ) : (
          <List
            sx={{
              display: "grid",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              zIndex: 1,
            }}
          >
            {comments.map((c) => (
              <ListItem
                key={c.id}
                ref={scrollRef}
                sx={{
                  display: "-webkit-box",
                  borderRadius: "1.5rem",
                  marginTop: 1,
                  marginBottom: 1,
                  height: "fit-content",
                  width: "fit-content",
                  justifySelf: isOriginalSuggester(c.userId)
                    ? "flex-end"
                    : "flex-start",
                  bgcolor: isOriginalSuggester(c.userId)
                    ? "rgb(107,230,206,0.7)"
                    : defaultChatMessageColor,
                  color: "whitesmoke",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {c.userName[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    width: "80%",
                    wordBreak: "break-word",
                    color: "whitesmoke",
                  }}
                  primary={c.text}
                  secondary={c.createdDateTime}
                  primaryTypographyProps={{
                    sx: { color: "whitesmoke" },
                  }}
                  secondaryTypographyProps={{
                    sx: { color: "whitesmoke" },
                  }}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>

      <TextField
        id="standard-text"
        label="Enter Comment"
        sx={{
          width: "100%",
          bgcolor: "rgb(3,1,39,0.3)",
          border: "1px solid grey",
        }}
        onChange={(e) => setComment(e.target.value)}
        margin="normal"
        value={comment}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            handleAddComment();
          }
        }}
        InputLabelProps={{
          style: {
            color: "#F5F5F5",
          },
        }}
        inputProps={{
          sx: {
            color: "#F5F5F5",
            "&::label": {
              color: "#F5F5F5",
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
};

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { categories } from "../utils/constants";
import useAppStore from "../store";
import {
  Divider,
  TextField,
  Grid,
  ListItemButton,
  Stack,
  ListItem,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { loremIpsum, name } from "react-lorem-ipsum";
import store from "../store";

export const SuggestionList = () => {
  const {
    addSuggestion,
    suggestions,
    setSelectedSuggestion,
    selectedSuggestion,
    user,
  } = useAppStore();
  const [suggestion, setSuggestion] = useState<string>("");

  const [count, setCount] = useState(0);

  const determineSuggestionSelected = useCallback(
    (id: string): boolean | undefined => {
      if (!suggestions) return;
      if (selectedSuggestion !== "0") {
        return selectedSuggestion === id;
      }

      setSelectedSuggestion(suggestions[0].id || "");
      return suggestions[0].id === id;
    },
    [selectedSuggestion, setSelectedSuggestion, suggestions]
  );

  useEffect(() => {
    const dateTime = new Date();
    const { addSuggestion } = store.getState();

    const randomUser = {
      id: uuidv4(),
      name: name(),
    };

    const interval = setInterval(() => {
      if (count > 10) return;
      setCount(count + 1);

      const randomSuggestion = {
        id: uuidv4(),
        text: loremIpsum({ avgSentencesPerParagraph: 1, random: true })[0],
        createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
        comments: [
          {
            id: uuidv4(),
            userId: randomUser.id,
            userName: randomUser.name,
            text: loremIpsum({ avgSentencesPerParagraph: 1, random: true })[0],
            createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
          },
        ],
        userId: randomUser.id,
      };

      addSuggestion(randomSuggestion);
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  const handleAddSuggestion = useCallback(() => {
    const dateTime = new Date();
    const newSuggestion = {
      id: uuidv4(),
      text: suggestion,
      createdDateTime: `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`,
      comments: [],
      userId: user.id,
    };

    setSelectedSuggestion(newSuggestion.id);

    addSuggestion(newSuggestion);
    setSuggestion("");
  }, [suggestion, user.id, setSelectedSuggestion, addSuggestion]);

  const determineSuggestionsDisplayed = (sectionId: number) => {
    switch (sectionId) {
      case 0: {
        return suggestions.filter((s) => s.userId === user.id);
      }
      case 1: {
        return suggestions.filter((s) => s.userId !== user.id);
      }
    }
  };

  return (
    <Grid width={500}>
      <List
        sx={{
          bgcolor: "rgb(3,1,39,0)",
          border: "1px solid grey",
          color: "whitesmoke",
          position: "relative",
          overflow: "auto",
          height: "83vh",
          borderRadius: "1.5rem",
          "& ul": { padding: 0 },
          width: "100%",
        }}
        subheader={<li />}
      >
        {[
          { id: 0, name: categories[0] },
          { id: 1, name: categories[1] },
        ].map((section) => (
          <ListItem key={`section-${section.id}`}>
            <List sx={{ width: "100%" }}>
              <ListSubheader sx={{ bgcolor: "#172436", color: "aquamarine" }}>
                {section.name}
              </ListSubheader>
              {determineSuggestionsDisplayed(section.id)?.map((item) => (
                <ListItemButton
                  key={`item-${section.id}-${item.id}`}
                  onClick={() => setSelectedSuggestion(item.id)}
                  sx={{ cursor: "pointer" }}
                  selected={determineSuggestionSelected(item.id)}
                  style={{ opacity: "100% !important" }}
                >
                  <ListItemText
                    primary={item.text}
                    secondary={item.createdDateTime}
                    secondaryTypographyProps={{
                      color: "#D4D4D4",
                    }}
                  />
                </ListItemButton>
              ))}
              {section.id === 0 && (
                <Stack sx={{ marginTop: 2 }}>
                  <Divider sx={{ borderColor: "aquamarine" }} />
                  <TextField
                    id="standard-text"
                    placeholder="Enter New Suggestion"
                    variant="standard"
                    size="small"
                    sx={{
                      width: "100%",
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                    onChange={(e) => setSuggestion(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.code === "Enter") {
                        handleAddSuggestion();
                      }
                    }}
                    margin="normal"
                    value={suggestion}
                    inputProps={{
                      sx: {
                        color: "#F5F5F5",
                        "&::placeholder": {
                          color: "#F5F5F5",
                          opacity: 1, // otherwise firefox shows a lighter color
                        },
                      },
                    }}
                  />
                  <Divider sx={{ borderColor: "aquamarine" }} />
                </Stack>
              )}
            </List>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

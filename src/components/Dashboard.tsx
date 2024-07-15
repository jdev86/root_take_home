import Box from "@mui/material/Box";
import { SuggestionComments } from "./Comments";
import { SuggestionList } from "./List";

export const Dashboard = () => {
  return (
    <Box
      id="middle-content"
      style={{ display: "flex" }}
      height={"97vh"}
      width={"100%"}
      paddingTop={10}
      paddingLeft={5}
      paddingRight={5}
      paddingBottom={10}
    >
      <SuggestionList />
      <SuggestionComments />
    </Box>
  );
};

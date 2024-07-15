import Box from "@mui/material/Box";
import { SuggestionComments } from "./Comments";
import { SuggestionList } from "./List";

export const Dashboard = () => {
  return (
    <Box
      id="middle-content"
      style={{ display: "flex" }}
      height={"98vh"}
      width={"100vw"}
      paddingTop={10}
      paddingLeft={5}
      paddingRight={5}
    >
      <SuggestionList />
      <SuggestionComments />
    </Box>
  );
};

import { AppBar, Box, Stack, Typography } from "@mui/material";
import { Dashboard } from "./components/Dashboard";
import RootLogo from "./assets/root_logo.svg?react";

export function App() {
  return (
    <Box>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Stack direction={"row"} padding={2}>
          <Box sx={{ mr: 2, pt: 1 }}>
            <RootLogo />
          </Box>
          <Typography
            variant="h4"
            sx={{
              ml: 1,
              mt: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Suggestions App
          </Typography>
        </Stack>
      </AppBar>
      <Dashboard />
    </Box>
  );
}

export default App;

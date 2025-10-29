import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme";

export default function Happenings() {
  return (
    <Box sx={{ textAlign: "center", pb: "3rem" }}>
      
      <Box sx={{
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        pt: "2rem", 
        pb: "3rem"
        }}>
      <Typography variant="h3" sx={{ py: "1rem" }}>
        IBE Happenings:
      </Typography>
      
    </Box>
      
    </Box>
  );
}

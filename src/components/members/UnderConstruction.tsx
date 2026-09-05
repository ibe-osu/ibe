import { Box, Container, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

interface UnderConstructionProps {
  title: string;
  description: string;
}

export default function UnderConstruction({ title, description }: UnderConstructionProps) {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 14 }, textAlign: "center" }}>
      <ConstructionIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
      <Typography variant="h3" component="h1" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Under construction — check back soon.
        </Typography>
      </Box>
    </Container>
  );
}

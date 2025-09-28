import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";

interface IndividualCardProps {
  name: string;
  role: string;
  email: string;
}

export default function IndividualCard(props: IndividualCardProps) {
  const { name, role, email } = props;
  const condensedName = name.replace(/\s+/g, "").toLowerCase();

  return (
    <Box
      sx={{
        py: { xs: "0rem", sm: "1rem" },
        px: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src={`/people/${condensedName}.jpeg`}
        alt={name}
        width={167}
        height={200}
        style={{ objectFit: "cover" }}
      />
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {role}
        </Typography>
        <Typography variant="body2">{email}</Typography>
      </Box>
    </Box>
  );
}

// import { Box, Typography } from "@mui/material";
// import theme from "@/theme/theme";

// interface ColumnProps {
//   title: string;
//   points: string[];
//   backgroundColor: string;
//   backgroundImage: string;
// }

// function Column({
//   title,
//   points,
//   backgroundColor,
//   backgroundImage,
// }: ColumnProps) {
//   return (
//     <Box>
//       <Typography variant="h3" sx={{ backgroundColor }}>
//         {title}
//       </Typography>
//       <Box
//         sx={{
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "200px",
//           borderRadius: "8px",
//         }}
//       />
//       <Box>
//         {points.map((point, index) => (
//           <Typography key={index} variant="body1">
//             {point}
//           </Typography>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default function VennDiagram() {
//   return (
//     <Box
//       sx={{
//         direction: "row",
//         display: "flex",
//         color: "secondary.main",
//         width: "100%",
//         justifyContent: "center",
//       }}
//     >
//       {/* College of Engineering */}
//       <Box>
//         <Typography variant="h3" sx={{ backgroundColor: "secondary.light" }}>
//           College of Engineering
//         </Typography>
//       </Box>

//       {/* Overlapping Area */}
//       <Box sx={{ flexGrow: 1, alignContent: "center" }}>
//         <Box
//           sx={{
//             background: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.primary.main})`,
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           placeholder
//         </Box>
//       </Box>

//       {/* Fisher College of Business */}
//       <Box>
//         <Typography variant="h3" sx={{ backgroundColor: "primary.main" }}>
//           Fisher College of Business
//         </Typography>
//         <Typography>
//           Focus on business, finance, marketing, accounting, management, and
//           entrepreneurship. Offers MBA programs and specialized graduate
//           business degrees.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

import * as React from "react";
import {
  alpha,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import theme from "@/theme/theme";

type ColumnProps = {
  title: string;
  color: string; // e.g. "secondary.light" or theme.palette.secondary.light
  points: string[];
  bgImage?: string; // optional background image url
};

function Column({ title, color, points, bgImage }: ColumnProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
    >
      {/* wash to keep text readable */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: alpha(theme.palette.secondary.main, 0.75),
          pointerEvents: "none",
        }}
      />
      {/* header bar */}
      <Box sx={{ position: "relative" }}>
        <Typography
          variant="h4"
          sx={{
            px: 3,
            py: 2,
            bgcolor: color,
            color: "secondary.main",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* content */}
      <Box sx={{ position: "relative", p: { xs: 2, md: 3 }, flexGrow: 1 }}>
        <List dense>
          {points.map((p, i) => (
            <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 28, pt: "4px" }}>
                <CheckCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: "body1" }}
                primary={p}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default function IBECompare() {
  return (
    <Grid
      container
      sx={{
        minHeight: { xs: 0, md: 560 },
      }}
    >
      {/* Left: College of Engineering */}
      <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
        <Column
          title="College of Engineering"
          color="secondary.light"
          bgImage="/engineering.png"
          points={[
            "Focus on mechanical, electrical, civil, chemical, and computer engineering.",
            "Undergraduate and graduate degrees in engineering fields.",
            "Careers in technology, innovation, design, and infrastructure.",
            "Emphasizes problem-solving, technical proficiency, and hands-on learning.",
            "Internships and co-ops with tech companies and research institutions.",
            "Strong alumni network in engineering sectors.",
          ]}
        />
      </Grid>

      {/* Middle: Overlap */}
      <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
        <Box
          sx={{
            position: "relative",
            borderY: 1,
            borderColor: "divider",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* gradient background */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(90deg, ${theme.palette.secondary.light}, ${theme.palette.primary.main})`,
              opacity: 0.25,
            }}
          />
          <Box sx={{ position: "relative", p: { xs: 2, md: 3 }, flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, textAlign: "center", mb: 2 }}
            >
              IBE Overlap
            </Typography>
            <List
              dense
              sx={{ "& .MuiListItem-root": { alignItems: "flex-start" } }}
            >
              {[
                "Combine technical knowledge (e.g., programming/CAD) with entrepreneurship and business.",
                "Prepares students for careers anywhere between consulting and technology.",
                "Diverse learning through problem-solving, communication, analysis, and leadership.",
                "Heightened industry connections and professional opportunities.",
                "Alumni in roles across both business and engineering.",
              ].map((p, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28, pt: "4px" }}>
                    <CheckCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={p} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* optional vertical accents to mimic center borders */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 3,
              bgcolor: "secondary.main",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: 3,
              bgcolor: "primary.main",
              opacity: 0.5,
            }}
          />
        </Box>
      </Grid>

      {/* Right: Fisher College of Business */}
      <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
        <Column
          title="Fisher College of Business"
          color="primary.main"
          bgImage="/fisher.png"
          points={[
            "Focus on business, finance, marketing, accounting, management, and entrepreneurship.",
            "MBA programs and specialized graduate business degrees.",
            "Careers in corporate, financial, and consulting industries.",
            "Emphasizes leadership, communication, and strategic decision-making.",
            "Internship and networking opportunities with companies and businesses.",
            "Strong alumni network in business sectors.",
          ]}
        />
      </Grid>
    </Grid>
  );
}

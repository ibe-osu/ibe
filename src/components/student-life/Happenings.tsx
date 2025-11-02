import { Box, Typography, Divider } from "@mui/material";
import theme from "@/theme/theme";

export default function Happenings() {
  return (
    <Box
      sx={{
        position: "relative",
        left: "50%",
        width: "100vw",
        ml: "-50vw",
        mr: "-50vw",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          py: { xs: 3, md: 4 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ letterSpacing: 1.5 }}>
          IBE Happenings:
        </Typography>
      </Box>

      {/* Content Container */}
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* Event 1: IBE Date Party */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
            mb: { xs: 4, md: 6 },
          }}
        >
          {/* Left Side: Text Content */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 45%" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              textAlign: "right",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                textAlign: "right",
              }}
            >
              IBE Date Party!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontStyle: "italic",
                textAlign: "right",
              }}
            >
              4/11/25
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.7,
                color: theme.palette.text.primary,
                textAlign: "right",
              }}
            >
              IBE certainly made our Date Party one to remember! From the great
              music and dancing to the amazing energy and unforgettable moments,
              the night was a huge success. Until next time, keep the memories
              alive and the good vibes going! Thanks to Buckeye Undergraduate
              Consulting Club, Students Consulting for Nonprofit Organizations,
              and Ohio State Business Builders for partnering with us on this
              exciting event!
            </Typography>
          </Box>

          {/* Right Side: Photo Gallery Placeholder */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 50%" },
              backgroundColor: theme.palette.grey[300],
              borderRadius: 2,
              minHeight: { xs: 250, md: 300 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
              Photo Gallery Placeholder
            </Typography>
          </Box>
        </Box>

        {/* Horizontal Divider */}
        <Divider
          sx={{
            my: { xs: 4, md: 6 },
            borderColor: theme.palette.grey[400],
            borderWidth: 1,
          }}
        />

        {/* Event 2: IBE Goes to Cleveland */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Left Side: Photo Gallery Placeholder */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 50%" },
              backgroundColor: theme.palette.grey[300],
              borderRadius: 2,
              minHeight: { xs: 250, md: 300 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              order: { xs: 2, md: 1 },
            }}
          >
            <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
              Photo Gallery Placeholder
            </Typography>
          </Box>

          {/* Right Side: Text Content */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 45%" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              order: { xs: 1, md: 2 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
              }}
            >
              IBE Goes to Cleveland!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontStyle: "italic",
              }}
            >
              3/5/25 - 3/7/25
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.7,
                color: theme.palette.text.primary,
              }}
            >
              IBE students recently took a trek to Cleveland, where we met with
              Deloitte, Sherwin-Williams, and Encore Venture Labs. The trip
              included a networking event with industry professionals and alumni,
              plus an exciting chance to see the Cavaliers secure a big win!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.7,
                color: theme.palette.text.primary,
              }}
            >
              Huge thank-you to IBE alum{" "}
              <Box
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Collin Aldrich
              </Box>{" "}
              at Deloitte!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import { SPONSORS } from "@/data/sponsors";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import SectionHead from "@/components/ui/SectionHead";

export default function Sponsors() {
  return (
    <Box component="section" aria-label="Program sponsors" sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead
          label="Partners"
          title="Program sponsors"
          lede="Industry partners who invest in the next generation of business and engineering leaders."
        />
        {/* 1px gaps over the divider colour draw the hairlines between cells. */}
        <Panel
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(6, 1fr)" },
            gap: "1px",
            backgroundColor: "divider",
          }}
        >
          {SPONSORS.map((sponsor) => (
            <Box
              key={sponsor.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "background.paper",
                minHeight: { xs: "5.5rem", md: "6.5rem" },
                px: 2.5,
                py: 2,
                "& img": {
                  filter: "grayscale(1)",
                  opacity: 0.7,
                  transition: "filter 0.3s cubic-bezier(0.25,1,0.5,1), opacity 0.3s cubic-bezier(0.25,1,0.5,1)",
                },
                "&:hover img": { filter: "none", opacity: 1 },
                // Invert after greyscale so logos drawn on white keep a
                // dark ground that disappears into the panel.
                ".dark & img": { filter: "grayscale(1) invert(1)", opacity: 0.7 },
                ".dark &:hover img": { filter: "grayscale(1) invert(1)", opacity: 1 },
              }}
            >
              <Image
                src={sponsor.logoUrl}
                alt={`${sponsor.name} logo`}
                width={150}
                height={80}
                style={{ maxWidth: "120px", maxHeight: "52px", width: "auto", height: "auto", objectFit: "contain" }}
              />
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.paper",
              minHeight: { xs: "5.5rem", md: "6.5rem" },
              px: 2.5,
              py: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Interested in sponsoring?{" "}
              <MuiLink
                href="mailto:cheng.2066@osu.edu"
                sx={{ color: "signal.main", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Partner with IBE
              </MuiLink>
            </Typography>
          </Box>
        </Panel>
      </Wrap>
    </Box>
  );
}

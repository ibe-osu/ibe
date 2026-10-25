"use client";

import { useCallback, useDeferredValue, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  FACETS,
  displayValue,
  emptyFilters,
  facetOptions,
  matchContext,
  matchesQuery,
  parseQuery,
  searchableText,
  similarAlumni,
  suggestions,
  type DirectoryAlum,
  type FacetKey,
  type Filters,
  type Suggestion,
} from "@/lib/alumni/directory";
import FilterPanel from "./FilterPanel";
import { AlumniCard, AlumniRow } from "./AlumniCard";
import AlumniProfileDialog from "./AlumniProfileDialog";
import { HEADER_HEIGHT, POPUP_PAPER_SX } from "@/theme/theme";

type View = "grid" | "list";
type Sort = "name" | "newest" | "oldest";

// `short` is what the closed select shows, so it fits beside Filters on a phone.
const SORTS: Record<Sort, { label: string; short: string; compare: (a: DirectoryAlum, b: DirectoryAlum) => number }> = {
  name: {
    label: "Last name, A–Z",
    short: "A–Z",
    compare: (a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName),
  },
  // Unknown class years sort last either way.
  newest: {
    label: "Class year, newest first",
    short: "Newest",
    compare: (a, b) => (b.classYear ?? 0) - (a.classYear ?? 0),
  },
  oldest: {
    label: "Class year, oldest first",
    short: "Oldest",
    compare: (a, b) => (a.classYear ?? 9999) - (b.classYear ?? 9999),
  },
};

/**
 * Search, filters, grid/list results and the profile dialog. Everything runs
 * over the rows the server page already fetched (about 200 people), so there
 * are no further requests. With no query and no filters the full list
 * renders on the server, so the directory reads without JavaScript.
 */
export default function AlumniDirectory({ alumni }: { alumni: DirectoryAlum[] }) {
  const [query, setQuery] = useState("");
  // The input updates on every keystroke; filtering 200 cards follows at
  // React's pace, which keeps typing smooth on phones.
  const deferredQuery = useDeferredValue(query);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("name");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const index = useMemo(
    () =>
      alumni.map((a) => ({
        alum: a,
        text: searchableText(a),
        values: Object.fromEntries(FACETS.map((f) => [f.key, f.values(a)])) as Record<FacetKey, string[]>,
      })),
    [alumni],
  );
  const options = useMemo(() => facetOptions(alumni), [alumni]);
  const parsed = useMemo(() => parseQuery(deferredQuery), [deferredQuery]);

  const results = useMemo(
    () =>
      index
        .filter(
          (entry) =>
            matchesQuery(entry.text, parsed) &&
            FACETS.every(
              (f) => !filters[f.key].length || entry.values[f.key].some((v) => filters[f.key].includes(v)),
            ),
        )
        .map((entry) => entry.alum)
        .sort(SORTS[sort].compare),
    [index, parsed, filters, sort],
  );

  const selected = alumni.find((a) => a.id === selectedId) ?? null;
  const similar = useMemo(() => (selected ? similarAlumni(selected, alumni) : []), [selected, alumni]);
  const suggestionList = useMemo(() => suggestions(options, query), [options, query]);

  const activeFilters = FACETS.flatMap((f) => filters[f.key].map((value) => ({ facet: f, value })));
  const setFacet = useCallback(
    (key: FacetKey, values: string[]) => setFilters((prev) => ({ ...prev, [key]: values })),
    [],
  );
  const addFilter = ({ facet, value }: Suggestion) =>
    setFilters((prev) => (prev[facet].includes(value) ? prev : { ...prev, [facet]: [...prev[facet], value] }));
  const clearAll = () => {
    setFilters(emptyFilters());
    setQuery("");
  };

  // Built only when the results, layout or deferred query change, so a
  // keystroke or an open dialog doesn't rebuild 200 cards.
  const list = useMemo(
    () =>
      results.map((a) => {
        const context = matchContext(a, parsed);
        return (
          <li key={a.id}>
            {view === "grid" ? (
              <AlumniCard alum={a} context={context} onOpen={setSelectedId} />
            ) : (
              <AlumniRow alum={a} context={context} onOpen={setSelectedId} />
            )}
          </li>
        );
      }),
    [results, parsed, view],
  );

  const panel = (idPrefix: string) => (
    <FilterPanel options={options} filters={filters} onChange={setFacet} idPrefix={idPrefix} />
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="overline"
          component="p"
          sx={{ color: "primary.main" }}
        >
          Members
        </Typography>
        <Typography variant="h3" component="h1">
          Alumni Database
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "62ch", mt: 1 }}>
          {alumni.length} IBE alumni and where they are now. Search by name,
          company, role, major, or club. Career details come from LinkedIn, so
          the newest moves may not be here yet.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "240px minmax(0, 1fr)" },
          columnGap: 5,
          alignItems: "start",
        }}
      >
        <Box
          component="aside"
          aria-label="Filters"
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            // 24px below the sticky header.
            top: HEADER_HEIGHT.md + 24,
            maxHeight: `calc(100vh - ${HEADER_HEIGHT.md + 48}px)`,
            overflowY: "auto",
            pr: 1,
            pb: 2,
          }}
        >
          {panel("sidebar-filter")}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Autocomplete
            freeSolo
            options={suggestionList}
            filterOptions={(x) => x}
            value={null}
            inputValue={query}
            onInputChange={(_e, value, reason) => {
              if (reason === "input" || reason === "clear") setQuery(value);
            }}
            onChange={(_e, option) => {
              if (option && typeof option !== "string") {
                addFilter(option);
                setQuery("");
              }
            }}
            getOptionLabel={(o) => (typeof o === "string" ? o : o.label)}
            slotProps={{ paper: { sx: POPUP_PAPER_SX } }}
            renderOption={({ key, ...props }, o) => (
              <li key={key} {...props}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" component="span" sx={{ display: "block", fontWeight: 600 }}>
                    {o.label}
                  </Typography>
                  <Typography variant="body2" component="span" sx={{ display: "block", color: "text.secondary" }}>
                    Filter by {o.facetLabel.toLowerCase()} · {o.count} {o.count === 1 ? "person" : "people"}
                  </Typography>
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search by name, company, role, major, or club"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { ...params.inputProps, "aria-label": "Search alumni" },
                }}
              />
            )}
          />

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mt: 2, alignItems: "center", flexWrap: "wrap", rowGap: 1.5 }}
          >
            <Typography variant="body2" role="status" aria-live="polite" sx={{ color: "text.secondary", mr: "auto", width: { xs: "100%", sm: "auto" } }}>
              {results.length === alumni.length
                ? `${alumni.length} people`
                : `${results.length} of ${alumni.length} people`}
              {parsed.expandedTo && ` · searching for “${parsed.expandedTo}”`}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<TuneIcon />}
              onClick={() => setFiltersOpen(true)}
              sx={{ display: { md: "none" }, py: 0.5, px: 1.5 }}
            >
              Filters{activeFilters.length > 0 && ` (${activeFilters.length})`}
            </Button>
            <TextField
              select
              size="small"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              slotProps={{
                htmlInput: { "aria-label": "Sort by" },
                select: {
                  renderValue: (v) => `Sort: ${SORTS[v as Sort].short}`,
                  MenuProps: { slotProps: { paper: { sx: POPUP_PAPER_SX } } },
                },
              }}
              // Phones: fills the gap between Filters and the layout toggle.
              sx={{ minWidth: { xs: 0, sm: 150 }, flex: { xs: 1, sm: "none" } }}
            >
              {(Object.keys(SORTS) as Sort[]).map((s) => (
                <MenuItem key={s} value={s}>
                  {SORTS[s].label}
                </MenuItem>
              ))}
            </TextField>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={view}
              onChange={(_e, next: View | null) => next && setView(next)}
              aria-label="Layout"
            >
              <ToggleButton value="grid" aria-label="Cards">
                <GridViewIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="list" aria-label="List">
                <ViewListIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {activeFilters.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, alignItems: "center" }}>
              {activeFilters.map(({ facet, value }) => (
                <Chip
                  key={`${facet.key}:${value}`}
                  label={displayValue(facet, value)}
                  title={facet.label}
                  onDelete={() => setFacet(facet.key, filters[facet.key].filter((v) => v !== value))}
                  color="primary"
                  variant="outlined"
                />
              ))}
              <Button variant="text" size="small" onClick={clearAll} sx={{ px: 1 }}>
                Clear all
              </Button>
            </Box>
          )}

          {results.length === 0 ? (
            <Box sx={{ mt: 4, p: { xs: 3, md: 4 }, bgcolor: "background.tint" }}>
              <Typography variant="h5" component="h2">
                No one matches that yet
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mt: 0.5, mb: 2 }}>
                Try fewer words, or remove a filter.
              </Typography>
              <Button onClick={clearAll}>Clear search and filters</Button>
            </Box>
          ) : (
            <Box
              component="ul"
              aria-label="Alumni"
              sx={{
                listStyle: "none",
                m: 0,
                mt: 2.5,
                p: 0,
                display: "grid",
                gap: view === "grid" ? 2 : 1,
                gridTemplateColumns:
                  view === "grid" ? "repeat(auto-fill, minmax(min(100%, 250px), 1fr))" : "minmax(0, 1fr)",
              }}
            >
              {list}
            </Box>
          )}
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        slotProps={{ paper: { elevation: 0, sx: { maxHeight: "85vh" } } }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 1,
          }}
        >
          <Typography variant="h5" component="h2">
            Filters
          </Typography>
          <Button size="small" onClick={() => setFiltersOpen(false)}>
            Show {results.length}
          </Button>
        </Stack>
        <Box sx={{ px: 2.5, py: 2.5, overflowY: "auto" }}>{panel("sheet-filter")}</Box>
      </Drawer>

      <AlumniProfileDialog
        alum={selected}
        similar={similar}
        onClose={() => setSelectedId(null)}
        onOpen={setSelectedId}
      />
    </Container>
  );
}

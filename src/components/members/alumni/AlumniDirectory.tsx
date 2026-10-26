"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
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
import { HEADER_HEIGHT } from "@/theme/theme";

type View = "grid" | "list";
type Sort = "name" | "newest" | "oldest";

// Cards rendered at first and per scroll step. Rendering all ~200 at once
// made the server send ~1 MB of HTML and the browser hydrate every card
// before anything was clickable; search and the count still cover everyone.
const STEP = 30;

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
 * are no further requests. The first STEP cards render on the server, so the
 * directory reads without JavaScript; the rest load as you scroll.
 */
interface AlumniDirectoryProps {
  alumni: DirectoryAlum[];
  /** Formatted date the data was last loaded; null for an empty directory. */
  lastUpdated: string | null;
}

export default function AlumniDirectory({ alumni, lastUpdated }: AlumniDirectoryProps) {
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

  // How many results are on screen, tied to the results it was counted for, so
  // new results start back at STEP in the same render (no flash of every card).
  const [page, setPage] = useState({ results, count: STEP });
  const shown = page.results === results ? page.count : STEP;
  const more = useCallback(() => setPage({ results, count: shown + STEP }), [results, shown]);
  // More cards load as the sentinel below the list nears the viewport. The
  // observer is rebuilt per step, which is what makes it fire again while the
  // sentinel is still in view after a load.
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && more(), { rootMargin: "800px" });
    io.observe(el);
    return () => io.disconnect();
  }, [more]);

  // Why each result matched, worked out once per search rather than per step.
  const contexts = useMemo(() => new Map(results.map((a) => [a.id, matchContext(a, parsed)])), [results, parsed]);

  // Built only when the results, layout or step change, so a keystroke or an
  // open dialog doesn't rebuild the cards.
  const list = useMemo(
    () =>
      results.slice(0, shown).map((a) => {
        const context = contexts.get(a.id) ?? null;
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
    [results, shown, contexts, view],
  );

  const panel = (idPrefix: string) => (
    <FilterPanel options={options} filters={filters} onChange={setFacet} idPrefix={idPrefix} />
  );

  return (
    // xl, not lg: three cards wide enough to keep a name and its badge on one line.
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 5 } }}>
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
          company, role, major, or club.
        </Typography>
        {lastUpdated && (
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Last updated {lastUpdated}
          </Typography>
        )}
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
                select: { renderValue: (v) => `Sort: ${SORTS[v as Sort].short}` },
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
                  view === "grid" ? "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" : "minmax(0, 1fr)",
              }}
            >
              {list}
            </Box>
          )}
          {shown < results.length && (
            <Box ref={sentinel} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="outlined" onClick={more}>
                Show more ({results.length - shown} left)
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        slotProps={{ paper: { sx: { maxHeight: "85vh" } } }}
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

"use client";

import { memo, useMemo } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  FACETS,
  displayValue,
  type FacetKey,
  type FacetOption,
  type Filters,
} from "@/lib/alumni/directory";
import { POPUP_PAPER_SX } from "@/theme/theme";

interface FilterPanelProps {
  options: Record<FacetKey, FacetOption[]>;
  filters: Filters;
  onChange: (key: FacetKey, values: string[]) => void;
  /** The sidebar and the bottom sheet both render a panel; ids must differ. */
  idPrefix: string;
}

/**
 * Every filter, stacked. The desktop sidebar and the mobile bottom sheet
 * render this same panel. Selected values show as chips above the results,
 * not inside the inputs, so there is one place to see and remove them.
 */
// Memoized so typing in the search box doesn't re-render the panel.
export default memo(function FilterPanel({ options, filters, onChange, idPrefix }: FilterPanelProps) {
  const counts = useMemo(
    () =>
      Object.fromEntries(
        FACETS.map((f) => [f.key, new Map(options[f.key].map((o) => [o.value, o.count]))]),
      ) as Record<FacetKey, Map<string, number>>,
    [options],
  );

  return (
    <Stack spacing={3}>
      {FACETS.map((facet) => {
        const selected = filters[facet.key];
        const id = `${idPrefix}-${facet.key}`;

        if (facet.control === "checkbox") {
          return (
            <Box key={facet.key} component="fieldset" sx={{ border: 0, m: 0, p: 0 }}>
              <Typography component="legend" variant="overline" sx={labelSx}>
                {facet.label}
              </Typography>
              <FormGroup>
                {options[facet.key].map(({ value, count }) => (
                  <FormControlLabel
                    key={value}
                    sx={{ mr: 0, "& .MuiFormControlLabel-label": { fontSize: "0.9375rem" } }}
                    control={
                      <Checkbox
                        size="small"
                        checked={selected.includes(value)}
                        onChange={(e) =>
                          onChange(
                            facet.key,
                            e.target.checked
                              ? [...selected, value]
                              : selected.filter((v) => v !== value),
                          )
                        }
                      />
                    }
                    label={
                      <>
                        {displayValue(facet, value)}{" "}
                        <Box component="span" sx={{ color: "text.secondary" }}>
                          ({count})
                        </Box>
                      </>
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          );
        }

        return (
          <Box key={facet.key}>
            <Typography component="label" htmlFor={id} variant="overline" sx={labelSx}>
              {facet.label}
            </Typography>
            <Autocomplete
              id={id}
              multiple
              size="small"
              disableCloseOnSelect
              options={options[facet.key].map((o) => o.value)}
              value={selected}
              onChange={(_e, values) => onChange(facet.key, values)}
              getOptionLabel={(v) => displayValue(facet, v)}
              renderValue={() => null}
              // The selected values aren't shown in the field, so Backspace
              // in an empty field must not quietly remove one.
              onKeyDown={(e) => {
                if (e.key === "Backspace") e.defaultMuiPrevented = true;
              }}
              slotProps={{ paper: { sx: POPUP_PAPER_SX } }}
              renderOption={({ key, ...props }, value, { selected: isSelected }) => {
                const count = counts[facet.key].get(value);
                return (
                  <li key={key} {...props}>
                    <Checkbox size="small" checked={isSelected} sx={{ ml: -1, mr: 0.5, p: 0.5 }} />
                    <Box component="span" sx={{ flex: 1, minWidth: 0 }}>
                      {displayValue(facet, value)}
                    </Box>
                    <Box component="span" sx={{ color: "text.secondary", ml: 1 }}>
                      {count}
                    </Box>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={selected.length ? `${selected.length} selected` : "Any"}
                />
              )}
            />
          </Box>
        );
      })}
    </Stack>
  );
});

const labelSx = { display: "block", mb: 0.75, color: "text.primary" } as const;

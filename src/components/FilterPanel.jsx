import React, { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import _debounce from "lodash/debounce"

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material"
import { tokens } from "../theme"

import RestartAltIcon from "@mui/icons-material/RestartAlt"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha"
import SortIcon from "@mui/icons-material/Sort"

import { SearchInput } from "./SearchInput"

import { getFilteredRecords } from "../store/actions/records.actions"

const filters = [
  {
    value: "name",
    label: "Orden Alfabético",
    defaultOption: "asc",
    icon: <SortByAlphaIcon />,
    sortable: true,
  },
  {
    value: "order",
    label: "Número de Expediente",
    defaultOption: "asc",
    icon: <FormatListNumberedRtlIcon />,
    sortable: true,
  },
  {
    value: "favorite",
    label: "Destacado",
    defaultOption: "desc",
    icon: <PriorityHighIcon />,
    sortable: true,
  },
  {
    value: "updatedAt",
    label: "Actualizado",
    defaultOption: "asc",
    icon: <SortIcon />,
    sortable: true,
  },
  {
    value: "priority",
    label: "",
    defaultOption: "",
    icon: <SortIcon />,
    sortable: false,
  },
  {
    value: "tracing",
    label: "",
    defaultOption: "",
    icon: <SortIcon />,
    sortable: false,
  },
]

export const FilterPanel = () => {
  // THEME UTILS
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState(null)

  const clearSearchParams = () => {
    Array.from(searchParams)
      .filter((param) => param[0] !== "search")
      .map((e) => searchParams.delete(e[0]))
    setSelectedFilter(null)
    setSearchParams(searchParams)
  }

  const handleDeleteFilter = (value) => {
    if (value === "priority") {
      searchParams.delete("priority")
    }
    if (value === "tracing") {
      searchParams.delete("tracing")
    }
    setSelectedFilter(null)
    setSearchParams(searchParams)
  }

  const handleSortBy = (value, option) => {
    const optionsSortBy = ["desc", "asc"]

    if (JSON.stringify(selectedFilter) === JSON.stringify([value, option])) {
      optionsSortBy.filter((e) => {
        e !== selectedFilter[1] && setSelectedFilter([value, e])
      })
      return
    }

    setSelectedFilter([value, option])

    filters
      .filter((filter) => filter.sortable && filter.value !== selectedFilter)
      .forEach((filter) => searchParams.delete(filter.value))
  }

  const doSearch = (value) => {
    if (!value) {
      dispatch(getFilteredRecords({}))
      return
    }
    dispatch(getFilteredRecords(`?search=${value}`))
  }

  const handleDebouncedSearch = useCallback(_debounce(doSearch, 300), [])

  useEffect(() => {
    if (searchParams.has("tracing") || searchParams.has("priority")) {
      setSelectedFilter(...searchParams)
    }
  }, [searchParams])

  useEffect(() => {
    if (!!selectedFilter) {
      searchParams.set(...selectedFilter)
      setSearchParams(searchParams)
      dispatch(getFilteredRecords(`?${searchParams.toString()}`))
      return
    }
    // dispatch(getFilteredRecords({}))
  }, [selectedFilter])

  return (
    <Box display="grid" gap={1} width="100%" sx={{ p: 1 }}>
      <SearchInput onChange={handleDebouncedSearch} />
      <ButtonGroup
        disableElevation
        fullWidth
        variant="outlined"
        aria-label="Filter panel buttons"
      >
        {filters
          .filter((filter) => filter.sortable)
          .map(({ value, label, icon, defaultOption }, index) => (
            <Tooltip
              key={index}
              placement="top"
              disableRipple
              title={<Box component={Typography}>{label}</Box>}
              sx={{ bgcolor: "transparent" }}
            >
              <Button
                size="small"
                color={searchParams.has(value) ? "secondary" : "neutral"}
                onClick={() => handleSortBy(value, defaultOption)}
              >
                {icon}
              </Button>
            </Tooltip>
          ))}
        <Tooltip
          placement="top"
          disableRipple
          title={<Box component={Typography}>limpiar filtros</Box>}
          sx={{ bgcolor: "transparent" }}
        >
          <Button
            onClick={clearSearchParams}
            color={
              Array.from(searchParams).filter((param) => param[0] !== "search")
                .length > 0 && searchParams.keys().next().value
                ? "info"
                : "neutral"
            }
            size="small"
          >
            <RestartAltIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={3}
        sx={{ width: "100%" }}
      >
        {filters
          .filter((filter) => !filter.sortable)
          .map(({ value }, index) =>
            searchParams.has(value) ? (
              <Chip
                key={index}
                size="small"
                label={searchParams.get(value).replaceAll("_", " ")}
                onDelete={() => handleDeleteFilter(value)}
                sx={{
                  width: "min-content",
                  justifyContent: "space-between",
                  bgcolor:
                    value === "priority"
                      ? colors.priorityColors[searchParams.get(value)]
                      : colors.tracingColors[searchParams.get(value)],
                }}
              />
            ) : undefined
          )}
      </Stack>
    </Box>
  )
}

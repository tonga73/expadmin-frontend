import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"

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
    label: "Actualizado",
    defaultOption: "asc",
    icon: <SortIcon />,
    sortable: false,
  },
  {
    value: "tracing",
    label: "Actualizado",
    defaultOption: "asc",
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
      .filter((e) => e.sortable && e.value !== selectedFilter)
      .forEach((e) => searchParams.delete(e.value))
  }

  console.log(selectedFilter)
  useEffect(() => {
    if (searchParams.keys().next().value === "search") {
      dispatch(getFilteredRecords(`?${searchParams.toString()}`))
    }
    if (!!selectedFilter) {
      searchParams.set(...selectedFilter)
      setSearchParams(searchParams)
      dispatch(getFilteredRecords(`?${searchParams.toString()}`))
      return
    } else if (
      !!searchParams.keys().next().value &&
      searchParams.keys().next().value !== "search"
    ) {
      setSelectedFilter(searchParams.entries().next().value)
      return
    }
    dispatch(getFilteredRecords({}))
  }, [searchParams, setSearchParams, selectedFilter, dispatch])

  return (
    <Box display="grid" gap={1} width="100%" sx={{ p: 1 }}>
      <SearchInput clearSearch={clearSearchParams} />
      <ButtonGroup
        disableElevation
        fullWidth
        variant="outlined"
        aria-label="Filter panel buttons"
      >
        {filters
          .filter((e) => e.sortable)
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
          .filter((e) => !e.sortable)
          .map(({ value }, index) =>
            searchParams.has(value) ? (
              <Chip
                key={index}
                size="small"
                label={searchParams.get(value).replaceAll("_", " ")}
                onDelete={() => {
                  if (value === "priority") {
                    searchParams.delete("priority")
                  }
                  if (value === "tracing") {
                    searchParams.delete("tracing")
                  }
                  setSelectedFilter(null)
                  setSearchParams(searchParams)
                }}
                sx={{
                  width: "min-content",
                  justifyContent: "space-between",
                  bgcolor:
                    value === "priority"
                      ? colors.priorityColors[
                          searchParams.get(value).replaceAll("_", " ")
                        ]
                      : colors.tracingColors[
                          searchParams.get(value).replaceAll("_", " ")
                        ],
                }}
              />
            ) : undefined
          )}
      </Stack>
    </Box>
  )
}

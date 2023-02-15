import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"

import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import CleaningServicesIcon from "@mui/icons-material/CleaningServices"
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha"
import SortIcon from "@mui/icons-material/Sort"

import { getFilteredRecords } from "../store/actions/records.actions"

const filters = [
  {
    value: "name",
    label: "Nombre de Expediente",
    defaultOption: "asc",
    icon: <SortByAlphaIcon />,
  },
  {
    value: "order",
    label: "Número de Expediente",
    defaultOption: "asc",
    icon: <FormatListNumberedRtlIcon />,
  },
  {
    value: "favorite",
    label: "Destacado",
    defaultOption: "desc",
    icon: <PriorityHighIcon />,
  },
  {
    value: "updatedAt",
    label: "Actualizado",
    defaultOption: "desc",
    icon: <SortIcon />,
  },
]

export const FilterPanel = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState(null)

  searchParams.forEach((key) => {
    searchParams.delete([key])
  })

  const clearSearchParams = () => {
    const { value } = searchParams.keys().next()

    searchParams.delete(value)
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
      .filter((e) => e.value !== selectedFilter)
      .forEach((e) => searchParams.delete(e.value))
  }

  useEffect(() => {
    if (!!selectedFilter) {
      searchParams.set(...selectedFilter)
      setSearchParams(searchParams)
      dispatch(getFilteredRecords(`?${searchParams.toString()}`))
      return
    } else if (!!searchParams.keys().next().value) {
      setSelectedFilter(searchParams.entries().next().value)
      return
    }
    dispatch(getFilteredRecords({}))
  }, [searchParams, setSearchParams, selectedFilter, dispatch])

  return (
    <ButtonGroup
      disableElevation
      fullWidth
      variant="outlined"
      aria-label="Filter panel buttons"
      sx={{ p: 1 }}
    >
      {filters.map(({ value, label, icon, defaultOption }, index) => (
        <Tooltip
          key={index}
          placement="top"
          disableRipple
          title={
            <Box component={Typography} p={0.3}>
              {label}
            </Box>
          }
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
        title={
          <Box component={Typography} p={0.3}>
            Limpiar filtros
          </Box>
        }
        sx={{ bgcolor: "transparent" }}
      >
        <Button onClick={clearSearchParams} color="info" size="small">
          <CleaningServicesIcon />
        </Button>
      </Tooltip>
    </ButtonGroup>
  )
}

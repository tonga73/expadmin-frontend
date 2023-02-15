import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "react-router-dom"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import { useTheme } from "@mui/material"
import { tokens } from "../theme"

export const SearchInput = () => {
  // THEME UTILS
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState("")

  const handleSearch = useCallback(
    (event) => {
      setSearch(event.target.value)
    },
    [setSearch]
  )

  const escFunction = useCallback(
    (event) => {
      if (event.type === "click") {
        handleSearch({ target: { value: "" } })
        searchParams.delete("search")
        setSearchParams(searchParams)
      }
      if (event.key === "Escape") {
        handleSearch({ target: { value: "" } })
        searchParams.delete("search")
        setSearchParams(searchParams)
      }
    },
    [handleSearch]
  )

  useEffect(() => {
    if (searchParams.has("search")) {
      document
        .getElementById("searchbar")
        .addEventListener("keydown", escFunction, false)
    }
  }, [escFunction, searchParams.has("search")])

  useEffect(() => {
    if (!!search) {
      searchParams.set("search", search)
      setSearchParams(searchParams)
    }
  }, [search])

  return (
    <InputBase
      id="searchbar"
      fullWidth
      placeholder="Buscar"
      value={search}
      endAdornment={
        search.length > 0 ? (
          <Box
            component={Button}
            size="small"
            sx={{
              mr: 1,
              bgcolor:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.grey[700],
              color: colors.grey[400],
              cursor: "pointer",
              border: `solid 1px ${colors.primary[100]}`,
              "&:hover": {
                color: colors.grey[300],
              },
            }}
            onClick={escFunction}
          >
            Esc
          </Box>
        ) : undefined
      }
      sx={{
        px: 1,
        fontSize: "19px",
        bgcolor:
          theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.grey[700],
      }}
      onChange={handleSearch}
    />
  )
}

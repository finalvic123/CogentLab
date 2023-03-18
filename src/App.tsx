import React from 'react'
import {
  BrowserRouter, Routes, Route, Navigate
} from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { lightTheme } from './styles'

import { HomePage } from './pages'

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
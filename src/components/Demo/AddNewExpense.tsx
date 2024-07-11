import { TextField } from '@mui/material'
import React from 'react'

function AddNewExpense() {
  return (
    <>
    <div>
    <TextField
            autoFocus
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            id="qyt"
            name="qyt"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Bill amount"
            type="number"
            fullWidth
            variant="standard"
          />
    </div>
    </>
  )
}

export default AddNewExpense
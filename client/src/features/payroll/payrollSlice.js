import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import payRollService from './payRollService'

const initialState = {
  payrolls: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const createPayRoll = createAsyncThunk('payroll/create', async (payRollData, thunkAPI) => {
  try {
    return await payRollService.createPayRoll(payRollData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// Get user goals
export const getPayRolls = createAsyncThunk('payrolls/AllPayRolls', async (_, thunkAPI) => {
  try {
    return await payRollService.getPayRolls()
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

export const deletePayRoll = createAsyncThunk('payrolls/delete', async (id, thunkAPI) => {
  try {
    return await payRollService.deletePayRoll(id)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

export const updatePayRoll = createAsyncThunk('payrolls/update', async ({ id, updatedPayRollData }, thunkAPI) => {
  try {
    console.log("in slice", typeof updatedPayRollData)
    console.log('in slice', id)
    return await payRollService.updatePayRoll(id, updatedPayRollData);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);
export const updatePayrollfromUser = createAsyncThunk('payrolls/updatefromUser/', async ({ empID, updatedPayRollData }, thunkAPI) => {
  try {
    console.log("in slice", typeof updatedPayRollData)
    console.log('in slice', empID)
    return await payRollService.updatePayRollfromUser(empID, updatedPayRollData);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);

export const payRollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayRoll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPayRoll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.payrolls.push(action.payload)
      })
      .addCase(createPayRoll.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPayRolls.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPayRolls.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.payrolls = action.payload
      })
      .addCase(getPayRolls.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePayRoll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePayRoll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.payrolls = state.payrolls.filter(
          (payroll) => payroll._id !== action.payload.id
        )
      })
      .addCase(deletePayRoll.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePayRoll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePayRoll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(state.payrolls[0]._id);
        console.log(action.payload._id);
        console.log(action.payload.Name);

        console.log('Updated payroll object:', action.payload);
        const index = state.payrolls.findIndex(p => p._id === action.payload._id)
        if (index !== -1) {
          state.payrolls[index] = action.payload
        }
      })
      .addCase(updatePayRoll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePayrollfromUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(state.payrolls[0]._id);
        console.log(action.payload._id);
        console.log(action.payload.Name);

        console.log('Updated payroll object:', action.payload);
        const index = state.payrolls.findIndex(p => p._id === action.payload._id)
        if (index !== -1) {
          state.payrolls[index] = action.payload
        }
      })
  },
})

export const { reset } = payRollSlice.actions
export default payRollSlice.reducer
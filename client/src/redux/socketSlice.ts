import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const { io, Socket } = require('socket.io-client');

interface SocketState {
  io: typeof Socket;
}

const initialState = { io: null } as SocketState;

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connect(state) {
      state.io = io();
    },
    emit(state, action: PayloadAction<string>) {
      state.io.emit(action.payload);
    },
  },
});

export const { connect, emit } = socketSlice.actions;
export default socketSlice.reducer;

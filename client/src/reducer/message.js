import { createSlice } from '@reduxjs/toolkit';

export const MessageBox = createSlice({
  name: 'msg',
  initialState: {
    show: false,
    typeMessage: '',
    textMessage: ''
  },
  reducers: {
    showMessageInfo: (state, action) => {
      return {
        ...state,
        show: true,
        typeMessage: 'info',
        textMessage: action.payload
      }
    },
    showMessageError: (state, action) => {
      return {
        ...state,
        show: true,
        typeMessage: 'error',
        textMessage: action.payload
      }
    },
    hideMessage: (state) => {
      return {
        ...state,
        show: false,
        typeMessage: 'empty',
        textMessage: ''
      }
    },
  },
})

export const { showMessageInfo, showMessageError, hideMessage } = MessageBox.actions

export default MessageBox.reducer


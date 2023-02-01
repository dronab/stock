import { configureStore } from '@reduxjs/toolkit';

import MessageBox from './reducer/message';

export default configureStore({
  reducer: {
    msg: MessageBox
  }
});

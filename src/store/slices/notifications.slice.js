import { createSlice } from "@reduxjs/toolkit";

export const MARK_NOTIFICATION_AS_SEEN = "MARK_NOTIFICATION_AS_SEEN";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    markNotificationAsSeen: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.seen = true;
      }
    },
  },
});

export const { addNotification, markNotificationAsSeen } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

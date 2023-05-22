/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginParameters from '../api/queryParams/loginParameters';
import routes from '../api/routes';
import axiosInstance from '../api/axiosInstance';

const ACCESS_TOKEN_KEY = 'accessToken';
const EXPIRED_AT_KEY = 'expiredAt';

function calculateExpiredAtTimestamp(expiresInSeconds) {
  const ms = expiresInSeconds * 1000;
  const expiredAtTimestamp = new Date().valueOf() + ms;
  return expiredAtTimestamp;
}

function checkIfTokenIsValid(accessToken, expiredAt) {
  if (!accessToken || !expiredAt) return false;
  const now = Date.now();
  return now < expiredAt;
}

export const getAccessToken = createAsyncThunk(
  'accessTokens/getToken',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const accessToken = state.accessTokens.accessToken || localStorage.getItem(ACCESS_TOKEN_KEY);
    const expiredAt = state.accessTokens.expiredAt || Number(localStorage.getItem(EXPIRED_AT_KEY));

    const isTokenValid = checkIfTokenIsValid(accessToken, expiredAt);

    if (isTokenValid) {
      return { expiredAt, accessToken };
    }

    // eslint-disable-next-line max-len

    const response = await axiosInstance.get(routes.loginPath(), { params: { ...loginParameters } });

    const { data } = response;
    const { access_token, expires_in } = data;

    // eslint-disable-next-line max-len
    const payload = { expiredAt: calculateExpiredAtTimestamp(expires_in), accessToken: access_token };

    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(EXPIRED_AT_KEY, payload.expiredAt);
    return payload;
  },
);

const accessTokenSlice = createSlice({
  name: 'accessTokens',
  initialState: {
    accessToken: null, expiredAt: null, loadingStatus: 'idle', error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccessToken.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.expiredAt = action.payload.expiredAt;

        state.loadingStatus = 'succeed';
        state.error = null;
      })
      .addCase(getAccessToken.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default accessTokenSlice.reducer;

import  query  from '../api/loginParameters'
import routes from '../api/routes'
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const ACCESS_TOKEN_KEY = 'accessToken';
const EXPIRED_AT_KEY = 'expiredAt';

const accessTokenAdapter = createEntityAdapter();

function calculateExpiredAtTimestamp(expiresInSeconds) {
  const ms = expiresInSeconds * 1000;
  const expiredAtTimestamp = new Date().valueOf() + ms;
  return expiredAtTimestamp;
};

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

    console.log('isTokenValid', isTokenValid);

    if (isTokenValid) {
      return { expiredAt, accessToken }
    }

    const url = new URL(routes.loginPath());
    query.forEach((searchParameter) => {
      url.searchParams.append(searchParameter.key, searchParameter.value)
    })
    const headerData = {
      headers:{
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp'
      }
    }
    const response = await axios.get(url.toString(), headerData)
    
    console.log(`${url.toString()} response`, JSON.stringify(response.data, null, 2));

    const { access_token, expires_in } = response.data;

    const payload = { expiredAt: calculateExpiredAtTimestamp(expires_in), accessToken: access_token }

    localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
    localStorage.setItem(EXPIRED_AT_KEY, payload.expiredAt);
    
    return payload;
  },
);

const accessTokenSlice = createSlice({
  name: 'accessTokens',
  initialState: accessTokenAdapter.getInitialState({ accessToken: null, expiredAt: null, loadingStatus: 'idle', error: null }),
  extraReducers: (builder) => {
    builder
      .addCase(getAccessToken.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        console.log('fulfilled payload', action.payload);
        
        state.accessToken = action.accessToken;
        state.expiredAt = action.expiredAt;

        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getAccessToken.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
})

export default accessTokenSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import kioskService from 'src/services/kioskService';

import { PressReleaseModel } from 'src/models/pressReleaseModel';
import {
  DeliverableModel,
  PublicationsDownloadedModel,
} from 'src/models/publicationModel';

import { RootState } from '../store';

interface initialStateType {
  favorites: PressReleaseModel[];
  latestPressRelease: DeliverableModel[];
  publicationsDownloaded: PublicationsDownloadedModel[];
}

const initialState: initialStateType = {
  favorites: [],
  latestPressRelease: [],
  publicationsDownloaded: [],
};

export const getFavorites = createAsyncThunk(
  'deliverablesSlice/favorites',
  async (_, { dispatch, getState }) => {
    try {
      const user = (getState() as RootState).userStore.user;

      const response = await kioskService.getFavorites(user?.id);

      dispatch(setFavorites(response?.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const getLatestPressRelease = createAsyncThunk(
  'deliverablesSlice/getLatestPressRelease',
  async (_, { dispatch, getState }) => {
    try {
      const user = (getState() as RootState).userStore.user;

      const response = await kioskService.getLatestPressReleases(user?.id);

      dispatch(setLatestPressRelease(response?.data));
    } catch (err) {
      console.log(err);
    }
  },
);

export const getPublicationByDeliverableId = createAsyncThunk(
  'deliverablesSlice/getPublicationByDeliverableId',
  async (
    { deliverableid }: { deliverableid: number },
    { dispatch, getState },
  ) => {
    try {
      const user = (getState() as RootState).userStore.user;

      const response = await kioskService.getPublicationByDeliverableId(
        user.id,
        deliverableid,
      );

      dispatch(
        setPublicationsDownloaded({
          deliverableid,
          deliverableModel: response?.data,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  },
);

const deliverablesSlice = createSlice({
  name: 'deliverablesSlice',
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setLatestPressRelease(state, action) {
      state.latestPressRelease = action.payload;
    },
    setPublicationsDownloaded(state, action) {
      const deliverableid = action.payload.deliverableid;

      const publicationExistIndex = state.publicationsDownloaded.findIndex(
        (item) => item.deliverableid === deliverableid,
      );

      if (publicationExistIndex === -1) {
        state.publicationsDownloaded = [
          ...state.publicationsDownloaded,
          action.payload,
        ];
      } else {
        state.publicationsDownloaded[publicationExistIndex] = action.payload;
      }
    },
  },
});

const { reducer, actions } = deliverablesSlice;

export const {
  setFavorites,
  setLatestPressRelease,
  setPublicationsDownloaded,
} = actions;
export default reducer;

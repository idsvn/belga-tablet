import { createSlice } from '@reduxjs/toolkit';

import { DeliverableModel } from 'src/models/publicationModel';

export interface DownloadedPublicationModel {
  deliverableModel: DeliverableModel;
  publication: DeliverableModel[];
}

interface initialStateType {
  downloadedPublications: DownloadedPublicationModel[];
}

const initialState: initialStateType = {
  downloadedPublications: [],
};

const downloadSlice = createSlice({
  name: 'downloadStore',
  initialState,
  reducers: {
    addPublication: (state, action) => {
      state.downloadedPublications.push(action.payload);
    },
    removePublication: (state, action) => {
      const deliverableId = action.payload;

      state.downloadedPublications = state.downloadedPublications.filter(
        (item) => item.deliverableModel.id !== deliverableId,
      );
    },
  },
});

const { reducer, actions } = downloadSlice;

export const { addPublication, removePublication } = actions;
export default reducer;

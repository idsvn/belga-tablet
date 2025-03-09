import { createSlice } from '@reduxjs/toolkit';

import { DeliverableModel } from 'src/models/publicationModel';

export const getDeliverableId = (deliverable?: DeliverableModel) => {
  return deliverable?.id || deliverable?.deliverableId || 0;
};

export interface DownloadedPublicationModel {
  deliverableModel: DeliverableModel;
  publication: DeliverableModel[];
}

interface initialStateType {
  downloadedPublications: DownloadedPublicationModel[];
  newsletterDetails: DeliverableModel[];
}

const initialState: initialStateType = {
  downloadedPublications: [],
  newsletterDetails: [],
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
        (item) => getDeliverableId(item.deliverableModel) !== deliverableId,
      );
    },
    addNewsPaperDetail: (state, action) => {
      state.newsletterDetails.push(action.payload);
    },
    removeNewsPaperDetail: (state, action) => {
      const uuid = action.payload;

      state.newsletterDetails = state.newsletterDetails.filter(
        (item) => item.uuid !== uuid,
      );
    },
  },
});

const { reducer, actions } = downloadSlice;

export const {
  addPublication,
  removePublication,
  addNewsPaperDetail,
  removeNewsPaperDetail,
} = actions;
export default reducer;

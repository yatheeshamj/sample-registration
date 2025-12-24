


export const isFetching = (state) => state.photoId.isFetching;

export const isStatusLoading = (state) => state.photoId.isSingleStatusLoading;

export const statusPullCount = (state) => state.photoId.statusPullCount;

export const error = (state) => state.photoId.error;

export const getInitResponse = state => state.photoId.data.initResponse;

export const getMaxAttempts = state => state.photoId.maxAttempts;

export const getNumberOfAttempts = state => state.photoId.numberOfAttempts;

export const getStatusData = state => state.photoId.data;

export const continuePulling = state => state.photoId.continuePulling;

export const getMeida = state => state.photoId.media;

export const getHasClickedUrl = state => state.photoId.hasClickedOnUrl;

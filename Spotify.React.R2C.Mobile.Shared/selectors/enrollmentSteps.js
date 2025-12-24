

export const isFetching = (state) => state.enrollmentSteps.isFetching;


export const getData = (state) => state.enrollmentSteps.data.sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1);

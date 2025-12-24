
export const getData = state => state.agreementTemplates.data.sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1);

export const getSigning = state => state.agreementTemplates.signing;

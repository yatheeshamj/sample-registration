export default {
  getCurrentSubstep: (substeps) => {
    return substeps.find((substep) => {
      // Returns which of the child Steps is Available or In Progress.
      // Verify Identity
      // Business Info
      // Sign Agreements
      return substep.available === true || substep.inProgress === true;
    });
  },
  getAgentRegion: (agentCountryId, countries) => {
    const country = countries.find(item => item.id === agentCountryId);
    return country && country.code;
  }
};

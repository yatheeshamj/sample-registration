export const STEP_DESCRIPTIONS = {
  'register-individual': {
    US: {
      step_descriptions: [
        'verifyIdentity',
        'registerSoleProprietorship',
        'signDocuments',
        'finalizeRegistration'
      ]
    },
    JM: {
      step_descriptions: [
        'verifyIdentity',
        'registerSoleProprietorship',
        'signDocuments',
        'finalizeRegistration'
      ]
    },
    IN: {
      step_descriptions: [
        'verifyIdentity',
        'registerSoleProprietorship',
        'signDocuments',
      ]
    }
  },

  'register-business': {
    US: {
      step_descriptions: [
        'verifyIdentity',
        'businessInfo',
        'signDocuments',
        'finalizeRegistration'
      ]
    },
    GB: {
      step_descriptions: [
        'businessInfo',
        'signDocuments',
        'pendingReview'
      ]
    },
    CA: {
      step_descriptions: [
        'businessInfo',
        'signDocuments',
        'finalizeRegistration'
      ]
    },
    JM: {
      step_descriptions: [
        'verifyIdentity',
        'businessInfo',
        'signDocuments',
        'finalizeRegistration'
      ]
    },
    IN: {
      step_descriptions: [
        'verifyIdentity',
        'businessInfo',
        'signDocuments',
      ]
    }
  },

  'join-business': {
    US: {
      step_descriptions: [
        'verifyIdentity',
        // 'Enter the FEIN or IB ID then click the magnifying glass and confirm the IB name matches the IB you have selected.' +
        'searchByID',
        // 'Your request will be forwarded to the service partner company for confirmation. You will receive the notification once the service partner company has accepted your request, at which time you will be required to sign an agreement with the service partner company.',
        'signDocuments',
        'pendingFinalization'
      ]
    },
    GB: {
      step_descriptions: [
        'searchByID',
        // 'Enter the IB ID then click the magnifying glass and confirm the IB name matches the IB you have selected.' +
        // 'Your request will be forwarded to the service partner company for confirmation. You will receive the notification once the service partner company has accepted your request, at which time you will be required to sign an agreement with the service partner company.',
        // 'Sign the Non-Disclosure Agreement and Waiver.',
        'signDocuments',
        'pendingFinalization'
      ]
    },
    CA: {
      step_descriptions: [
        'searchByID',
        // 'Enter the FEIN or IB ID then click the magnifying glass and confirm the IB name matches the IB you have selected.' +
        // 'Your request will be forwarded to the service partner company for confirmation. You will receive the notification once the service partner company has accepted your request, at which time you will be required to sign an agreement with the service partner company.',
        // 'Sign the Non-Disclosure Agreement and Waiver.',
        'signDocuments',
        'pendingFinalization'
      ]
    },
    JM: {
      step_descriptions: [
        'verifyIdentity',
        // 'Enter the FEIN or IB ID then click the magnifying glass and confirm the IB name matches the IB you have selected.' +
        'searchByID',
        // 'Your request will be forwarded to the service partner company for confirmation. You will receive the notification once the service partner company has accepted your request, at which time you will be required to sign an agreement with the service partner company.',
        'signDocuments',
        'pendingFinalization'
      ]
    },
    IN: {
      step_descriptions: [
        'verifyIdentity',
        // 'Enter the FEIN or IB ID then click the magnifying glass and confirm the IB name matches the IB you have selected.' +
        'searchByID',
        // 'Your request will be forwarded to the service partner company for confirmation. You will receive the notification once the service partner company has accepted your request, at which time you will be required to sign an agreement with the service partner company.',
        'signDocuments',
        'pendingFinalization'
      ]
    },
  },

  validate: {
    step_descriptions: [
      'validateMobilenumber',
      'ValidateEmailaddress'
    ]
  }
};

export const MOBILE_VALIDATION_CODE_TYPE = 506920001;
export const EMAIL_VALIDATION_CODE_TYPE = 506920000;
export const GOOGLE_MAPS_BASE_URL = "https://www.googleapis.com";
export const USER_ID = "ID";

export const COUNTRY_IDS = {
  US: '06f90dc0-69ff-e011-961b-0ee1388ccc3a',
  CA: 'e8c93b0a-2207-e111-961b-0ee1388ccc3a',
  UK: 'e7c93b0a-2207-e111-961b-0ee1388ccc3a',
  JM: 'f7b06124-8710-e111-961b-0ee1388ccc3a',
  IN: 'e9b06124-8710-e111-961b-0ee1388ccc3a',
  PH: '61b16124-8710-e111-961b-0ee1388ccc3a'
};

export const Country = {
  US: 'US',
  CA: 'CA',
  UK: 'UK',
  JM: 'JM',
  IN: 'IN',
  PH: 'PH'
}

export const MarketingParamKeys = {
  sem_account_id: "Account",
  sem_campaign_id: "CampaignId",
  sem_ad_group_id: "AdGroup",
  sem_device_type: "Device",
  sem_keyword: "Keyword",
  sem_matchtype: "MatchType",
  sem_placement: "Placement",
  sem_placement_category: "Category",
  sem_ad_id: "AdId",
  sem_network: "NetworkType",
  sem_target_id: "Targeting",
  sem_feed_item_id: "AdExtension",
  gclid: "AdwordsId",
  msclkid: "AdwordsId",
  utm_content: "Content",
  utm_source: "Network",
  utm_medium: "Medium",
  utm_term: "Term",
  sem_location_id: "LocationId",
};

export const AdmissionStep = {
  PROFILE: 1,
  VALIDATE_ACCOUNT: 2,
  AGENT_TYPE: 3,
  PICK_CLIENT: 4,
  SOLE_PROPRIETOR: 5,
  NEW_CALL_CENTER: 6,
  JOIN_BUSINESS: 7,

  JB_SEND_REQUEST: 8,
  JB_SIGN_AGREEMENTS: 9,
  JB_PENDING_FINALIZATION: 10,
  JB_VERIFY_IDENTITY: 15,

  NCC_SIGN_AGREEMENTS: 11,
  NCC_VERIFY_IDENTITY: 14,
  NCC_BUSINESS_INFO: 16,
  NCC_VERIFY_BUSINESS_INFO: 20,

  // New Constants
  RB_SIGN_AGREEMENTS: 11,
  RB_VERIFY_IDENTITY: 14,
  RB_BUSINESS_INFO: 16,
  RB_VERIFY_BUSINESS_INFO: 20,


  SP_VERIFY_IDENTITY: 13,
  SP_SIGN_AGREEMENTS: 12,
  SP_BUSINESS_INFO: 17,

  VALIDATE_PHONE: 18,
  VALIDATE_EMAIL: 19,
  Opportunity_Board: 21,
};

export const JoinCallCenter = {
  PENDING_ACCEPTANCE: 2,
  PENDING_FINALIZATION: 8,
};

export const AgentPath = {
  SOLE_PROPRIETOR: 100000003,
  NEW_CALL_CENTER: 100000000,
  JOIN_BUSINESS: 100000002,
};

export const FooterLinks = {
  SYSTEM_EQUIPMENT_POLICY: 'https://www.spotifyworkfromhome.com/equipment-and-system-policy-spotify-work-from-home/',
  PRIVACY_POLICY: 'https://www.spotifyworkfromhome.com/privacy-policy-2/',
  TERMS_OF_USE: 'https://www.spotifyworkfromhome.com/terms-of-use/',
  ACCEPTABLE_USE_POLICY: 'https://www.spotifyworkfromhome.com/wp-content/uploads/2022/03/Acceptable-Use-Policy_2022.pdf',
  NO_SHOW_POLICY: 'https://www.spotifyworkfromhome.com/wp-content/uploads/2022/07/No-Show-Fee-Policy.pdf',
  BACKGROUND_CHECK_POLICY: 'https://www.spotifyworkfromhome.com/wp-content/uploads/2022/08/Background-Check-Policy.pdf',
  BACKGROUND_CHECK_POLICY_FOR_JM: 'https://www.spotifyworkfromhome.com/wp-content/uploads/2022/08/Background-Check-Policy.pdf',
  JAMIACA_POLICE_RECORD_CHECK_INSTRUCTIONS: 'https://www.spotifyworkfromhome.com/wp-content/uploads/2023/02/Jamaica-Police-Record-Check-Instructions.pdf',
  CLASS_CONFIRMATION_POLICY: 'https://www.spotifyworkfromhome.com/spotify-platform-policy-class-confirmation-deposit/',
  FTC_NOTICE: 'https://www.spotifyworkfromhome.com/legal-notice/'
}

export const titleAtTheCompany = {
  "06f90dc0-69ff-e011-961b-0ee1388ccc3a": [
    "Chief Executive Officer",
    "President",
    "Executive Vice President",
    "Senior Vice President",
    "Vice President",
    "Chief Operating Officer",
    "Chief Financial Officer",
    "Treasurer",
    "Manager",
  ],

  "e8c93b0a-2207-e111-961b-0ee1388ccc3a": [
    "Chief Executive Officer",
    "President",
    "Executive Vice President",
    "Senior Vice President",
    "Vice President",
    "Chief Operating Officer",
    "Chief Financial Officer",
    "Treasurer",
    "Director",
  ],

  "e7c93b0a-2207-e111-961b-0ee1388ccc3a": ["Director", "Company Director"],

  "e9b06124-8710-e111-961b-0ee1388ccc3a": [
    "Chief Executive Officer",
    "President",
    "Executive Vice President",
    "Senior Vice President",
    "Vice President",
    "Chief Operating Officer",
    "Chief Financial Officer",
    "Treasurer",
    "Manager",]
};

export const SwitchingProgramReason = {
  SwitchProgram: 506920000,
  AdditionalProgram: 506920001,
};

export const TabNames = {
  BestMatchTab: "Best Match",
  AdditionalOppurtunities: "Additional Opportunities",
};

export const Reasons = {
  AddingProgram: "I would like to service an additional program.",
  SwitchingProgram: "I would like to switch to a different program.",
};

export const agentStatusId = {
  ValidatePhone: 506920005,
  VerifyIdentity: 506920006,
  SignAgreements: 506920007,
  PendingFinalization: 506920008,
  ProfileComplete: 506920009,
  SendRequest: 506920010,
};

export const errorMessages = {
  TRNError: "Could not verify TRN. Make sure name matches TRN card. WARNING you only have two tries before profile is deactivated.",
  SSNError: "Could not verify SSN. Make sure name matches SSN card. WARNING you only have two tries before profile is deactivated.",
  AADHARError: "Could not verify AADHAR, go back and try again. Make sure name matches AADHAR card. WARNING you only have two tries before profile is deactivated.",
  AADHARAppendError: "Go back and try again. Make sure name matches AADHAR card. WARNING you only have two tries before profile is deactivated.",
  AadharOtpError: "Could not generate AADHAR OTP.",
  CongaAgreementError: "Unable to fetch agreements. Retrying to intiate transaction again, Please wait",
  ClearTransactionIdError: "Couldnt Clear the transactionId. Please contact support",
  IntiateTransactionError: "Group TransactionId is Null. Retrying to intiate transaction again, Please wait",
  CongaErrorAfterRetry: "Unable to fetch the agreements. Please contact support",
  ASIerror: "Some thing went wrong . Please try again"
}

export const CongaAgreementStatus = {
  Completed: "Completed",
  Merge: "Merge Pending",
  SignaturePending: "Signature Pending",
  New: "New",
  MergeError: "Merge Error",
  SignatureError: "Signature Error"

}

export const CountryISO3CountryCode = {
  'e8c93b0a-2207-e111-961b-0ee1388ccc3a': "CAN",
  'e7c93b0a-2207-e111-961b-0ee1388ccc3a': "GBR",
  'f7b06124-8710-e111-961b-0ee1388ccc3a': "JAM",
  'e9b06124-8710-e111-961b-0ee1388ccc3a': "IND",
  '61b16124-8710-e111-961b-0ee1388ccc3a': "PHL"
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_ENTITY: 422
}

export const GST_VALIDATION_CODE = ["TRANSACTION_DATE_INVALID", "GST_INVALID", "COMPANY_INVALID", "VALIDATION_ISSUE", "SUSPENDED", "EXTERNAL_SERVER_ERROR", "TECHNICAL_ISSUE"];


export const SpringVerifyBGCOrderStatus = {
    NotStarted: 100000000,
    Started: 100000001,
    Complete: 100000002,
    Deleted: 100000003,
    DealBroken: 100000004,
    ApplicantBlockedDateRange: 100000005,
    Duplicate: 100000006,
    Fail: 100000007,
    Cancelled: 100000008
}


export const TaxProgram = {
  "NA" : "506920000",
  "RT0001" : "506920001",
  "RT0002" : "506920002",
  "RT0003" : "506920003",
  "RT0004" : "506920004"
}

export const TypeOfIncopration = {
  "NA" : "506920000",
  "Company" : "506922000",
  "Individual" : "506922001",
  "PartnerShip" : "506922002"
}

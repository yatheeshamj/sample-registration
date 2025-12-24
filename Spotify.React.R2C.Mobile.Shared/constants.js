export const MOBILE_VALIDATION_CODE_TYPE = 506920001; 
export const EMAIL_VALIDATION_CODE_TYPE = 506920000;
export const GOOGLE_MAPS_BASE_URL = "https://www.googleapis.com";

export const COUNTRY_IDS = {
    US: '06f90dc0-69ff-e011-961b-0ee1388ccc3a',
    CA: 'e8c93b0a-2207-e111-961b-0ee1388ccc3a',
    UK: 'e7c93b0a-2207-e111-961b-0ee1388ccc3a',
    JM: 'f7b06124-8710-e111-961b-0ee1388ccc3a',
    IN: 'E9B06124-8710-E111-961B-0EE1388CCC3A',
};

export const Country = { 
    US: 'US',
    CA: 'CA',
    UK: 'UK',
    JM: 'JM',
    IN: 'IN'
}

export const AdmissionStep = {
  SELECT_A_PATH: 0,
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

  SP_VERIFY_IDENTITY: 13,
  SP_SIGN_AGREEMENTS: 12,
  SP_BUSINESS_INFO: 17,

  VALIDATE_PHONE: 18,
  VALIDATE_EMAIL: 19,
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

export const AllowClassRescheduleXDaysBeforeClassStart = 3;

export const OpportunityAnnouncementDocumentType = {
  PDF: 506920000,
  Video: 506920002,
  Audio: 506920001,
};

export const OpportunityStatus = {
  Dropped: "Dropped",
  Canceled: "Canceled",
  Client_Qualified: "Client Qualified",
  Failed: "Failed",
  Interested: "Interested",
  Passed: "Passed",
  Enrolled_Full_Payment: "Enrolled(Full Payment)",
};

export const OpportunityStatusReason = {
  _dotdot: "..",
  Affidavit_not_completed: "Affidavit not completed",
  Affidavit_not_compliant: "Affidavit not compliant",
  Assessment_not_completed: "Assessment not completed",
  Auto_Client_Qualified: "Auto Client Qualified",
  Background_Check_Request_Submitted_to_FA:
    "Background Check Request Submitted to FA",
  Background_Check_Results_Not_Received:
    "Background Check Results Not Received",
  Backgroundcheck_AutoPass: "Backgroundcheck AutoPass",
  CA_below_90: "CA below 90 %",
  CA_Terminated_by_Willow: "CA Terminated by Willow",
  CA_Terminated_Client_Service_Agreement:
    "CA Terminated Client Service Agreement",
  CA_Terminated_Willow_Service_Agreement:
    "CA Terminated Willow Service Agreement",
  Cannot_Express_Interest_Within_Specified_Time:
    "Cannot Express Interest Within Specified Time",
  Certification_Challenges: "Certification Challenges",
  Class_Canceled: "Class Canceled",
  Class_Full: "Class Full",
  Client_Rejected: "Client Rejected",
  Client_Terminated_Client_Service_Agreement:
    "Client Terminated Client Service Agreement",
  Course_Drop_Policy: "Course Drop Policy",
  Course_not_required_for_CSP: "Course not required for CSP",
  Cust_Serv_requirement_not_met: "Cust Serv requirement not met",
  Dismissed: "Dismissed",
  Does_not_meet_program_requirement: "Does not meet program requirement",
  Dropped_from_VSC_by_Principal_Owner: "Dropped from VSC by Principal Owner",
  enrolled_in_line_of_business_of_same_client:
    "enrolled in line of business of same client",
  Enrollee_didnt_meet_Smart_Enrollment_rules:
    "Enrollee didn't meet Smart Enrollment rules",
  Expressed_interest_in_other_program: "Expressed interest in other program",
  Fail_Drug_Test: "Fail Drug Test",
  Fail_PC_Scan: "Fail PC Scan",
  Failed_background_check: "Failed background check",
  Failed_Coursework: "Failed Coursework",
  Failed_Identity_Verification: "Failed Identity Verification",
  Failed_Language_Assessment: "Failed Language Assessment",
  Failed_Pre_Enrollment_Assessment: "Failed Pre Enrollment Assessment",
  Failed_Program_Assessment: "Failed Program Assessment",
  Failed_Voice_Assessment: "Failed Voice Assessment",
  Failure_to_complete_drug_test: "Failure to complete drug test",
  Family_Medical_Emergency: "Family / Medical Emergency",
  Interested: "Interested",
  Manual_Review: "Manual Review",
  move_to_another_wave: "move to another wave",
  Moved_to_Different_Wave: "Moved to Different Wave",
  Moving_to_Different_Wave: "Moving to Different Wave",
  Multiple_enrollment_in_opportunities: "Multiple enrollment in opportunities",
  Multiple_terminations_for_cause: "Multiple terminations for cause",
  No_Class_Payment: "No Class Payment",
  No_Longer_Interested: "No Longer Interested",
  No_Longer_Interested_Early_Engagement:
    "No Longer Interested - Early Engagement",
  No_Longer_Interested_Early_Engagement:
    "No Longer Interested – Early Engagement",
  No_Show: "No Show",
  Not_Certified: "Not Certified",
  Not_Certified_Did_Not_Complete_Drug_Test:
    "Not Certified - Did Not Complete Drug Test",
  Not_Meeting_Client_Requirement: "Not Meeting Client Requirement",
  Not_Selected: "Not Selected",
  Other_Opportunity_Restriction: "Other Opportunity Restriction",
  PC_Scan_not_completed: "PC Scan not completed",
  PC_Scan_Passed: "PC Scan Passed",
  Pending_Background_check: "Pending Background check",
  Pending_Background_Check_Document: "Pending Background Check Document",
  Pending_Drug_Test: "Pending Drug Test",
  Pending_Identity_Verification: "Pending Identity Verification",
  Pending_Language_Assessment: "Pending Language Assessment",
  Pending_PC_Scan: "Pending PC Scan",
  Pending_PC_Scan_Retry: "Pending PC Scan - Retry",
  Pending_Pre_Enrollment_Assessment: "Pending Pre Enrollment Assessment",
  Pending_Program_Assessment: "Pending Program Assessment",
  Pending_Review: "Pending Review",
  Pending_Self_Assessment: "Pending Self Assessment",
  Pending_Voice_Assessment: "Pending Voice Assessment",
  Reason_not_listed: "Reason not listed",
  Sales_requirement_not_met: "Sales requirement not met",
  SOW_not_signed: "SOW not signed",
  SOW_of_20_hours_or_more: "SOW of 20 hours or more",
  Status_Set_from_Agent_Upload_Application:
    "Status Set from Agent Upload Application",
  Status_Set_from_BMS: "Status Set from BMS",
  Status_Set_from_CRM: "Status Set from CRM",
  Tech_requirement_not_met: "Tech requirement not met",
  Technical_Challenges: "Technical Challenges",
  Time_Constraints: "Time Constraints",
  Unqualified_Due_To_Accounting: "Unqualified Due To Accounting",
  Unqualified_Due_To_Skill_Set: "Unqualified Due To Skill Set",
  Unsatisfactory_assessment: "Unsatisfactory assessment",
  Withdrew_During_Class: "Withdrew During Class",
  Withdrew_Prior_To_Class: "Withdrew Prior To Class",
};

export const OpportunityIneligibleStatuses = [
  { Status: OpportunityStatus.Failed, StatusReason: "*" },
  { Status: OpportunityStatus.Dropped, StatusReason: "*" },
  { Status: OpportunityStatus.Canceled, StatusReason: "*" },
  {
    Status: OpportunityStatus.Canceled,
    StatusReason: OpportunityStatusReason.No_Longer_Interested,
    Exception: true,
  },
  {
    Status: OpportunityStatus.Canceled,
    StatusReason: OpportunityStatusReason.Dropped_from_VSC_by_Principal_Owner,
    Exception: true,
  },
  {
    Status: OpportunityStatus.Canceled,
    StatusReason: OpportunityStatusReason.Expressed_interest_in_other_program,
    Exception: true,
  },
  {
    Status: OpportunityStatus.Dropped,
    StatusReason: OpportunityStatusReason.Dropped_from_VSC_by_Principal_Owner,
    Exception: true,
  },
  {
    Status: OpportunityStatus.Dropped,
    StatusReason: OpportunityStatusReason.Expressed_interest_in_other_program,
    Exception: true,
  },
  {
    Status: OpportunityStatus.Dropped,
    StatusReason: OpportunityStatusReason.No_Longer_Interested,
    Exception: true,
  },
  {
    Status: OpportunityStatus.Dropped,
    StatusReason: OpportunityStatusReason.No_Longer_Interested_Early_Engagement,
    Exception: true,
  },
];

export const OpportunityInProgressStatuses = [
  { Status: OpportunityStatus.Enrolled_Full_Payment, StatusReason: "*" },
  { Status: OpportunityStatus.Client_Qualified, StatusReason: "*" },
  { Status: OpportunityStatus.Interested, StatusReason: "*" },
];

export const OpportunityNotForBestMatchTab = [
  { Status: OpportunityStatus.Enrolled_Full_Payment, StatusReason: "*" },
  { Status: OpportunityStatus.Client_Qualified, StatusReason: "*" },
  { Status: OpportunityStatus.Interested, StatusReason: "*" },
  { Status: OpportunityStatus.Passed, StatusReason: "*" },
  { Status: OpportunityStatus.Dropped, StatusReason: "*" },
  { Status: OpportunityStatus.Canceled, StatusReason: "*" },
  { Status: OpportunityStatus.Failed, StatusReason: "*" },
];

export const OpportunityNotForAdditionalTab = [
  { Status: OpportunityStatus.Enrolled_Full_Payment, StatusReason: "*" },
  { Status: OpportunityStatus.Client_Qualified, StatusReason: "*" },
  { Status: OpportunityStatus.Interested, StatusReason: "*" },
  { Status: OpportunityStatus.Passed, StatusReason: "*" },
  { Status: OpportunityStatus.Failed, StatusReason: "*" },
];

export const OpportunityInCertificationStatuses = [
  { Status: OpportunityStatus.Enrolled_Full_Payment, StatusReason: "*" },
];

export const OpportunityEligibleStatuses = [
  { Status: null, StatusReason: null },
  ...OpportunityIneligibleStatuses.filter((x) => x.Exception).map((s) => ({
    ...s,
    Exception: undefined,
  })),
  ...OpportunityInProgressStatuses,
  ...OpportunityInCertificationStatuses,
];

export const Schedulefacility = {
  Torch_LMS: 206200003,
  Absorb_LMS: 206200005,
  GOTOTraining: 506920000,
  Zoom: 506920002,
  Accelerate_LMS: 206200006,
};

export const GlobalParameterTypes = {
  ENROLLMENT_RESCHEDULE_CUTOFFTIME: "EnrollmentRescheduleCutoffTime",
  FAQUrl: "FAQUrl",
  MessagesUrl: "MessagesUrl",
  LMS_ACCELERATE_AccessURL: "LMS_Centrical_AccessURL",
  JAMAICA_FIX_DATE:"JamaicaFixDate",
  NO_SHOW_WINDOW:"NoShow - Days before Class Start - Deposit Window Open",
  REFUND_WINDOW:"NoShow - Days before Class Start - No Refund Self Drop",
  NO_SHOW_AUTO_DROP:"NoShow - Days before Class Start - Auto Drop if Deposit Not Received",
  NO_SHOW_REINSTATE:"NoShow - Days before Class Start - No Reinstate Enrolment",
  Incode_System_Down_Wait_Time: "Incode_System_Down_Wait_Time",
  LMSMessage:"LMS Message",
  SBACCheck_GlobalIsEnabled:"SBACCheck_GlobalIsEnabled",
  DOLE_GOLIVE_CCD:"DOLE_GOLIVE_CCD",
  CDD_Pay_Day_Limit:"CCD Payment Day Limit"
};

export const EnrollmentModuleNames = {
  INTERVIEW_IQ: "INTERVIEW_IQ",
  SELF_ASSESSMENT: "SELF_ASSESSMENT",
  PRE_WORK: "PRE_WORK",
  PAY: "PAY",
  BACKGROUND_CHECK: "BACKGROUND_CHECK",
  IDENTITY_VERIFICATION: "IDENTITY_VERIFICATION",
  PC_CHECK: "PC_CHECK",
  VOICE_ASSESSMENT: "VOICE_ASSESSMENT",
  AUTO_QUALIFY: "AUTO_QUALIFY",
  PROGRAM_ASSESSMENT: "PROGRAM_ASSESSMENT",
  ADDITIONAL_FORMS: "ADDITIONAL_FORMS",
  PHOTO_ID: "PHOTO_ID",
  LANGUAGE_IQ: "LANGUAGE_IQ",
  FINGERPRINT: "FINGERPRINT",
  DEPOSIT:"DEPOSIT",
  VERIFY_TRN:"VERIFY_TRN"
};

export const _3rdPartyLinkTypes = {
    SELF_PACED: "SELF_PACED",
    VIRTUAL_CLASSROOM: "VIRTUAL_CLASSROOM",
    CROWD_HUB: "CROWD_HUB",
    KNOWLEDGE_ZONE: "KNOWLEDGE_ZONE",
    CHAT_ROOM: "CHAT_ROOM",
    INTERVIEW_IQ: "INTERVIEW_IQ",
    VOICE: "VOICE",
    Starmatic: "Starmatic",
    PROGRAM: "PROGRAM",
    PC_CHECK: "PC_CHECK",
    VA: "VA",
    ABSORBLMS_URL: "ABSORBLMS_URL",
    SCREENING_ASSESSMENT: "SCREENING_ASSESSMENT",
    LANGUAGE_IQ: "LANGUAGE_IQ",
    FINGERPRINT: "FINGERPRINT"
}

export const PhotoIdStatus = {
  Pass: "Pass",
  Fail: "Fail",
  Incomplete: "Incomplete",
  Review: "Review",
  Cancelled: "Cancelled",
  RetainInPlace: "RetainInPlace",
  Manual: "Manual"
};

export const OpportunityType = {
  NewLearner: "New Learner",
  SkillEnhancement: "Skill Enhancement",
  BackgroundCheck: "Background Check",
  ContractingOnly: "Contracting Only",
  DrugTesting: "Drug Testing",
  Equipment: "Equipment",
  GeneralCertification: "General Certification",
  PCScan: "PC Scan",
  SecurityScreening: "Security Screening",
  CrossCertification:"Cross Certification"
};

export const agentStatusId = {
  ValidatePhone: 506920005,
  VerifyIdentity: 506920006,
  SignAgreements: 506920007,
  PendingFinalization: 506920008,
  ProfileComplete: 506920009,
};


export const AgentStatus={
  Inprogress:"Inprogress",
  Active:"Active",
  Inactive:"Inactive"
}

export const ErrorMessages={
  TRNError: "Could not verify TRN. Make sure name matches TRN card. WARNING you only have two tries before profile is deactivated.",
  ClassConflictWithServicingTimeWhileEnroll:"This class time conflicts with intervals you have already scheduled. If you want to proceed with the selected class time, click \"Continue\" and we will release those intervals on your behalf. Otherwise, select another class time or select \"Cancel\".",
  ClassConflictWithServicingTimeWhileReschedule:"This class time conflicts with intervals you have already scheduled. If you want to proceed with the selected class time, click \"Reschedule Class Time\" and we will release those intervals on your behalf. Otherwise, select \"Stay in Class\"."
}

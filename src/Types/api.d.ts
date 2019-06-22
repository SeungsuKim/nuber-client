/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toogleDriving
// ====================================================

export interface toogleDriving_ToogleDrivingMode {
  __typename: "ToogleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface toogleDriving {
  ToogleDrivingMode: toogleDriving_ToogleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartPhoneVerification
// ====================================================

export interface StartPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean | null;
  error: string | null;
}

export interface StartPhoneVerification {
  StartPhoneVerification: StartPhoneVerification_StartPhoneVerification;
}

export interface StartPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FacebookConnect
// ====================================================

export interface FacebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnect {
  FacebookConnect: FacebookConnect_FacebookConnect;
}

export interface FacebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  facebookId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyPhone
// ====================================================

export interface VerifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface VerifyPhone {
  CompletePhoneVerification: VerifyPhone_CompletePhoneVerification;
}

export interface VerifyPhoneVariables {
  phoneNumber: string;
  key: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================

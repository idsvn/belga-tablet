export interface UserModel {
  function?: Function;
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  gender?: string;
  email?: string;
  phone?: string;
  active?: boolean;
  doNotDisturb?: boolean;
  from?: string;
  to?: string;
  organization?: Organization;
  muted?: Muted[];
  onboardedEnvironments?: OnboardedEnvironments[];
  favoriteSources?: number[];
  followedNewsrooms?: number[];
  journalistNewsroom?: number[];
  followedTopics?: number[];
  userType?: string;
  userRole?: string;
  topicsOnboarding?: TopicsOnboarding;
}

export interface Organization {
  newsroomThreshold?: number;
  id?: number;
  name?: string;
  organizationType?: OrganizationType;
}

export enum OrganizationType {
  GOV = 'GOV',
  MEDIA = 'MEDIA',
  CORPORATE = 'CORPORATE',
  VISITORS = 'VISITORS',
}

export enum OnboardedEnvironments {
  WEB = 'WEB',
  APP = 'APP',
}

export enum TopicsOnboarding {
  DONE = 'DONE',
  SKIPPED = 'SKIPPED',
}

export enum Function {
  JOURNALIST = 'JOURNALIST',
  PR = 'PR',
  EXPERT = 'EXPERT',
  CONTENT_CREATOR = 'CONTENT_CREATOR',
  OTHER = 'OTHER',
}

export enum Muted {
  WEB_EMAILS = 'WEB_EMAILS',
  WEB_PUSH_NOTIFICATIONS = 'WEB_PUSH_NOTIFICATIONS',
  NATIVE_PUSH_NOTIFICATIONS = 'NATIVE_PUSH_NOTIFICATIONS',
}

interface ResetPwdOptions {
  firstName: string;
  lastName: string;
  resetCode: string;
}

interface WelcomeOptions {
  firstName: string;
  lastName: string;
}

interface EmailParamsOptions {
  [key: string]: string;
}

export interface IEmailParams {
  type: string;
  sendTo: string;
  data?: EmailParamsOptions | ResetPwdOptions | WelcomeOptions;
}

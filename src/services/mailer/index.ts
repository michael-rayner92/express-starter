import sendGridMail from "@sendgrid/mail";
import config from "@config";
import Logger from "@services/logger";
import { IEmailParams } from "./types";

const { isDev, sendgrid } = config;

sendGridMail.setApiKey(sendgrid.key);

const getMessage = (emailParams: IEmailParams) => {
  const { sendTo, type } = emailParams;

  // Get email template from type and populate fields from data
  const body = "This is a test email using SendGrid from Node.js";

  return {
    to: sendTo,
    from: sendgrid.email,
    subject: `${type} email with Node.js and SendGrid`,
    text: body,
    html: `<strong>${body}</strong>`
  };
};

const sendEmail = async (emailParams: IEmailParams): Promise<void> => {
  const { sendTo, type } = emailParams;

  if (isDev) {
    Logger.info(`${type} email sent to ${sendTo} in dev mode`);
    return;
  }

  try {
    await sendGridMail.send(getMessage(emailParams));
    Logger.info(`${type} email sent to ${sendTo} in prod mode`);
  } catch (err) {
    Logger.error(`Error sending ${type} email to ${sendTo}`, err);
    if (err.response) Logger.error(err.response.body);
  }
};

export default sendEmail;

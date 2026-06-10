import mg from "./mg";
// import ejs from "ejs";
// import path from "path";
// import fs from "fs";

export const registerEmail = async (name: string, to: string) => {
  try {
    await mg.messages.create("mg.hemaglobal.org", {
      from: "Hema <accounts@hemaglobal.org>",
      to: to,
      subject: "Welcome to Hema",
      template: "email template for hema",
    });

    return {
      status: 200,
      body: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Mailgun error:", error.message);
    return {
      status: 500,
      body: error.response?.body || error.message,
    };
  }
};

export const packageSubscriptionEmail = async (
  name: string,
  to: string,
  pkg: string
) => {
  try {
    await mg.messages.create("mg.hemaglobal.org", {
      from: "Mailgun Sandbox <postmaster@mg.hemaglobal.org>",
      to: [to],
      subject: "Welcome to Hema",
      template: "email template for hema",
      "h:X-Mailgun-Variables": JSON.stringify({
        test: "test",
      }),
    });

    return {
      status: 200,
      body: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Mailgun error:", error.message);
    return {
      status: 500,
      body: error.response?.body || error.message,
    };
  }
};

export const userForgotPasswordEmail = async (
  name: any,
  email: string,
  code: string
) => {
  try {
    let response = await mg.messages.create("mg.hemaglobal.org", {
      from: "Hema security team <support@hemaglobal.org>",
      to: email,
      subject: "Password Reset code from Hema",
      template: "Forgot Password for hema",
      "h:X-Mailgun-Variables": JSON.stringify({
        user: name,
        code: code,
      }),
    });

    return {
      status: 200,
      body: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Mailgun error:", error.message);
    return {
      status: 500,
      body: error.response?.body || error.message,
    };
  }
};

// import config from "@config";
// const { isProd, domains } = config;

// @@todo Expand this
// @link https://www.youtube.com/watch?v=1-sx4AmjGCI&list=PLyuRouwmQCjkmd_M8qQ__RUFV8vJF67PP&index=26
// &&
// @link https://www.npmjs.com/package/helmet

interface CSPDirectives {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc?: string[];
  fontSrc?: string[];
  imgSrc?: string[];
  reportUri?: string;
}

interface CSP {
  directives: CSPDirectives;
}

const contentSecurityPolicy: CSP = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    imgSrc: ["data:", "http://127.0.0.1:5000"],
    styleSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
    fontSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
    reportUri: "/report-issue"
  }
};

export default contentSecurityPolicy;

// import config from "@config";
// const { isProd, domains } = config;

// todo Expand this
// @link https://www.youtube.com/watch?v=1-sx4AmjGCI&list=PLyuRouwmQCjkmd_M8qQ__RUFV8vJF67PP&index=26

interface CSPDirectives {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc: string[];
  fontSrc: string[];
}

interface CSP {
  directives: CSPDirectives;
}

const contentSecurityPolicy: CSP = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "code.jquery.com", "maxcdn.bootstrapcdn.com"],
    styleSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
    fontSrc: ["'self'", "maxcdn.bootstrapcdn.com"]
  }
};

export default contentSecurityPolicy;

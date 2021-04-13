module.exports = {
  apps: [
    {
      name: "Express Server",
      script: "./build/server.js",
      instances: "max",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};

// @@todo Create full implementation and test
// @@resource https://flaviocopes.com/pm2
// @@resource https://pm2.keymetrics.io

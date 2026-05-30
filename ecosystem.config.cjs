module.exports = {
  apps: [
    {
      name: "kyan-app",
      script: "./start-server.js",
      interpreter: "bun", // Tells PM2 to run the script using Bun
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};

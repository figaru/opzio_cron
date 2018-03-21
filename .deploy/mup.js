module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '178.62.89.210',
      username: 'root',
      // pem: './path/to/pem'
      password: 't34m0Pz10_1984#law'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'cron_service',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://cron.opz.io',
      MONGO_URL: 'mongodb://admin:t34m0Pz10_1984#law@ds123751-a0.mlab.com:23751,ds123751-a1.mlab.com:23751/opz-app?replicaSet=rs-ds123751&connectTimeoutMS=240000&socketTimeoutMS=240000',
      APP_URL: 'https://www.opz.io',
      REMOTE_URL: 'mongodb://admin:t34m0Pz10_1984#law@ds123751-a0.mlab.com:23751,ds123751-a1.mlab.com:23751/opz-app?replicaSet=rs-ds123751&connectTimeoutMS=240000&socketTimeoutMS=240000',
    },

    ssl: { // (optional)
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'lawbraun.almeida@gmail.com',
        // comma separated list of domains
        domains: 'cron.opz.io'
      }
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      image: 'abernix/meteord:base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // mongo: {
  //   version: '3.4.1',
  //   servers: {
  //     one: {}
  //   }
  // }
};

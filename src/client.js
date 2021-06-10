const { Client } = require('discord.js');
const conf = require('./configurations.json');

class client extends Client {
  constructor(options) {
    super();
  };
  
  message(content, channel, timeout) {
    const log = this.channels.cache.get(channel);
    if (log) log.send(content).then(message => message.delete({ timeout: timeout }));
  };
  
  run() {
    this.login(conf.imports.token);
  };
};

module.exports = client;

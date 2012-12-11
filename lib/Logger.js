var winston = require('winston');
var level = 'debug';

module.exports = function(filename) {
  var logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize  : true,
        level     : level
      }),
      new winston.transports.File({
        level     : level,
        json      : false,
        filename  : filename
      })
    ]
  });

  logger.setLevels(winston.config.syslog.levels);

  return logger;
};


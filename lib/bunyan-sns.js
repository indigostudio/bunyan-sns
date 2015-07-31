var util = require('util');
var aws = require('aws-sdk');

function BunyanSns(options, error) {
    options = options || {};
	if (!options.topic) {
		throw new Error('\'topic\' cannot be null');
	} else {
        this.customFormatter = options.customFormatter;
        this.topic = options.topic;
        this.error = error || function() {};
        this.json = !!options.json;
        this.sns = new aws.SNS();
	}
}

var nameFromLevel = {
	10: 'trace',
	20: 'debug',
	30: 'info',
	40: 'warn',
	50: 'error',
	60: 'fatal'
};

BunyanSns.prototype.write = function write(record) {
    var self = this,
    levelName,
    message;

    if (typeof record === 'string') {
        record = JSON.parse(record);
    }

    levelName = nameFromLevel[record.level];
    try {
        message = self.customFormatter ? self.customFormatter(record, levelName) : {
            text: util.format('[%s] %s', levelName.toUpperCase(), record.msg),
            record: record
        };
    } catch(err) {
        return self.error(err);
    }

    var params = {
        TopicArn: this.topic,
        Message: this.json ? message : message.text,
        Subject: (levelName + " - " + record.msg).substr(0,100)
    };

    if (this.json) {
        params.MessageAttributes = 'json';
    }

    this.sns.publish(params, function(err) {
        if (err) {
            return self.error(err);
        }
    });
};

module.exports = BunyanSns;

# bunyan-sns

**Bunyan stream for Amazon SNS integration**

First install bunyan...

```
npm install bunyan
```

Then install bunyan-sns

```
npm install bunyan-sns
```

##Basic Setup

```javascript
var bunyan  = require("bunyan"),
	BunyanSlack = require('bunyan-slack'),
	log;

log = bunyan.createLogger({
	name: "myApp",
	stream: new BunyanSns({
		topic: "topic_arn"
	}),
	level: "error"
});

log.error("hello bunyan sns");
```
You can also pass an optional error handler.

```javascript
new BunyanSlack({
	topic: "topic_arn"
}, function(error){
	console.log(error);
});
```


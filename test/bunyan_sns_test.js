var util = require('util');
var expect = require('chai').expect;
var Bunyan = require('bunyan');
var BunyanSns = require('../lib/bunyan-sns');

describe('bunyan-sns', function() {
	describe('constructor', function() {
		it('should require a webhook', function() {
			expect(function() {
				Bunyan.createLogger({
					name: 'myapp',
					stream: new BunyanSns({}),
					level: 'info'
				});
			}).to.throw(/'topic' cannot be null/);
		});

		it('should accept json option', function() {
            var log = Bunyan.createLogger({
                name: 'myapp',
                stream: new BunyanSns({
                    topic: 'arn:bad',
                    json: true
                }, function(error) {
                    expect(error).to.instanceof(Error);
                    done();
                }),
                level: 'info'
            });

			log.info('foobar');
		});
	});

	describe('error handler', function() {
		it('should use error handler', function(done) {
			var log = Bunyan.createLogger({
				name: 'myapp',
				stream: new BunyanSns({
					topic: 'arn:bad'
				}, function(error) {
					expect(error).to.instanceof(Error);
					done();
				}),
				level: 'info'
			});
			log.info('foobar');
		});
	});

	describe('writer', function() {
		it('should accept JSON messages', function(done) {
			var log = Bunyan.createLogger({
				name: 'myapp',
				stream: new BunyanSns({
					topic: 'arn:bad'
				}, function(error) {
					expect(error).to.instanceof(Error);
					done();
				}),
				level: 'info'
			});
			log.info({ foo: 'bar'}, 'foobar');
		});
	});
});



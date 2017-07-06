var expect = require('chai').expect;
var sinon = require('sinon');
var routeAutocorrect = require('../lib');


describe('express-route-autocorrect', function () {
    describe('request handler creation', function () {
        var routeAutocorrectInstance;

        beforeEach(function () {
            routeAutocorrectInstance = routeAutocorrect([
                '/',
                '/route1',
                '/route2/subroute2'
            ]);
        });

        it('should return a function()', function () {
            expect(routeAutocorrectInstance).to.be.a('function');
        });

        it('should accept three arguments', function () {
            expect(routeAutocorrectInstance.length).to.equal(3);
        });
    });

    describe('request handler calling', function () {
        it('should call next() once', function () {
            var routeAutocorrectInstance = routeAutocorrect([
                '/',
                '/route1',
                '/route2/subroute2'
            ]);
            var req = {url : '/routes1'}
            var res = {}
            var nextSpy = sinon.spy();

            routeAutocorrectInstance(req, {}, nextSpy);
            expect(nextSpy.calledOnce).to.be.true;
        });
    });

    describe('best match testing', function () {

        it('should get a correct best match', function () {
            var routeAutocorrectInstance = routeAutocorrect([
                '/',
                '/route1',
                '/route2/subroute2'
            ]);

            var req = {url : '/routes1'}
            var res = {}

            routeAutocorrectInstance(req, res, function () {});
            expect(req.urlBestMatch).to.equal('/route1');
        });
        it('should redirect to best match', function () {
            var routeAutocorrectInstance = routeAutocorrect({
                routes: [
                    '/',
                    '/route1',
                    '/route2/subroute2'
                ],
                redirect: true
            });
            var redirectSpy = sinon.spy();
            var req = {url : '/routes1'}
            var res = {redirect : redirectSpy}

            routeAutocorrectInstance(req, res, function () {});
            expect(redirectSpy.calledOnce).to.be.true;

        });
    });
});

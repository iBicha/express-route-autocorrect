# express-route-autocorrect

Middleware that autocorrects url routes to the closest match.
## Install

    $ npm install express-route-autocorrect --save
## Usage

`express-route-autocorrect` should be set as the last middleware, but right before the 404 not found error handler.
It will populate `req.urlBestMatch` with the best match so you can decide what to do with it.
The middleware takes an array of routes to compare then against the request.
```javascript
var routeAutocorrect = require('express-route-autocorrect');
//some other middlewares...

app.use('/', index);
app.use('/users', users);
app.use('/some/other/route', someOtherView);

app.use(routeAutocorrect([
    '/',
    '/users',
    '/some/other/route'
]));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // e.g. if req.url == '/user' then req.urlBestMatch will contain '/users'
    var err = new Error('Not Found. did you mean to go to ' + req.urlBestMatch + ' ?');
    err.status = 404;
    next(err);
});

// error handler view here...
```

You can also specify to redirect option, to automatically redirect to the `bestMatch`

```javascript
app.use(routeAutocorrect({
    routes: [
        '/',
        '/users',
        '/some/other/route'
    ],
    redirect: true
}));
```

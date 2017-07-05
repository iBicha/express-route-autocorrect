# express-route-autocorrect

Middleware that autocorrects url routes to the closest match.

## Usage

express-route-autocorrect should be set as the last middleware, but right before the 404 not found error handler.
It will populate `req.urlBestMatch` with the best match so you can decide what to do with it.
The middleware takes an array of routes to compare then against the request.
```javascript
//some other middlewares...

app.use('/', index);
app.use('/users', users);
app.use('/some/other/route', someOtherView);

app.use(urlMismatch([
    '/',
    '/users',
    '/some/other/route'
]));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found. did you mean to go to ' + req.urlBestMatch + ' ?');
    err.status = 404;
    next(err);
});

// error handler view here...
```

You can also specify to redirect option, to automatically redirect to the bestMatch

```javascript
app.use(urlMismatch({
    routes: [
        '/',
        '/users',
        '/some/other/route'
    ],
    redirect: true
}));
```

var stringSimilarity = require('string-similarity');

module.exports = function(userOptions) {
    var options = Object.assign({
        routes: Array.isArray(userOptions) ? userOptions : [],
        threshold: 0,
        redirect: false
    }, userOptions);

    return function(req, res, next) {
        var matches = stringSimilarity.findBestMatch(req.url, options.routes);
        var meetsThreshold = parseFloat(options.threshold) < parseFloat(matches.bestMatch.rating);

        if (matches && matches.bestMatch && matches.bestMatch.target){
            req.urlBestMatch = matches.bestMatch.target
        }

        if (meetsThreshold && options.redirect && req.urlBestMatch) {
            res.redirect(req.urlBestMatch);
        } else {
            next()
        }
    }
};

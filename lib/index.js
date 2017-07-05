var stringSimilarity = require('string-similarity');

module.exports = function(options) {
    if(Array.isArray(options)){
        options = {
            routes: options
        }
    }
    return function(req, res, next) {
        var matches = stringSimilarity.findBestMatch(req.url, options.routes);
        if(matches && matches.bestMatch && matches.bestMatch.target){
            req.urlBestMatch = matches.bestMatch.target
        }
        if(options.redirect && req.urlBestMatch) {
            res.redirect(req.urlBestMatch);
        } else {
            next()
        }
    }
};

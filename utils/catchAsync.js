module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
};

// executes functions and catches any errors and passes them to next
// next is the last app.use((err, req, res, next)...) in app.js

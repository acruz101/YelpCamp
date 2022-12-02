const {campgroundSchema, reviewSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // store a reference to the url they are requesting
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const result = campgroundSchema.validate(req.body);
    // console.log(result);
    if(result.error) {
        const msg = result.error.details.map((err) => err.message);
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit this campground!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if(result.error) {
        const msg = result.error.details.map((err) => err.message);
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit this review!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
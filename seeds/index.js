const mongoose = require('mongoose');
const Campground = require('../models/campground');

const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const db = mongoose.connection;
db.on('error', err => console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log('Database connected')
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    // deletes everything!!
    await Campground.deleteMany({});
    // const c = new Campground({title: 'Campground Fake'})
    // await c.save();
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
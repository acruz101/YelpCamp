const mongoose = require('mongoose');
const Campground = require('../models/campground');

const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwrza7dr7/image/upload/v1670106137/YelpCamp/dgl29wsiyniecjksdseh.jpg',
                    filename: 'YelpCamp/dgl29wsiyniecjksdseh'
                },
                {
                    url: 'https://res.cloudinary.com/dwrza7dr7/image/upload/v1670106138/YelpCamp/mhy2onw1xj5va0aelkjh.jpg',
                    filename: 'YelpCamp/mhy2onw1xj5va0aelkjh'
                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla consequuntur sapiente quod maxime, optio repellat eum quam libero sint quasi architecto necessitatibus at illum magnam natus repellendus facilis facere quae?',
            price: randomPrice,
            author: '63896d0428a62996ac39353d'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
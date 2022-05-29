const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27000/private-wallet');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Account.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const income = Math.floor(Math.random() * 20) + 1000;
        const ac = new Account({
            // author: '614f36d77958fc1fd789598c',
            // location: `${cities[random1000].city}, ${cities[random1000].state}`,
            // title: `${sample(descriptors)} ${sample(places)}`,
            // //image: 'https://source.unsplash.com/collection/9046579',
            // description: 'NICE',
            // price,
            // geometry: {
            //     type: "Point",
            //     coordinates: [
            //         cities[random1000].longitude,
            //         cities[random1000].latitude,
            //     ]
            // },
            // images: [
            //     {
            //         url: 'https://res.cloudinary.com/dx7wvmidw/image/upload/v1632672696/CAMPSITE/c1rfl9j0kulhlfbzq2je.jpg',
            //         filename: 'CAMPSITE/c1rfl9j0kulhlfbzq2je',
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/dx7wvmidw/image/upload/v1632672696/CAMPSITE/v2xpfrcqrcgvr0tmnnyp.jpg',
            //         filename: 'CAMPSITE/v2xpfrcqrcgvr0tmnnyp',
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/dx7wvmidw/image/upload/v1632672696/CAMPSITE/dnd7vv5mnzitl8eqeiol.jpg',
            //         filename: 'CAMPSITE/dnd7vv5mnzitl8eqeiol',
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/dx7wvmidw/image/upload/v1632672696/CAMPSITE/bzusw1iq1uv0dhbbec0e.jpg',
            //         filename: 'CAMPSITE/bzusw1iq1uv0dhbbec0e',
            //     }
            // ],
        })
        await ac.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})
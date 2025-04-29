require('dotenv').config();
const mongoose = require('mongoose');
const Apartment = require('./models/apartment');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected for seeding');
        return Apartment.insertMany(apartmentData);
    })
    .then(() => {
        console.log('Apartments seeded successfully');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error seeding apartments:', error);
        mongoose.connection.close();
    });

const apartmentData = [
  {
    name: "University Crossing Apartments",
    distanceToUniversity: 0.1,
    transportation: "No",
    petPolicy: "No",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1544, 1639] },
      { type: "Two Bedroom", available: true, rent: [969, 1029] },
      { type: "Four Bedroom", available: true, rent: [839, 909] }
    ]
  },
  {
    name: "Rush Student Living",
    distanceToUniversity: 0.6,
    transportation: "No",
    petPolicy: "Yes ($35/month + $400 fee)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1700] },
      { type: "Two Bedroom", available: true, rent: [1090, 1145] },
      { type: "Four Bedroom", available: true, rent: [920, 1005] },
      { type: "Five Bedroom", available: true, rent: [910] }
    ]
  },
  {
    name: "University Walk Charlotte",
    distanceToUniversity: 0.5,
    transportation: "No",
    petPolicy: "No",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "Four Bedroom", available: true, rent: [949] }
    ]
  },
  {
    name: "The Mill",
    distanceToUniversity: 0.3,
    transportation: "No",
    petPolicy: "Yes ($350 one-time + $20/month)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "Two Bedroom", available: true, rent: [857] },
      { type: "Three Bedroom", available: true, rent: [801] },
      { type: "Four Bedroom", available: true, rent: [768] }
    ]
  },
  {
    name: "Arcadia Student Living",
    distanceToUniversity: 1.4,
    transportation: "No",
    petPolicy: "No",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1570, 1650] },
      { type: "Two Bedroom", available: true, rent: [1090, 1153] },
      { type: "Three Bedroom", available: true, rent: [990, 1015] },
      { type: "Four Bedroom", available: true, rent: [820, 925] },
      { type: "Five Bedroom", available: true, rent: [800, 930] }
    ]
  },
  {
    name: "University Townhomes at Charlotte",
    distanceToUniversity: 0.8,
    transportation: "No",
    petPolicy: "Yes ($400-$600 + $35/month)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "Three Bedroom", available: true, rent: [659, 799] },
      { type: "Four Bedroom", available: true, rent: [499, 569] }
    ]
  },
  {
    name: "Boulevard 98",
    distanceToUniversity: 0.4,
    transportation: "No",
    petPolicy: "Yes ($250 Fee)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [959, 1139] },
      { type: "Two Bedroom", available: true, rent: [669, 699] },
      { type: "Three Bedroom", available: true, rent: [799] },
      { type: "Four Bedroom", available: true, rent: [579, 619] },
      { type: "Five Bedroom", available: true, rent: [809] }
    ]
  },
  {
    name: "The Union",
    distanceToUniversity: 0.0,
    transportation: "No",
    petPolicy: "No",
    amenities: ["Gym", "Pool", "Study Rooms", "+ more"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1213] },
      { type: "Two Bedroom", available: true, rent: [879] },
      { type: "Three Bedroom", available: true, rent: [740, 824] }
    ]
  },
  {
    name: "Walden Station Student Apartments",
    distanceToUniversity: 0.8,
    transportation: "No",
    petPolicy: "Yes ($300 Fee)",
    amenities: ["Gym", "Pool", "Study Rooms", "+ more"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1208, 1260] },
      { type: "Two Bedroom", available: true, rent: [876] },
      { type: "Three Bedroom", available: true, rent: [800] }
    ]
  },
  {
    name: "The Edge Apartments",
    distanceToUniversity: 0.0,
    transportation: "No",
    petPolicy: "No",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "Four Bedroom", available: true, rent: [734] }
    ]
  },
  {
    name: "East Village",
    distanceToUniversity: 0.0,
    transportation: "No",
    petPolicy: "Yes ($350 Fee + $35 Monthly)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1210, 1419] },
      { type: "Two Bedroom", available: true, rent: [925, 970] },
      { type: "Three Bedroom", available: true, rent: [875] },
      { type: "Four Bedroom", available: true, rent: [725, 795] }
    ]
  },
  {
    name: "Junction 49",
    distanceToUniversity: 1.7,
    transportation: "No",
    petPolicy: "Yes ($300 Fee + $30 Monthly)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1649, 1859] },
      { type: "Two Bedroom", available: true, rent: [1019, 1203] },
      { type: "Three Bedroom", available: true, rent: [959, 1063] },
      { type: "Four Bedroom", available: true, rent: [799, 956] },
      { type: "Five Bedroom", available: true, rent: [759, 999] }
    ]
  },
  {
    name: "Yugo Charlotte College Downs",
    distanceToUniversity: 1.4,
    transportation: "No",
    petPolicy: "No",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "Two Bedroom", available: true, rent: [939, 949] },
      { type: "Four Bedroom", available: true, rent: [839, 859] }
    ]
  },
  {
    name: "Millennium One",
    distanceToUniversity: 0.5,
    transportation: "No",
    petPolicy: "Yes ($350 Fee + $35 Monthly)",
    amenities: ["Gym", "Pool", "Study Rooms"],
    bedrooms: [
      { type: "One Bedroom", available: true, rent: [1455] },
      { type: "Two Bedroom", available: true, rent: [979] },
      { type: "Four Bedroom", available: true, rent: [730, 779] }
    ]
  },
  {
    name: "Latitude 49",
    distanceToUniversity: 2.2,
    transportation: "No",
    petPolicy: "Yes ($25 Monthly + $50 Fee)",
    amenities: ["Gym", "Pool", "Study Rooms", "+ more"],
    bedrooms: [
      { type: "Two Bedroom", available: true, rent: [799] },
      { type: "Four Bedroom", available: true, rent: [549] }
    ]
  }
];

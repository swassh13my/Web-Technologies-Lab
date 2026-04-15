const { MongoClient } = require('mongodb');

async function runVehicleSystem() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // 1. Create and Select Database
        const db = client.db('vehicles');

        // 2. Display all databases
        const admin = client.db().admin();
        const dbs = await admin.listDatabases();
        console.log("Available Databases:", dbs.databases.map(d => d.name));

        // 3. Create collections (Two Wheelers is Capped)
        // size: 5000 bytes, max: 100 documents
        await db.createCollection('two_wheelers', { capped: true, size: 5000, max: 100 });
        await db.createCollection('four_wheelers');

        const twoWheelers = db.collection('two_wheelers');
        const fourWheelers = db.collection('four_wheelers');

        // 4. Add 5 Two-Wheelers
        await twoWheelers.insertMany([
            { bike_name: "CBR250", model: "gear", category: "200cc", colors_available: ["red", "black"], manufacturer: "Honda", performance: 9, timestamp: new Date("2023-05-10"), price: 180000 },
            { bike_name: "Activa 6G", model: "gearless", category: "125cc", colors_available: ["blue", "grey"], manufacturer: "Honda", performance: 7, timestamp: new Date("2022-10-15"), price: 85000 },
            { bike_name: "Pulsar 150", model: "gear", category: "150cc", colors_available: ["black", "blue"], manufacturer: "Bajaj", performance: 8, timestamp: new Date("2021-01-20"), price: 110000 },
            { bike_name: "Splendor Plus", model: "gear", category: "100cc", colors_available: ["silver", "red"], manufacturer: "Hero", performance: 6, timestamp: new Date("2023-03-05"), price: 75000 },
            { bike_name: "Duke 200", model: "gear", category: "200cc", colors_available: ["orange", "white"], manufacturer: "KTM", performance: 10, timestamp: new Date("2024-01-01"), price: 210000 }
        ]);

        // 5. Add 5 Four-Wheelers
        await four_wheelers.insertMany([
            { vehicle_name: "Swift", model: "own", category: "car", variants: ["vxi", "zxi", "petrol"], manufacturer: "Maruti", performance: 8, timestamp: new Date("2023-06-12"), price: 700000 },
            { vehicle_name: "Eicher Pro", model: "commercial", category: "heavy truck", variants: ["diesel"], manufacturer: "Eicher", performance: 7, timestamp: new Date("2022-08-20"), price: 2500000 },
            { vehicle_name: "Traveler", model: "commercial", category: "bus", variants: ["diesel", "petrol"], manufacturer: "Force", performance: 6, timestamp: new Date("2021-12-30"), price: 1500000 },
            { vehicle_name: "Thar", model: "own", category: "car", variants: ["diesel", "petrol", "4x4"], manufacturer: "Mahindra", performance: 9, timestamp: new Date("2024-02-14"), price: 1600000 },
            { vehicle_name: "Ace Gold", model: "commercial", category: "mini truck", variants: ["diesel", "cng"], manufacturer: "Tata", performance: 7, timestamp: new Date("2023-09-10"), price: 500000 }
        ]);

        // 6. Display all documents in both
        console.log("Two Wheelers:", await twoWheelers.find().toArray());
        console.log("Four Wheelers:", await fourWheelers.find().toArray());

        // 7. Display only vehicle name and price
        console.log("Name & Price (Two Wheelers):", await twoWheelers.find({}, { projection: { bike_name: 1, price: 1, _id: 0 } }).toArray());
        console.log("Name & Price (Four Wheelers):", await fourWheelers.find({}, { projection: { vehicle_name: 1, price: 1, _id: 0 } }).toArray());

        // 8. Two Wheelers from a particular company (e.g., Honda)
        console.log("Honda Bikes:", await twoWheelers.find({ manufacturer: "Honda" }).toArray());

        // 9. Four Wheelers available in diesel variants
        console.log("Diesel Vehicles:", await fourWheelers.find({ variants: "diesel" }).toArray());

        // 10. Rating > 5
        const highRatedQuery = { performance: { $gt: 5 } };
        const projection = { vehicle_name: 1, bike_name: 1, category: 1, manufacturer: 1, _id: 0 };
        console.log("High Rated Two Wheelers:", await twoWheelers.find(highRatedQuery, { projection }).toArray());
        console.log("High Rated Four Wheelers:", await fourWheelers.find(highRatedQuery, { projection }).toArray());

    } finally {
        await client.close();
    }
}
runVehicleSystem().catch(console.dir);
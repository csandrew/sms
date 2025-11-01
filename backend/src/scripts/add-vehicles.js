import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Vehicle from '../models/Vehicle.js';
import RentalCenter from '../models/RentalCenter.js';
import User from '../models/User.js';

// Load env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const addVehicles = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-mobility');
    console.log('Connected to MongoDB');

    // Create an owner first
    const owner = await User.create({
      name: 'Test Owner',
      email: 'owner@test.com',
      password: 'test123',
      phone: '1234567890',
      role: 'owner'
    });
    console.log('Created owner:', owner._id);

    // Create a rental center
    const center = await RentalCenter.create({
      name: 'Main Station',
      location: 'Downtown Area',
      capacity: 20,
      gpsCoordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    });
    console.log('Created rental center:', center._id);

    // Sample vehicles to add
    const vehicles = [
      {
        owner: owner._id,
        type: 'scooter',
        make: 'Xiaomi',
        model: 'Pro 2',
        licensePlate: 'SC001',
        pricePerMinute: 0.25,
        batteryLevel: 100,
        status: 'available',
        isApproved: true,
        rentalCenter: center._id,
        features: ['LED Lights', 'Cruise Control'],
        description: 'Fast electric scooter with long range'
      },
      {
        owner: owner._id,
        type: 'bike',
        make: 'Trek',
        model: 'FX 2',
        licensePlate: 'BK001',
        pricePerMinute: 0.20,
        batteryLevel: 100,
        status: 'available',
        isApproved: true,
        rentalCenter: center._id,
        features: ['Basket', '7-Speed'],
        description: 'Comfortable city bike'
      },
      {
        owner: owner._id,
        type: 'scooter',
        make: 'Segway',
        model: 'Ninebot Max',
        licensePlate: 'SC002',
        pricePerMinute: 0.30,
        batteryLevel: 95,
        status: 'available',
        isApproved: true,
        rentalCenter: center._id,
        features: ['Waterproof', 'App Control'],
        description: 'Premium electric scooter'
      }
    ];

    // Insert vehicles
    const result = await Vehicle.insertMany(vehicles);
    console.log('Added vehicles:', result.length);
    console.log('Vehicle IDs:', result.map(v => v._id));

    // Close connection
    await mongoose.connection.close();
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the script
addVehicles();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from '../models/User.js';
import RentalCenter from '../models/RentalCenter.js';
import Vehicle from '../models/Vehicle.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-mobility';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clean up old data
  await User.deleteMany({});
  await RentalCenter.deleteMany({});
  await Vehicle.deleteMany({});

  // Create rental center
  const center = await RentalCenter.create({
    name: 'Central Hub',
    location: '100 Main St',
    capacity: 50,
    gpsCoordinates: { latitude: 40.7128, longitude: -74.0060 }
  });

  // Create users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push(await User.create({
      name: `Rider ${i}`,
      email: `rider${i}@test.com`,
      password: 'test123',
      phone: `100000000${i}`,
      role: 'rider'
    }));
  }
  for (let i = 1; i <= 10; i++) {
    users.push(await User.create({
      name: `Owner ${i}`,
      email: `owner${i}@test.com`,
      password: 'test123',
      phone: `200000000${i}`,
      role: 'owner'
    }));
  }

  // Assign vehicles to owners
  const owners = users.filter(u => u.role === 'owner');
  let vehicleCount = 1;
  for (const owner of owners) {
    for (let v = 0; v < 2; v++) {
      await Vehicle.create({
        owner: owner._id,
        type: v % 2 === 0 ? 'scooter' : 'bike',
        make: v % 2 === 0 ? 'Xiaomi' : 'Trek',
        model: v % 2 === 0 ? `Pro ${vehicleCount}` : `FX ${vehicleCount}`,
        licensePlate: `V${vehicleCount.toString().padStart(3, '0')}`,
        pricePerMinute: 0.2 + 0.05 * v,
        batteryLevel: 100,
        status: 'available',
        isApproved: true,
        rentalCenter: center._id,
        features: v % 2 === 0 ? ['LED Lights', 'Cruise Control'] : ['Basket', '7-Speed'],
        description: v % 2 === 0 ? 'Fast electric scooter' : 'Comfortable city bike'
      });
      vehicleCount++;
    }
  }

  console.log('Seeded 20 users and 20 vehicles.');
  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(e => { console.error(e); process.exit(1); });

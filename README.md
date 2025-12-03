# SmartMobility - Electric Vehicle Sharing Platform

A modern vehicle sharing platform that enables users to rent electric scooters and bikes, while allowing vehicle owners to earn passive income by sharing their vehicles.

https://smartmobilitys.vercel.app/

## Features

### For Riders
- Browse available vehicles
- Start and track rides
- View rental history
- Manage wallet balance
- Real-time vehicle tracking

### For Owners
- List vehicles for rent
- Track earnings
- Monitor vehicle status
- Manage rental settings
- View rental history

### Core Features
- User authentication (JWT-based)
- Role-based access (Rider, Owner, Admin)
- Real-time availability updates
- Secure payment processing
- GPS tracking integration

## Tech Stack

### Frontend
- Next.js 16.0.0
- React 19.2.0
- TailwindCSS for styling
- Shadcn/ui components
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

## Project Structure

```
├── app/                    # Next.js pages and routing
│   ├── login/             # Authentication pages
│   ├── register/          # User registration
│   ├── rider/             # Rider dashboard
│   └── owner/             # Owner dashboard
├── backend/               # Backend API server
│   ├── src/
│   │   ├── controllers/   # API route handlers
│   │   ├── middleware/    # Auth & validation middleware
│   │   ├── models/       # MongoDB schemas
│   │   └── routes/       # API route definitions
├── components/            # Reusable React components
└── public/               # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or pnpm

### Environment Setup

1. Clone the repository
\`\`\`bash
git clone [repository-url]
cd [project-name]
\`\`\`

2. Install dependencies
\`\`\`bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
\`\`\`

3. Set up environment variables

Create \`.env\` file in the backend directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/smart-mobility
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
PORT=5000
\`\`\`

Create \`.env.local\` file in the root directory:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

### Running the Application

1. Start the backend server
\`\`\`bash
cd backend
npm start
\`\`\`

2. Start the frontend development server
\`\`\`bash
# In the root directory
npm run dev
\`\`\`

3. Access the application at \`http://localhost:3000\`

### Adding Test Data

Run the provided script to add sample vehicles:
\`\`\`bash
cd backend
node src/scripts/add-vehicles.js
\`\`\`

This will create:
- A test owner account (owner@test.com / test123)
- A rental center
- Three sample vehicles (2 scooters, 1 bike)

## Testing the Application

### Test Accounts

1. Owner Account:
   - Email: owner@test.com
   - Password: test123

2. Create a Rider Account:
   - Click "Get Started as Rider" on the homepage
   - Fill in the registration form
   - Login with your credentials

### Testing Flows

1. Rider Flow:
   - Login as a rider
   - Browse available vehicles
   - Click "Start Ride" on any vehicle
   - Track your active ride
   - End ride when finished

2. Owner Flow:
   - Login with owner@test.com
   - View your listed vehicles
   - Monitor rental status
   - Track earnings

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user

### Vehicles
- GET /api/vehicles - List all vehicles
- POST /api/vehicles - Add new vehicle (Owner only)
- GET /api/vehicles/owner/my-vehicles - Get owner's vehicles

### Rentals
- POST /api/rentals/start - Start a rental
- POST /api/rentals/end - End rental
- GET /api/rentals/rider/history - Get rider's rental history
- GET /api/rentals/owner/history - Get owner's rental history

### Transactions
- GET /api/transactions - Get user transactions
- POST /api/transactions/wallet/topup - Top up wallet
- GET /api/transactions/wallet/balance - Get wallet balance

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Security

- All API endpoints are protected with JWT authentication
- Passwords are hashed using bcrypt
- CORS is configured for security
- Environment variables are used for sensitive data

## Future Improvements

1. Real-time notifications
2. Payment gateway integration
3. Mobile app development
4. Admin dashboard
5. Advanced analytics
6. Maintenance scheduling
7. Rating and review system
8. Social sharing features

## License

This project is licensed under the MIT License - see the LICENSE file for details.
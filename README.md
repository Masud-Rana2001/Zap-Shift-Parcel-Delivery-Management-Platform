# Zap-Shift – Parcel Delivery Management Platform

A comprehensive role-based parcel delivery system with secure authentication and distinct workflows for Users, Admins, and Riders, enabling seamless logistics operations across Bangladesh.

## 🚀 Live Demo & Repository

- **Live Site:** [Zap-Shift](https://zap-shift.web.app)
- **GitHub:** [Zap-Shift Repository](https://github.com/yourusername/zap-shift)

## ✨ Key Features

- **Role-based Dashboards** – Distinct interfaces for User, Admin, and Rider with tailored functionality
- **Dynamic Parcel Booking** – Automated pricing based on weight, type, and location
- **Real-time Tracking** – Live parcel status updates with OTP-based secure delivery confirmation
- **Payment Integration** – Stripe integration with transaction history and tracking ID generation
- **Admin Delivery Management** – Rider assignment and automated status workflow
- **Rider Earnings System** – Per-delivery commission tracking (৳20 per delivery)
- **Nationwide Coverage** – Support for 64 districts with inter-district routing
- **Responsive Design** – Mobile-friendly interface with seamless user experience

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, DaisyUI
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication
- **Payment:** Stripe
- **Charts & Visualization:** Recharts
- **HTTP Client:** Axios
- **State Management:** React Query (@tanstack/react-query)
- **Animations:** Framer Motion
- **UI Components:** Lucide React, React Icons
- **Deployment:** Firebase Hosting, Vercel

## 📋 User Roles & Responsibilities

### 👤 User
- Create and submit parcels with accurate details
- Make payments based on dynamic pricing
- Track parcels in real-time
- Review service after delivery

### 🛠️ Admin
- Manage and approve/reject riders
- Assign pickup and delivery riders
- Monitor parcel movement and operations
- Oversee inter-district routing

### 🚚 Rider
- Collect parcels from users
- Update transit status
- Deliver parcels to customers
- Confirm delivery with OTP verification

## 📦 Parcel Statuses

- Unpaid
- Paid
- Ready-to-Pickup
- In-Transit
- Reached-Service-Center
- Shipped
- Ready-for-Delivery
- Delivered

## 💰 Pricing Structure

| Parcel Type | Weight | Within City | Outside City |
|-------------|--------|-------------|--------------|
| Document | Any | ৳60 | ৳80 |
| Non-Document | Up to 3kg | ৳110 | ৳150 |
| Non-Document | >3kg | +৳40/kg | +৳40/kg +৳40 |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zap-shift.git
   cd Zap-shift-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_API_URL=your_backend_api_url
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Zap-shift-client/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── context/         # React context for state management
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── layout/          # Layout components
│   ├── pages/           # Page components
│   ├── provider/        # Context providers
│   ├── routes/          # Route definitions
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Public assets
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## 🔐 Authentication

The application uses Firebase Authentication with role-based access control:
- Users can register and log in
- Admins have elevated privileges
- Riders have specific delivery-related permissions

## 💳 Payment Integration

Stripe is integrated for secure payment processing:
- Users can pay for parcel delivery
- Payment history is tracked
- Transaction records are maintained

## 📊 Dashboard Features

### User Dashboard
- Parcel statistics (unpaid, paid, delivered, etc.)
- Pie chart visualization of parcel statuses
- Quick access to add parcels, track, and manage payments

### Admin Dashboard
- System statistics (customers, riders, deliveries, earnings)
- Service center performance charts
- Payment history and rider management

### Rider Dashboard
- Current tasks and assignments
- Earnings tracking
- Parcel pickup and delivery management

## 🧪 Testing

Run linting to check code quality:
```bash
npm run lint
```

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

[Your Name]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please contact [your-email@example.com] or open an issue on GitHub.

---

**Built with ❤️ for seamless parcel delivery management**

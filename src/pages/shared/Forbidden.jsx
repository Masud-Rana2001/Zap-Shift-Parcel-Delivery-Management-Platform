import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        {/* Icon */}
        <div className="w-40 h-40 flex items-center justify-center bg-pink-50 rounded-full mb-6">
          <span className="text-5xl text-pink-500">🔒</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          You Are Forbidden to Access This Page
        </h1>

        {/* Sub Text */}
        <p className="text-gray-600 mb-8">
          Please contact the administrator if you believe this is an error.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-lime-400 text-black rounded-2xl font-semibold shadow hover:bg-lime-500"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 bg-emerald-900 text-white rounded-2xl font-semibold shadow hover:bg-emerald-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

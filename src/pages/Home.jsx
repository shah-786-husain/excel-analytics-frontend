import { Link } from "react-router-dom";
import { Upload, BarChart3, Brain, History } from "lucide-react";
import Footer from "../components/Footer";
import ExtraContent from "../components/ExtraContent";
import Content from "../components/Content";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Excel Analytics Platform
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Upload Excel files, explore your data with interactive 2D & 3D charts,
          and unlock . All your analysis history in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white shadow-inner rounded-t-3xl ">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {/* Feature 1 */}
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-md hover:shadow-xl transition">
            <Upload className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excel Upload</h3>
            <p className="text-gray-600 text-sm">
              Upload any <code>.xls</code> or <code>.xlsx</code> file with ease
              using our secure uploader.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-md hover:shadow-xl transition">
            <BarChart3 className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Charts</h3>
            <p className="text-gray-600 text-sm">
              Visualize your data with dynamic 2D and 3D charts powered by
              Chart.js and Three.js.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md hover:shadow-xl transition">
            <History className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">History Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Track your uploaded files and analysis history anytime in your
              dashboard.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md hover:shadow-xl transition">
            <Brain className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
            <p className="text-gray-600 text-sm">
              Get smart summaries and recommendations from your data using AI
              integrations.
            </p>
          </div>
        </div>
      </section>

      <div>
        <ExtraContent />
      </div>
      <div>
        <Content />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

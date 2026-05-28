import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-4">
        🚀 AI Learning Platform
      </h1>

      <p className="text-center text-gray-300 mb-10 text-lg">
        Smart AI tools for students
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/chatbot">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-3">🤖 AI Chatbot</h2>

            <p className="text-gray-300">
              Ask anything and get AI-powered answers instantly.
            </p>
          </div>
        </Link>

        <Link to="/chatbot">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-3">📚 Study Planner</h2>

            <p className="text-gray-300">
              Generate smart study schedules using AI.
            </p>
          </div>
        </Link>

        <Link to="/chatbot">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-3">🧠 Quiz Generator</h2>

            <p className="text-gray-300">
              Create quizzes and practice questions instantly.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

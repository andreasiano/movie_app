import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-landing-bg">
      <h1 className="text-5xl font-bold text-white mb-6">Unlimited movies, TV shows, and more.</h1>
      <p className="text-2xl text-white mb-6">Watch anywhere. Cancel anytime.</p>
      <p className="text-xl text-white mb-8">Ready to watch? Enter your email to create or restart your membership.</p>
      <div className="flex space-x-4">
        <button 
          onClick={handleSignIn} 
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
        >
          Sign In
        </button>
        <button 
          onClick={handleSignUp} 
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}




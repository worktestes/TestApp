import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-blue-800">
            Welcome to Test
          </h1>
          <p className="mt-2 text-center text-sm text-blue-600">
            Test of how authentication is done with Supabase and its magic link
          </p>
        </div>
        
      </div>
    </div>
  );
}

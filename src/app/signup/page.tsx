import { AuthForm } from '@/components/auth/AuthForm';

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <AuthForm mode="signup" />
    </div>
  );
}

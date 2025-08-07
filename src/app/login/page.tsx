import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <AuthForm mode="login" />
    </div>
  );
}

import ForgotPasswordForm from "@/components/forgot-password-form";
import Logo from "@/components/shared/Logo";

const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <div className="ml-24 mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="text-gray-500">
            Enter your email and we will send you a reset link
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

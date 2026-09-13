import ResetPasswordForm from "@/components/reset-password-form";
import Logo from "@/components/shared/Logo";
import Link from "next/link";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) => {
  const params = (await searchParams) || {};
  const token = params.token;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <div className="ml-24 mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold">Reset password</h1>
          <p className="text-gray-500">Choose a new password for your account</p>
        </div>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <p className="text-center text-sm text-gray-500">
            This reset link is invalid or incomplete.{" "}
            <Link href="/forgot-password" className="font-bold hover:underline">
              Request a new one
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;

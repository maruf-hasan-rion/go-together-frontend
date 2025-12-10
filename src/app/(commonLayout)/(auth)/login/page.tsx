import LoginForm from "@/components/login-form";
import Logo from "@/components/shared/Logo";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
   const params = (await searchParams) || {};
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <div className="ml-24 mb-4">
            <Logo></Logo>
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">
            Login to your account to continue
          </p>
        </div>
        <LoginForm redirect={params.redirect}/>
      </div>
    </div>
  );
};

export default LoginPage;

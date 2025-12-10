import RegisterForm from "@/components/register-form";
import Logo from "@/components/shared/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center ">
                <div className="mb-4 flex justify-center ">
                  <Logo></Logo>
                </div>
                Create an account
              </CardTitle>
              <CardDescription className="text-center text-md">
               Start finding activity companions today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

export const dynamic = "force-dynamic";
export const revalidate = 0;


import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) return null;
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;

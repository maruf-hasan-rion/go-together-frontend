import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <PublicNavbar/>
           <div className="min-h-screen">
             {children}
           </div>
            <PublicFooter/>
        </>
    );
};

export default CommonLayout;
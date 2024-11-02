'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { userauth } from '../config/firebaseConfig';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '../components/AppSidebar';
import { Skeleton } from "@/components/ui/skeleton"
import { LucideMessageSquareWarning } from 'lucide-react';

function layoutDashboard({ children }: { children: any }) {
  const [user, loading, error] = useAuthState(userauth);

  if (loading) {
    //sidebar
    return (
      <section>
          <div className="flex flex-col space-y-3 loader-cont">
            <Skeleton className="h-[250px] w-[250px] rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <span className="loadingtxt"><strong>LOADING...</strong></span>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: Error </p>
      </div>
    );
  }

  if (user) {
    //sidebar
    return (
      <SidebarProvider>
        <AppSidebar />
        <section>
          <SidebarTrigger />
          {children}
        </section>
      </SidebarProvider>
    );
  }
  return (
    <section className="not-found-container">
      <span className="warnsign">
        <LucideMessageSquareWarning width={150} height={150}/>
        <strong>Oops... Sorry you can't access this page,<br/> Please contact Administrator</strong>
      </span>
    </section>
  )
}

export default layoutDashboard

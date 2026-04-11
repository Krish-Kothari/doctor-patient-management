"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Users, 
  UserPlus, 
  LayoutDashboard, 
  LogOut, 
  Stethoscope,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-blue-600",
  },
  {
    label: 'Patients',
    icon: Users,
    href: '/patients',
    color: "text-blue-600",
  },
  {
    label: 'Add Patient',
    icon: UserPlus,
    href: '/patients/new',
    color: "text-blue-600",
  },
];

interface NavContentProps {
  pathname: string
  onLinkClick: () => void
  onLogout: () => void
}

function NavContent({ pathname, onLinkClick, onLogout }: NavContentProps) {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-r border-slate-200">
      <div className="px-6 py-2 flex items-center gap-2">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Stethoscope className="text-white h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          MedRecord
        </h1>
      </div>
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-slate-50 rounded-lg transition",
                pathname === route.href ? "text-blue-600 bg-blue-50" : "text-slate-500",
              )}
              onClick={onLinkClick}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 mt-auto">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
        <NavContent
          pathname={pathname}
          onLinkClick={() => setIsOpen(false)}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden flex h-16 items-center px-4 border-b border-slate-200 bg-white fixed inset-x-0 top-0 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <NavContent
              pathname={pathname}
              onLinkClick={() => setIsOpen(false)}
              onLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2 ml-2">
          <div className="h-7 w-7 bg-blue-600 rounded flex items-center justify-center">
            <Stethoscope className="text-white h-4 w-4" />
          </div>
          <span className="font-bold text-slate-900">MedRecord</span>
        </div>
      </div>
    </>
  );
}

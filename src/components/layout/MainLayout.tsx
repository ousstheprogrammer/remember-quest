
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Plus, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  icon: React.ElementType;
  path: string;
  label: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, path, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={path}
      className="group flex flex-col items-center justify-center py-3 px-5"
      aria-label={label}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ease-in-out",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={cn(
          "mt-1 text-xs font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </Link>
  );
};

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">StudyMinder</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 pb-20 pt-6 sm:px-6 md:px-8 lg:px-10">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center border-t border-border/50 bg-background/80 px-4 pb-6 pt-2 backdrop-blur-md sm:px-6">
        <div className="flex max-w-sm items-center justify-between rounded-full bg-white px-2 py-1 shadow-soft">
          <NavItem
            icon={Home}
            path="/"
            label="Home"
            isActive={currentPath === "/"}
          />
          <Link to="/add">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
              <Plus className="h-6 w-6" />
            </div>
          </Link>
          <NavItem
            icon={BookOpen}
            path="/dashboard"
            label="Tasks"
            isActive={currentPath === "/dashboard"}
          />
        </div>
      </div>
    </div>
  );
}

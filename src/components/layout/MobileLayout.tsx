
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Users, UserCircle, MessageCircle } from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
};

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col items-center justify-center px-2
        ${isActive 
          ? 'text-tripplin-purple after:content-[""] after:w-1/2 after:h-1 after:bg-tripplin-purple after:rounded-full' 
          : 'text-muted-foreground'}
      `}
    >
      <Icon size={24} />
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* App Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>

      {/* Mobile Navigation - Increased z-index and ensured it's fixed at the bottom */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex justify-around items-center px-2 glass-card z-50">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/community" icon={Users} label="Community" />
        <NavItem to="/messages" icon={MessageCircle} label="Messages" />
        <NavItem to="/profile" icon={UserCircle} label="Profile" />
      </nav>
    </div>
  );
};

export default MobileLayout;

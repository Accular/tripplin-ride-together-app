
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MobileLayout from "./components/layout/MobileLayout";
import Index from "./pages/Index";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MobileLayout>
              <Index />
            </MobileLayout>
          } />
          <Route path="/plan" element={
            <Navigate to="/" replace />
          } />
          <Route path="/community" element={
            <MobileLayout>
              <Community />
            </MobileLayout>
          } />
          <Route path="/messages" element={
            <MobileLayout>
              <Messages />
            </MobileLayout>
          } />
          <Route path="/profile" element={
            <MobileLayout>
              <Profile />
            </MobileLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Templates from "./pages/Templates";
import MyCVs from "./pages/MyCVs";
import Builder from "./pages/Builder";
import CVAnalysis from "./pages/CVAnalysis";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { BottomNav } from "./components/navigation/BottomNav";
import { FloatingActionButton } from "./components/navigation/FloatingActionButton";
import { OnboardingTour } from "./components/feedback/OnboardingTour";

const queryClient = new QueryClient();

// Inicializar tema dark como padrão
const initTheme = () => {
  const stored = localStorage.getItem('meucv_theme');
  if (!stored) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('meucv_theme', 'dark');
  } else {
    document.documentElement.classList.add(stored);
  }
};

initTheme();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OnboardingTour />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/my-cvs" element={<MyCVs />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/cv-analysis" element={<CVAnalysis />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
          <FloatingActionButton />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

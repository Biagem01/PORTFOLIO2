import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { motion } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/projects" component={AllProjects} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <CustomCursor />

          {/* Loader prima di tutto */}
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

          {/* Tutto il resto viene montato solo dopo il loader */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Router />
              <Toaster />
              <Sonner />
            </motion.div>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

import { Switch, Route, useLocation } from "wouter";
import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";


import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

/* -------------------- ROUTER -------------------- */

function Router() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/projects" component={AllProjects} />
      <Route path="/project/:id" component={ProjectPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

/* -------------------- SCROLL RESET -------------------- */

function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    // forza sempre scroll top quando cambia route
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

/* -------------------- APP -------------------- */

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <TooltipProvider>
          <CustomCursor />

          {isLoading && (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          )}

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* 🔥 Scroll reset globale */}
              <ScrollToTop />

              
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
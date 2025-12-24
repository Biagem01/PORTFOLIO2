import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectPage from "./pages/ProjectPage";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/projects" component={AllProjects} />
      <Route path="/project/:slug" component={ProjectPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);


 

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <TooltipProvider>
          {!isLoading && <CustomCursor />}

          {isLoading && (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          )}

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ScrollIndicator />
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

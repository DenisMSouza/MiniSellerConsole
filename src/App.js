import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SimulationConfigProvider } from "./contexts/SimulationConfigContext";
import Layout from "./components/Layout";
import LeadsPage from "./pages/LeadsPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import EmptyStateTest from "./components/EmptyStateTest";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <SimulationConfigProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LeadsPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/test-empty" element={<EmptyStateTest />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </SimulationConfigProvider>
  );
}

export default App;

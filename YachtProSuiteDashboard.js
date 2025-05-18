
import { useState, useEffect } from "react";

export default function YachtProSuiteDashboard() {
  const [state, setState] = useState({});

  const fields = [
    "entertainmentPlan", "fuelLog", "guestFeedback", "hygieneProtocols",
    "incidentLog", "insuranceInfo", "toyChecklist", "galleyInventory",
    "legalNotes", "maintenanceNotes", "navigationPlan", "techSecurity",
    "provisioningList", "qaReviews", "roiTracking", "sustainabilityLog",
    "teamNotes", "uniformsInfo", "voyageRecords", "waterSystem",
    "xFactor", "appSuite", "zenithPlan"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("yachtProSuiteData");
    if (saved) setState(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("yachtProSuiteData", JSON.stringify(state));
  }, [state]);

  const handleChange = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "YachtProSuite_Report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = async () => {
    const content = Object.entries(state).map(([key, value]) => `${key.toUpperCase()}\n${value}\n\n`).join("");
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "YachtProSuite_Report.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>YachtProSuite A–Z Dashboard</h1>
      {fields.map((key) => (
        <div key={key} style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20 }}>{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</h2>
          <textarea
            value={state[key] || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={`Enter details for ${key}`}
            style={{ width: "100%", height: 100 }}
          />
        </div>
      ))}
      <button onClick={handleExport} style={{ marginRight: 10 }}>Export JSON Report</button>
      <button onClick={handleExportPDF}>Export PDF Report</button>
    </div>
  );
}

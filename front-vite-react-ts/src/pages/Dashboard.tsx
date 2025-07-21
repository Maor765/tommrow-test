import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import AlertsPage from "./AlertsPage";
import HomePage from "./HomePage";
import StatePage from "./StatePage";

type PageName = "home" | "alerts" | "state";

export default function Dashboard() {
  const [page, setPage] = useState<PageName>("home");

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        setPage("home");
      },
    },
    {
      label: "Alerts",
      icon: "pi pi-envelope",
      command: () => {
        setPage("alerts");
      },
    },
    {
      label: "State",
      icon: "pi pi-star",
      command: () => {
        setPage("state");
      },
    },
  ];

  return (
    <>
      <div className="card">
        <Menubar model={items} />
      </div>
      {page === "home" && <HomePage />}
      {page === "alerts" && <AlertsPage />}
      {page === "state" && <StatePage />}
    </>
  );
}

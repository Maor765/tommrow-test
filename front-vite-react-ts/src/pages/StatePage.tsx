import { useEffect, useState } from "react";
import type { WeatherAlert } from "../types/weatherAlert";
import { getWeatherAlerts } from "../services/weatherAlertService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function StatePage() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  const fetchAlerts = () => {
    getWeatherAlerts()
      .then((data) =>
        setAlerts(data.filter((alert) => alert.state === "triggered"))
      )
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold p-6">State Page</h1>
      {!alerts.length && <div className="p-6">All Clear status.</div>}
      {alerts.length > 0 && (
        <div className="card">
          <DataTable value={alerts} tableStyle={{ minWidth: "50rem" }}>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="state" header="State"></Column>
            <Column field="createdAt" header="CreatedAt"></Column>
            <Column field="condition.parameter" header="parameter"></Column>
            <Column field="condition.operator" header="operator"></Column>
            <Column field="condition.value" header="value"></Column>
            <Column field="location.lat" header="lat"></Column>
            <Column field="location.lon" header="lon"></Column>
            <Column field="location.city" header="city"></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
}

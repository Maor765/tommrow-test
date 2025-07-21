import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import {
  createWeatherAlert,
  getWeatherAlerts,
} from "../services/weatherAlertService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { WeatherAlert } from "../types/weatherAlert";

export type WeatherAlertFormValues = {
  name?: string;
  description?: string;
  condition: {
    parameter: "temperature" | "windSpeed" | "precipitation";
    operator: ">" | "<" | ">=" | "<=" | "==";
    value: number;
  };
  location: {
    lat: number;
    lon: number;
    city?: string;
  };
};

export default function AlertsPage() {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WeatherAlertFormValues>();
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  const fetchAlerts = () => {
    getWeatherAlerts()
      .then((data) => setAlerts(data))
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const onSubmit = async (data: WeatherAlertFormValues) => {
    console.log("Form Data:", data);
    createWeatherAlert(data)
      .then(() => {
        alert("Alert created successfully!");
        fetchAlerts();
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        alert("Failed to fetch weather. Check console for details.");
      })
      .finally(() => setLoading(false));

    try {
      setLoading(true);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold p-6">Alerts Page</h1>

      <h2 className="text-2xl font-bold p-6">Create Alerts</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <InputText
            value={watch("name")}
            onChange={(e) => setValue("name", e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <InputText
            value={watch("description")}
            onChange={(e) => setValue("description", e.target.value)}
            placeholder="Enter Description"
          />
        </div>
        <div>
          <Dropdown
            value={watch("condition.parameter")}
            onChange={(e) => setValue("condition.parameter", e.value)}
            options={["temperature", "windSpeed", "precipitation"]}
            placeholder="Select a parameter"
          />
          {errors?.condition?.parameter && (
            <p className="text-red-500 text-sm">
              {errors?.condition?.parameter.message}
            </p>
          )}
        </div>
        <div>
          <Dropdown
            value={watch("condition.operator")}
            onChange={(e) => setValue("condition.operator", e.value)}
            options={[">", "<", ">=", "<=", "=="]}
            placeholder="Select a operator"
          />
          {errors?.condition?.operator && (
            <p className="text-red-500 text-sm">
              {errors?.condition?.operator.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Condition value</label>
          <InputNumber
            value={watch("condition.value")}
            onValueChange={(e) => setValue("condition.value", Number(e.value))}
            placeholder="Enter value"
            min={-180}
            max={180}
            className={errors?.condition?.value ? "p-invalid" : ""}
          />
          {errors?.condition?.value && (
            <p className="text-red-500 text-sm">
              {errors?.condition?.value.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Location Latitude</label>
          <InputNumber
            value={watch("location.lat")}
            onValueChange={(e) => setValue("location.lat", Number(e.value))}
            placeholder="Enter latitude (-90 to 90)"
            min={-90}
            max={90}
            className={errors?.location?.lat ? "p-invalid" : ""}
            useGrouping={false}
          />
          {errors?.location?.lat && (
            <p className="text-red-500 text-sm">
              {errors?.location?.lat.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Location Longitude</label>
          <InputNumber
            value={watch("location.lon")}
            onValueChange={(e) => setValue("location.lon", Number(e.value))}
            placeholder="Enter longitude (-180 to 180)"
            min={-180}
            max={180}
            className={errors?.location?.lon ? "p-invalid" : ""}
            useGrouping={false}
          />
          {errors?.location?.lon && (
            <p className="text-red-500 text-sm">
              {errors?.location?.lon.message}
            </p>
          )}
        </div>

        <Button type="submit" label="Add Weather Alert" loading={loading} />
      </form>

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
    </div>
  );
}

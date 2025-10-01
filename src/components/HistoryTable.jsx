import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HistoryTable({ files, onSelect, onDownload }) {
  // Track selected preview type per file
  const [previewTypes, setPreviewTypes] = useState({});

  const handlePreviewTypeChange = (fileId, type) => {
    setPreviewTypes((prev) => ({ ...prev, [fileId]: type }));
  };

  const renderMiniChart = (file) => {
    if (!file.data || file.data.length === 0) return null;

    const headers = Object.keys(file.data[0]);
    if (headers.length < 2) return null;

    const xAxis = headers[0];
    const yAxis = headers[1];

    const labels = file.data.slice(0, 5).map((row) => row[xAxis]);
    const values = file.data.slice(0, 5).map((row) => Number(row[yAxis]));

    const chartData = {
      labels,
      datasets: [
        {
          label: yAxis,
          data: values,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
    };

    const type = previewTypes[file._id] || "bar";

    if (type === "line")
      return (
        <Line data={chartData} options={chartOptions} width={100} height={60} />
      );
    if (type === "pie")
      return (
        <Pie
          data={chartData}
          options={{ responsive: false }}
          width={100}
          height={60}
        />
      );
    return (
      <Bar data={chartData} options={chartOptions} width={100} height={60} />
    );
  };

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">File Name</th>
          <th className="p-2 border">Uploaded At</th>
          <th className="p-2 border">Preview</th>
          <th className="p-2 border">Chart Type</th>
          <th className="p-2 border">Action</th>
          <th className="p-2 border">Download</th>
        </tr>
      </thead>
      <tbody>
        {files.map((f) => (
          <tr key={f._id}>
            <td className="p-2 border">{f.fileName}</td>
            <td className="p-2 border">
              {new Date(f.createdAt).toLocaleString()}
            </td>
            <td className="p-2 border text-center">{renderMiniChart(f)}</td>
            <td className="p-2 border text-center">
              <select
                value={previewTypes[f._id] || "bar"}
                onChange={(e) => handlePreviewTypeChange(f._id, e.target.value)}
                className="border p-1 rounded"
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
              </select>
            </td>
            <td className="p-2 border text-center">
              <button
                onClick={() => onSelect(f)}
                className="px-2 py-1 bg-blue-600 text-white rounded"
              >
                Visualize
              </button>
            </td>
            <td className="p-2 border text-center space-x-2">
              <button
                onClick={() => onDownload(f, "png")}
                className="px-2 py-1 bg-green-600 text-white rounded"
              >
                PNG
              </button>
              <button
                onClick={() => onDownload(f, "pdf")}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

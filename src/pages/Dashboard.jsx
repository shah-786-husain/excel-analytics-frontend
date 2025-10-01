import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../features/fileSlice";
import FileUpload from "../components/FileUpload";
import HistoryTable from "../components/HistoryTable";
import ChartDisplay from "../components/ChartDisplay";
import { jsPDF } from "jspdf";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { files } = useSelector((state) => state.files);
  const [selectedData, setSelectedData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (user) dispatch(getFiles(user.token));
  }, [dispatch, user]);

  // 📥 Handle PNG/PDF Download
  const handleDownload = (file, type) => {
    if (!selectedData || file._id !== selectedData._id) {
      alert("Please visualize this file before downloading.");
      return;
    }

    const imageData = chartRef.current?.getChartImage();
    if (!imageData) {
      alert("No chart image available.");
      return;
    }

    if (type === "png") {
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `${file.fileName}.png`;
      link.click();
    } else if (type === "pdf") {
      const pdf = new jsPDF();
      pdf.text(`${file.fileName} Chart`, 10, 10);
      pdf.addImage(imageData, "PNG", 15, 20, 180, 100);
      pdf.save(`${file.fileName}.pdf`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Welcome, {user?.name}</h1>
      <FileUpload />

      <h2 className="text-lg font-semibold mt-6">Upload History</h2>
      <HistoryTable
        files={files}
        onSelect={(f) => setSelectedData(f)}
        onDownload={handleDownload}
      />

      <h2 className="text-lg font-semibold mt-6">Chart Visualization</h2>
      {selectedData ? (
        <ChartDisplay ref={chartRef} data={selectedData.data} />
      ) : (
        <p className="text-gray-500">Select a file to visualize</p>
      )}
    </div>
  );
}

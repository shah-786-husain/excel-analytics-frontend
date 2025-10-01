import { forwardRef, useState, useRef, useImperativeHandle } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Scatter, Pie } from "react-chartjs-2";
import * as THREE from "three";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartDisplay = forwardRef(({ data }, ref) => {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [show3D, setShow3D] = useState(false);
  const chartRef = useRef(null);
  const threeContainerRef = useRef(null);
  const rendererRef = useRef(null);

  if (!data || data.length === 0)
    return <p className="text-gray-500">No data available</p>;

  const headers = Object.keys(data[0]);
  const labels = data.map((row) => row[xAxis]);
  const values = data.map((row) => Number(row[yAxis]));

  const chartData = {
    labels,
    datasets: [
      {
        label: `${yAxis} vs ${xAxis}`,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  // 🎨 3D Chart Rendering
  const render3DChart = () => {
    const container = threeContainerRef.current;
    container.innerHTML = "";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
    });
    rendererRef.current.setSize(600, 400);
    container.appendChild(rendererRef.current.domElement);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    values.forEach((val, i) => {
      const geometry = new THREE.BoxGeometry(0.5, val / 10, 0.5);
      const material = new THREE.MeshPhongMaterial({ color: 0x2196f3 });
      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = i - values.length / 2;
      bar.position.y = val / 20;
      scene.add(bar);
    });

    camera.position.z = 10;

    const animate = function () {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.005;
      rendererRef.current.render(scene, camera);
    };
    animate();
  };

  // 📤 Expose methods to parent (Dashboard)
  useImperativeHandle(ref, () => ({
    getChartImage: () => {
      if (show3D && rendererRef.current) {
        return rendererRef.current.domElement.toDataURL("image/png");
      } else if (chartRef.current) {
        return chartRef.current.toBase64Image();
      }
      return null;
    },
    is3D: show3D,
  }));

  return (
    <div className="p-4 border rounded bg-white shadow">
      {/* Axis & Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2"
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
        >
          <option value="">Select X Axis</option>
          {headers.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
        >
          <option value="">Select Y Axis</option>
          {headers.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="scatter">Scatter</option>
          <option value="pie">Pie</option>
        </select>

        <button
          onClick={() => {
            setShow3D(!show3D);
            if (!show3D) render3DChart();
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          {show3D ? "Hide 3D" : "Show 3D"}
        </button>
      </div>

      {/* Chart Rendering */}
      {xAxis && yAxis && !show3D && (
        <>
          {chartType === "bar" && (
            <Bar ref={chartRef} data={chartData} options={chartOptions} />
          )}
          {chartType === "line" && (
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          )}
          {chartType === "scatter" && (
            <Scatter ref={chartRef} data={chartData} options={chartOptions} />
          )}
          {chartType === "pie" && (
            <Pie ref={chartRef} data={chartData} options={chartOptions} />
          )}
          {chartType === "pie" && (
            <Pie ref={chartRef} data={chartData} options={chartOptions} />
          )}
        </>
      )}

      {/* 3D Chart */}
      {show3D && (
        <div
          ref={threeContainerRef}
          id="three-container"
          className="flex justify-center"
        ></div>
      )}
    </div>
  );
});

export default ChartDisplay;

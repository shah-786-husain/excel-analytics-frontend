import React from "react";

const chartExamples = [
  {
    title: "Sales Line Chart",
    description:
      "Track monthly sales trends using a clear and simple line chart. Ideal for visualizing continuous data over time.",
    image:
      "https://cdn.pixabay.com/photo/2018/02/27/17/40/graph-3186081_1280.png",
  },
  {
    title: "Product Comparison Bar Chart",
    description:
      "Compare performance across multiple products using bar charts. Helps in identifying top performers.",
    image:
      "https://cdn.pixabay.com/photo/2017/12/22/08/01/business-3033199_1280.jpg",
  },
  {
    title: "Market Share Pie Chart",
    description:
      "Display category-wise distribution of market share in a visual pie chart format.",
    image:
      "https://cdn.pixabay.com/photo/2022/12/15/20/10/pie-chart-7658449_1280.jpg",
  },
];

const ExtraContent = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Section Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Excel Analytics - Chart Examples
      </h1>

      {/* Chart Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chartExamples.map((chart, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {chart.title}
            </h2>
            <img
              src={chart.image}
              alt={chart.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600 text-sm">{chart.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraContent;

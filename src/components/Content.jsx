import React from "react";

const chartData = [
  {
    title: "Bar Chart Overview",
    description:
      "Bar charts are useful for comparing quantities of different categories. They make it easy to see which category is the largest or smallest.",
    linkText: "Learn how to create a bar chart in Excel",
  },
  {
    title: "Line Chart Trends",
    description:
      "Line charts are ideal for showing trends over time. They're commonly used for financial, sales, and scientific data.",
    linkText: "Explore line chart examples and use cases",
  },
  {
    title: "Pie Chart Distribution",
    description:
      "Pie charts are perfect for visualizing part-to-whole relationships. Each slice shows the proportion of a category.",
    linkText: "Master pie chart formatting and design",
  },
  {
    title: "Combo Charts Explained",
    description:
      "Combo charts allow you to combine two different types of charts in one. Great for highlighting different data series with separate axes.",
    linkText: "Discover how to create a combo chart in Excel",
  },
];

const Content = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Explore Excel Charts
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 flex flex-col justify-between transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;

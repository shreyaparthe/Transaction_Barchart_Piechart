import React from "react";

const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Website</h1>
        <p className="text-gray-600 mb-6">
          We provide detailed analytics on sales performance, including the number of items sold and price trends.
          Our intuitive charts help you track and visualize your business growth effortlessly.
        </p>
      </div>
    </div>
  );
};

export default HomePage;

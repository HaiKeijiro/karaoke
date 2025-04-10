import React from "react";
import { exportTableToCSV } from "./api/API";

const Admin = () => {
  const handleExport = async () => {
    const result = await exportTableToCSV();
    if (result.success) {
      console.log("Table exported successfully");
    } else {
      console.error("Error exporting table:", result.error);
    }
  };

  return (
    <div className="bg-black/20 text-white flex flex-col justify-center items-center h-2/5">
      <h1 className="text-[5em]">Export Database to CSV?</h1>
      <button
        className="bg-[#BF9A30] px-10 py-2 rounded-lg text-[4em] mt-10"
        onClick={handleExport}
      >
        Export
      </button>
    </div>
  );
};

export default Admin;

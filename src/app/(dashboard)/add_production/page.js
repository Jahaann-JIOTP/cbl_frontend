"use client";

import React, { useState, useEffect } from "react";

const AddProduction = () => {
  const [formData, setFormData] = useState({
    GWP: "",
    Airjet: "",
    Sewing2: "",
    Textile: "",
    Sewing1: "",
    PG: "",
    date: "",
  });

  const [tableData, setTableData] = useState([]);
  const [deleteRow, setDeleteRow] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.date) {
      alert("Date is required.");
      return;
    }

    const url = "https://www.cblapi.jiotp.com/cbl_backend/add_production.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data successfully submitted");
        console.log(data);
        fetchTableData(); // Refresh the table data after submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchTableData = () => {
    const url = "https://www.cblapi.jiotp.com/cbl_backend/get_production.php"; // Endpoint to fetch table data

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  };

  const handleDelete = (id, date) => {
    setDeleteRow({ id, date });
  };

  const confirmDelete = () => {
    if (!deleteRow) return;

    const url = "https://www.cblapi.jiotp.com/cbl_backend/delete_production.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: deleteRow.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Row for date ${deleteRow.date} deleted successfully.`);
        setDeleteRow(null);
        fetchTableData(); // Refresh the table data after deletion
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  useEffect(() => {
    fetchTableData(); // Fetch table data on component mount
  }, []);

  return (
    <div
      className="shadow-lg rounded-[8px] p-6 w-full h-[85vh] overflow-auto bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5998]"
      style={{ minHeight: "85vh" }}
    >
      <h1 className="text-xl font-bold text-gray-700">
        Compressed Air Energy Cost Report
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { field: "GWP", label: "GWP (per garment)" },
          { field: "Airjet", label: "Airjet (per meter)" },
          { field: "Sewing2", label: "Sewing 2 (per garment)" },
          { field: "Textile", label: "Textile (per meter)" },
          { field: "Sewing1", label: "Sewing 1 (per garment)" },
          { field: "PG", label: "PG (kWh)" },
        ].map(({ field, label }) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}:
            </label>
            <input
              type="number"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        {/* Date Selection Input */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
      </div>

      {/* Table to display SQL data */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-700">Production Data</h2>
        <table className="w-full mt-4 border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="border border-gray-300 px-4 py-2">ID</th> */}
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">GWP</th>
              <th className="border border-gray-300 px-4 py-2">Airjet</th>
              <th className="border border-gray-300 px-4 py-2">Sewing2</th>
              <th className="border border-gray-300 px-4 py-2">Textile</th>
              <th className="border border-gray-300 px-4 py-2">Sewing1</th>
              <th className="border border-gray-300 px-4 py-2">PG </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                {/* <td className="border border-gray-300 px-4 py-2">{row.id}</td> */}
                <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                <td className="border border-gray-300 px-4 py-2">{row.GWP}</td>
                <td className="border border-gray-300 px-4 py-2">{row.Airjet}</td>
                <td className="border border-gray-300 px-4 py-2">{row.Sewing2}</td>
                <td className="border border-gray-300 px-4 py-2">{row.Textile}</td>
                <td className="border border-gray-300 px-4 py-2">{row.Sewing1}</td>
                <td className="border border-gray-300 px-4 py-2">{row.PG}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(row.id, row.date)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteRow && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="mb-4 text-lg font-bold">
              Are you sure you want to delete the row for date {deleteRow.date}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                OK
              </button>
              <button
                onClick={() => setDeleteRow(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduction;

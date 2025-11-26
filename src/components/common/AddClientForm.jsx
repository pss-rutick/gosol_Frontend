import React, { useState } from "react";
import Input from "./Input";
import { dashboardAPI } from "../../services/apiService";

export default function AddClientForm({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    ContactNumber: "",
    Email: "",
    DateOfBirth: "",
    StreetAddress: "",
    City: "",
    State: "",
    PostalCode: "",
    EmploymentStatus: "",
    EmployerName: "",
    AnnualIncome: "",
    CreditScore: "",
    LoanType: "",
    LoanAmount: "",
    DownPayment: "",
    PropertyType: "",
    LoanPurpose: "",
    PropertyAddress: "",
    Dependents: "",
    MaritalStatus: "",
    Occupation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Convert numeric fields
      const submitData = {
        ...formData,
        AnnualIncome: formData.AnnualIncome ? Number(formData.AnnualIncome) : null,
        CreditScore: formData.CreditScore ? Number(formData.CreditScore) : null,
        LoanAmount: formData.LoanAmount ? Number(formData.LoanAmount) : null,
        DownPayment: formData.DownPayment ? Number(formData.DownPayment) : null,
        Dependents: formData.Dependents ? Number(formData.Dependents) : null,
      };

      await dashboardAPI.addClient(submitData);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            inputProps={{
              type: "text",
              lable: "First Name",
              placeholder: "Enter first name",
              value: formData.FirstName,
              onChange: handleChange,
              name: "FirstName",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "Last Name",
              placeholder: "Enter last name",
              value: formData.LastName,
              onChange: handleChange,
              name: "LastName",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "email",
              lable: "Email",
              placeholder: "Enter email",
              value: formData.Email,
              onChange: handleChange,
              name: "Email",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "tel",
              lable: "Contact Number",
              placeholder: "Enter contact number",
              value: formData.ContactNumber,
              onChange: handleChange,
              name: "ContactNumber",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "date",
              lable: "Date of Birth",
              value: formData.DateOfBirth,
              onChange: handleChange,
              name: "DateOfBirth",
            }}
            showPasswordToggle={false}
          />
          <div>
            <label className="block mb-1 text-sm font-medium">Marital Status</label>
            <select
              name="MaritalStatus"
              value={formData.MaritalStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select marital status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <Input
            inputProps={{
              type: "number",
              lable: "Dependents",
              placeholder: "Enter number of dependents",
              value: formData.Dependents,
              onChange: handleChange,
              name: "Dependents",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "Occupation",
              placeholder: "Enter occupation",
              value: formData.Occupation,
              onChange: handleChange,
              name: "Occupation",
            }}
            showPasswordToggle={false}
          />
        </div>
      </div>

      {/* Address Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            inputProps={{
              type: "text",
              lable: "Street Address",
              placeholder: "Enter street address",
              value: formData.StreetAddress,
              onChange: handleChange,
              name: "StreetAddress",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "City",
              placeholder: "Enter city",
              value: formData.City,
              onChange: handleChange,
              name: "City",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "State",
              placeholder: "Enter state",
              value: formData.State,
              onChange: handleChange,
              name: "State",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "Postal Code",
              placeholder: "Enter postal code",
              value: formData.PostalCode,
              onChange: handleChange,
              name: "PostalCode",
            }}
            showPasswordToggle={false}
          />
        </div>
      </div>

      {/* Employment Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Employment Status</label>
            <select
              name="EmploymentStatus"
              value={formData.EmploymentStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select employment status</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
          <Input
            inputProps={{
              type: "text",
              lable: "Employer Name",
              placeholder: "Enter employer name",
              value: formData.EmployerName,
              onChange: handleChange,
              name: "EmployerName",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "number",
              lable: "Annual Income",
              placeholder: "Enter annual income",
              value: formData.AnnualIncome,
              onChange: handleChange,
              name: "AnnualIncome",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "number",
              lable: "Credit Score",
              placeholder: "Enter credit score",
              value: formData.CreditScore,
              onChange: handleChange,
              name: "CreditScore",
            }}
            showPasswordToggle={false}
          />
        </div>
      </div>

      {/* Loan Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            inputProps={{
              type: "text",
              lable: "Loan Type",
              placeholder: "Enter loan type",
              value: formData.LoanType,
              onChange: handleChange,
              name: "LoanType",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "number",
              lable: "Loan Amount",
              placeholder: "Enter loan amount",
              value: formData.LoanAmount,
              onChange: handleChange,
              name: "LoanAmount",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "number",
              lable: "Down Payment",
              placeholder: "Enter down payment",
              value: formData.DownPayment,
              onChange: handleChange,
              name: "DownPayment",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "Property Type",
              placeholder: "Enter property type",
              value: formData.PropertyType,
              onChange: handleChange,
              name: "PropertyType",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "Loan Purpose",
              placeholder: "Enter loan purpose",
              value: formData.LoanPurpose,
              onChange: handleChange,
              name: "LoanPurpose",
            }}
            showPasswordToggle={false}
          />
          <Input
            inputProps={{
              type: "text",
              lable: "Property Address",
              placeholder: "Enter property address",
              value: formData.PropertyAddress,
              onChange: handleChange,
              name: "PropertyAddress",
            }}
            showPasswordToggle={false}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-lg bg-[#0000FF] text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Client"}
        </button>
      </div>
    </form>
  );
}

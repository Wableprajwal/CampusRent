import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/NewLendPage.css";
import Navbar from "./Navbar";

const NewLendPage = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "default description !!",
    price: "",
    stock: 1,
    category: "",
    location: "",
    rentalStartDate: "",
    rentalEndDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "./";
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const token = localStorage.getItem("authToken"); // Get authToken for authorization
    if (!token) {
      alert("Please log in to lend an item.");
      return;
    }

    if(formData.category === "" || formData.name === "" || formData.description === "" || formData.price === "" || formData.rentalStartDate === "" || formData.rentalEndDate === "" || formData.location === "") {
      alert("Fill in all the blanks")
      return;
    }
  
    try {
      // Convert rentalStartDate and rentalEndDate to Date objects
      const rentStartDate = new Date(formData.rentalStartDate);
      const rentEndDate = new Date(formData.rentalEndDate);

      const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include authToken in the headers
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          stock: formData.stock,
          category: formData.category,
          location: formData.location,
          rent_start: rentStartDate,
          rent_end: rentEndDate,
        }),
      });

      const result = await response.json();
      console.log("Form Data:", formData);
  
      if (response.ok) {
        alert(`Item created successfully with ID: ${result.data._id}`);
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          location: "",
          rentalStartDate: "",
          rentalEndDate: "",
        });
        navigate('/home')
      } else {
        alert(`Failed to create item: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating item:", error);
      alert("An error occurred while creating the item. Please try again.");
    }
  };

  return (
    <div className="new-lend-page-container">
      <Navbar handleLogout={handleLogout}/>

      <form className="form-container" onSubmit={handleSubmit}>
        {/* Left Section - Image with Navigation */}
        <div className="image-section">
          <button className="nav-button">&lt;</button>
          <div className="image-uploader">
            <button className="image-button">+</button>
          </div>
          <button className="nav-button">&gt;</button>
        </div>

        {/* Right Section - Form Fields */}
        <div className="fields-section">
          <div className="row-group">
            <div className="input-group">
              <label>Pick Category</label>
              <select
                className="input-field"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Choose One</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div className="input-group">
              <label>Name of Item</label>
              <input
                type="text"
                className="input-field"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item Name"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Cost ($ per day)</label>
            <input
              type="number"
              className="input-field"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="$ Amount"
            />
          </div>

          <div className="row-group">
            <div className="input-group">
              <label>Rental Initial Date</label>
              <input
                type="date"
                className="input-field"
                name="rentalStartDate"
                value={formData.rentalStartDate}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Rental Last Date</label>
              <input
                type="date"
                className="input-field"
                name="rentalEndDate"
                value={formData.rentalEndDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              className="input-field"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit-button">
              Post Online
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewLendPage;
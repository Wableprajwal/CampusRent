import React from 'react';
import "../CSS/ItemDetailPage.css";
import Navbar from './Navbar';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          setItem(result.data); // Set the item details
        } else {
          alert(`Failed to fetch item details: ${result.message}`);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (!item) {
    return <p>Loading item details...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <div className="item-detail-page-container">
      <Navbar handleLogout={handleLogout} />
      <div className="item-detail-container">
        <div className="item-content">
          <div className="item-details">
            <div className="image-slider">
              <button className="slider-button">{'<'}</button>
              <div className="image-placeholder"></div>
              <button className="slider-button">{'>'}</button>
            </div>
            <div className="item-info">
              <p><strong>Name:</strong> {item.name} </p>
              <p><strong>Cost:</strong> ${item.price}/day</p>
              <p><strong>Rental Start Date:</strong> {new Date(item.rent_start).toLocaleDateString()} </p>
              <p><strong>Rental End Date:</strong> {new Date(item.rent_end).toLocaleDateString()} </p>
              <p>
                <strong>Location:</strong>{" "}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.location}
                </a>
              </p>
            </div>
          </div>

          <div className="owner-details">
            <h3 className="contact-title">Lender's Contact Information</h3>
            <div className="owner-header">
              <div className="owner-image"></div>
              <div>
                <p className="owner-name">First Last Name</p>
                <p className="rating">⭐ 4.5</p>
              </div>
            </div>
            <div className="contact-info">
              <p>
                <strong>Social Media:</strong>
                <span className="icons">
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-whatsapp"></i>
                </span>
              </p>
              <p><strong>Contact:</strong> +1 (999) 999-9999</p>
              <p><strong>Email:</strong> example@gmail.com</p>
            </div>
          </div>
        </div>
        <button className="reserve-button">Reserve for $30</button>
      </div>
    </div>
  );
}

export default ItemDetailPage;

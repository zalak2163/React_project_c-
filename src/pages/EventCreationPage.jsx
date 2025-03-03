import React, { useState } from "react";

const EventCreationPage = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [tickets, setTickets] = useState([
    { ticketType: "", quantity: "", price: "" },
  ]);

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };

  const addTicketType = () => {
    setTickets([...tickets, { ticketType: "", quantity: "", price: "" }]);
  };

  const handleSaveDraft = () => {
    // Logic to save the event as a draft (POST request or local storage)
    console.log("Event Draft Saved");
  };

  const handleCreateEvent = () => {
    // Logic to create and publish the event (POST request)
    console.log("Event Created", {
      eventTitle,
      eventDescription,
      eventLocation,
      eventDate,
      eventImage,
      tickets,
    });
  };

  return (
    <div className="event-creation-page">
      {/* Header */}
      <div className="header">
        <div className="logo">Event Planner</div>
        <div className="nav">
          <a href="/home">Home</a>
          <a href="/manage-events">Manage Events</a>
          <a href="/profile">Profile</a>
        </div>
      </div>

      {/* Event Creation Form */}
      <div className="event-creation-form">
        <h2>Create Event</h2>

        {/* Event Title */}
        <label htmlFor="eventTitle">Event Title</label>
        <input
          type="text"
          id="eventTitle"
          name="eventTitle"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />

        {/* Event Description */}
        <label htmlFor="eventDescription">Event Description</label>
        <textarea
          id="eventDescription"
          name="eventDescription"
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        {/* Event Location */}
        <label htmlFor="eventLocation">Location</label>
        <input
          type="text"
          id="eventLocation"
          name="eventLocation"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />

        {/* Event Date/Time */}
        <label htmlFor="eventDate">Date/Time</label>
        <input
          type="datetime-local"
          id="eventDate"
          name="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        {/* Event Image/Video */}
        <label htmlFor="eventImage">Upload Image/Video</label>
        <input
          type="file"
          id="eventImage"
          name="eventImage"
          onChange={(e) => setEventImage(e.target.files[0])}
        />

        {/* Ticket Management Section */}
        <div className="ticket-management">
          <h3>Ticket Management</h3>

          {tickets.map((ticket, index) => (
            <div key={index} className="ticket">
              {/* Ticket Type */}
              <label htmlFor={`ticketType-${index}`}>Ticket Type</label>
              <input
                type="text"
                id={`ticketType-${index}`}
                name="ticketType"
                placeholder="Ticket Type"
                value={ticket.ticketType}
                onChange={(e) =>
                  handleTicketChange(index, "ticketType", e.target.value)
                }
              />

              {/* Ticket Quantity */}
              <label htmlFor={`ticketQuantity-${index}`}>Quantity</label>
              <input
                type="number"
                id={`ticketQuantity-${index}`}
                name="ticketQuantity"
                placeholder="Ticket Quantity"
                value={ticket.quantity}
                onChange={(e) =>
                  handleTicketChange(index, "quantity", e.target.value)
                }
              />

              {/* Ticket Price */}
              <label htmlFor={`ticketPrice-${index}`}>Price</label>
              <input
                type="number"
                id={`ticketPrice-${index}`}
                name="ticketPrice"
                placeholder="Ticket Price"
                value={ticket.price}
                onChange={(e) =>
                  handleTicketChange(index, "price", e.target.value)
                }
              />
            </div>
          ))}

          {/* Add Another Ticket Type Button */}
          <button type="button" onClick={addTicketType}>
            Add Another Ticket Type
          </button>
        </div>

        {/* Save Draft and Create Event Buttons */}
        <div className="action-buttons">
          <button type="button" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button type="button" onClick={handleCreateEvent}>
            Create Event
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2025 Event Planner</p>
      </div>
    </div>
  );
};

export default EventCreationPage;

import React, { useState, useEffect } from "react";

const UpdateProject = () => {
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    customer: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://localhost:7164/api/Projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://localhost:7164/api/customers");
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchProjects();
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting update for Project ID:", projectId);
    console.log("Form Data:", formData);

    const updatedFormData = {
      ...formData,
      customerId: formData.customer, // Ensure the API receives the correct field
    };

    try {
      const response = await fetch(`https://localhost:7164/api/Projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert("Project updated successfully");
      } else {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        alert(`Failed to update project: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("An error occurred while updating the project.");
    }
  };

  return (
    <div>
      <h2>Updatera Projekt</h2>
      <form onSubmit={handleSubmit}>
        <label>Projekt:</label>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
            <option disabled hidden value=''>Välj Projekt</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
              </option>
            ))}
          </select>
        

        <label>Nytt Projektnamn:</label>
          <input type="text" name="projectName" value={formData.projectName} onChange={handleChange}required/>
        
        
        <label>Beskrivning:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange}/>
        

        <label>Välj kund:</label>
          <select name="customer" value={formData.customer} onChange={handleChange} required>
            <option disabled hidden value=''>Välj befintlig kund</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customerName} {/* Updated to match API data */}
              </option>
            ))}
          </select>
        
        <button type="submit" disabled={!projectId}>Uppdatera</button>
      </form>
    </div>
  );
};

export default UpdateProject;

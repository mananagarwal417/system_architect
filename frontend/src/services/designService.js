const API = "https://system-architect.onrender.com/api/designs";

const getToken = () => localStorage.getItem("token");

export const saveDesign = async (design) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(design),
  });

  return res.json();
};

export const getMyDesigns = async () => {
  // Use the API constant and add /my to match your router.get("/my")
  const res = await fetch(`${API}/my`, { 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
};


export const deleteDesign = async (id) => {
  const res = await fetch(
    `http://localhost:5000/api/designs/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.json();
};


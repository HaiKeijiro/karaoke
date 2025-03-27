import axios from "axios";
const base_url = "http://localhost:8000";

export const addUser = async ({ name, phone }) => {
  try {
    const response = await axios.post(
      `${base_url}/add_user`,
      {
        name,
        phone,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("User added ", response.data);
  } catch (error) {
    console.error("Failed to add user", error);
    return "<p>Failed to add user</p>";
  }
};

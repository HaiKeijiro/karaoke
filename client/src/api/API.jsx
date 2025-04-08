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

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${base_url}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    setError("Error loading categories.");
  }
};

export const fetchGenres = async (category) => {
  try {
    const response = await axios.get(`${base_url}/categories/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    setError("Error loading categories.");
  }
};

export const fetchSongs = async (category, genre) => {
  try {
    const response = await axios.get(
      `${base_url}/categories/${category}/${genre}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching songs: ", error);
    setError("Error loading songs.");
  }
};

export const playSong = async (category, genre, song) => {
  try {
    const response = await axios.get(
      `${base_url}/play/${category}/${genre}/${song}`,
      // Ensure you're getting the response as binary data
      { responseType: "arraybuffer" }
    );

    // Create a Blob from the binary data
    // Adjust MIME type based on your file format
    const audioBlob = new Blob([response.data], { type: "audio/mp3" });
    // Create a URL from the Blob
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl; // Return the Blob URL
  } catch (error) {
    console.error("Error playing song", error);
    return null; // Handle errors gracefully
  }
};

export const fetchLyrics = async (category, genre, song) => {
  try {
    const response = await axios.get(
      `${base_url}/lyrics/${category}/${genre}/${song}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching lyrics ", error);
  }
};

export const searchSongs = async (query, category, genre) => {
  try {
    const response = await axios.get(
      `${base_url}/search/${category}/${genre}?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching songs: ", error);
    return [];
  }
};

// fetchUtils.jsx
/**
 * Handles the response from a fetch request and returns the JSON data if the response status is 200.
 *
 * @param {Response} response - The response object from a fetch request.
 * @returns {Promise<Object>} - A promise that resolves to the JSON data.
 * @author Dhruv Thota
 */
export const handleResponse = (response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Invalid response: " + response.status);
    }
  };
  
  export const handleJSON = (json, setContent) => {
    if (json.constructor === Array) {
      setContent(json);
    } else {
      throw new Error("Invalid JSON: " + json);
    }
  };
  
  export const fetchData = (url, setContent) => {
    fetch(url)
      .then((response) => handleResponse(response))
      .then((json) => {
        handleJSON(json, setContent);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
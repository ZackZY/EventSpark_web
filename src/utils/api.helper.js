// api.js

(function (global) {
    const apiDomain = 'http://localhost:3001'; // Replace with your API
  
    const apiUrlHelper = {
      EventsAPI: `${apiDomain}/events/events`,
      UsersAPI: `${apiDomain}/users/users`,
      EventAttendeesAPI: `${apiDomain}/eventAttendees/eventAttendees`,
    };
  
    /**
     * Fetch data from the given API URL.
     * @param {string} url - The API endpoint to call.
     * @param {string} [method='GET'] - HTTP method (GET, POST, etc.).
     * @param {object|null} [payload=null] - Optional payload for POST/PUT requests.
     * @returns {Promise<any>} - The JSON response from the API.
     */
    async function fetchFromApi(url, method, payload = null) {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (payload) {
        options.body = JSON.stringify(payload);
      }
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          console.error(`API error: ${response.statusText} (${response.status})`);
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
      }
    }
  
    // Expose the helper and functions globally
    global.apiUrlHelper = apiUrlHelper;
    global.fetchFromApi = fetchFromApi;
  })(window);
  
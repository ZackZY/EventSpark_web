// Uncomment this to run apps locally
// export const apiDomain = 'http://localhost:3001'
// export const loginDomain = 'http://localhost:3001'

// Uncomment this to commit into Git repo
export const apiDomain = 'http://localhost:3001'
export const loginDomain = 'https://bqqn2os7e1.execute-api.ap-southeast-1.amazonaws.com/stg'

export const apiUrlHelper = {
  EventsAPI: apiDomain + '/events/events',
  UsersAPI: apiDomain + '/users/users',
  EventAttendeesAPI: apiDomain + '/eventAttendees/eventAttendees',
  LoginAPI: loginDomain + '/auth/login',
  VerifyTokenAPI: loginDomain + '/auth/verify'
}

/**
 * Fetch data from the given API URL.
 * @param {string} url - The API endpoint to call.
 * @param {string} method - HTTP method (GET, POST, etc.).
 * @param {object|null} [payload=null] - Optional payload for POST/PUT requests.
 * @returns {Promise<any>} - The JSON response from the API.
 */
export async function fetchFromApi(url, method, payload = null) {
  const options = {
    method,
    credentials: 'include', // Enable cookies for all requests
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (payload !== null) {
    options.body = JSON.stringify(payload)
  }

  try {
    const response = await fetch(url, options)

    // Handle unauthorized access
    if (response.status === 401) {
      throw new Error('Unauthorized access')
    }

    if (!response.ok) {
      const logMessage = `API error: ${response.statusText} (${response.status})`
      // console.error(logMessage);
      throw new Error(logMessage)
    }

    return await response.json()
  } catch (error) {
    // console.error('Fetch API error:', error)
    throw new Error(error)
  }
}

export async function checkAuth() {
  try {
    const response = await fetchFromApi(apiUrlHelper.VerifyTokenAPI, 'POST')
    if (!response?.valid) {
      return false
    }

    return true
  } catch (error) {
    return error
  }
}

export const apiDomain = 'http://localhost:3001'

export const apiUrlHelper = {
  EventsAPI: apiDomain + '/events/events',
  UsersAPI: apiDomain + '/users/users',
  EventAttendeesAPI: apiDomain + '/eventAttendees'
}

/**
 * Fetch data from the given API URL.
 * @param {string} url - The API endpoint to call.
 * @param {object} [options={}] - Optional fetch options (e.g., method, headers).
 * @returns {Promise<any>} - The JSON response from the API.
 */
export async function fetchFromApi(url, method, payload = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload !== null) {
    options.body = JSON.stringify(payload)
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      const logMessage = `API error: ${response.statusText} (${response.status})`
      // log.Error(logMessage);
      throw new Error(logMessage)
    }

    const data = await response.json()
    return data
  } catch {
    // console.error('Fetch API error:', error)
    // throw error
  }
}

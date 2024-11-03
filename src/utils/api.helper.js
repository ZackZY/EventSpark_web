// api.js

(function (global) {
  const ENV_CONFIG = {
    staging: {
      hostname: 'ecs-frontend-lb-735742951.ap-southeast-1.elb.amazonaws.com',
      apiDomain: 'https://api.staging.com',
      loginDomain: 'https://bqqn2os7e1.execute-api.ap-southeast-1.amazonaws.com/stg'
    },
    development: {
      hostname: 'localhost',
      apiDomain: 'http://localhost:3001',
      loginDomain: 'http://localhost:4000/dev'
    }
  }

  const getCurrentEnv = () => {
    const { hostname } = window.location
    return Object.values(ENV_CONFIG).find(env => hostname.includes(env.hostname)) || ENV_CONFIG.development
  }

  const currentEnv = getCurrentEnv()
  const { apiDomain } = currentEnv
  const { loginDomain } = currentEnv

  const apiUrlHelper = {
    EventsAPI: `${apiDomain}/events/events`,
    UsersAPI: `${apiDomain}/users/users`,
    EventAttendeesAPI: `${apiDomain}/eventAttendees`,
    LoginAPI: `${loginDomain}/auth/login`,
    VerifyTokenAPI: `${loginDomain}/auth/verify`,
    LogoutAPI: `${loginDomain}/auth/logout`,
    CheckInAPI: `${loginDomain}/qrcheckin/checkin`
  }

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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (payload) {
      options.body = JSON.stringify(payload)
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(url, options)

      if (response.status === 401) {
        throw new Error('Unauthorized access')
      }

      if (!response.ok) {
        // console.error(`API error: ${response.statusText} (${response.status})`)
        throw new Error(response.statusText)
      }

      return await response.json()
    } catch (error) {
      // console.error('Fetch API error:', error)
      throw error
    }
  }

  async function checkAuth() {
    try {
      const response = await fetchFromApi(apiUrlHelper.VerifyTokenAPI, 'POST')
      if (!response?.valid) {
        return false
      }

      return true
    } catch {
      return false
    }
  }

  // Expose the helper and functions globally
  global.apiUrlHelper = apiUrlHelper
  global.fetchFromApi = fetchFromApi
  global.checkAuth = checkAuth
})(window)

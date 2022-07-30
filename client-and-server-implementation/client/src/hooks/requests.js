const API_URL = "http://localhost:8000";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/plannets`);
  return await response.json();
}

async function httpGetLaunches() {
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  return await response.json();
}

async function httpSubmitLaunch(launch) {
  // Submit given launch data to launch system.

  try {
    return await fetch(`${API_URL}/createLaunch`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${API_URL}/abortLaunch/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

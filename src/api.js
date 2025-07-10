//later edit the api and create a BASEAPIURL (mesh kol mara nekteb el url)


// Call the real vector search API endpoint
export const fetchData = async (query, keywords = "", dateFrom = "", dateTo = "") => {
  try {
    // Build URL with all parameters
    let url = `https://817f-62-193-124-9.ngrok-free.app/search?q=${encodeURIComponent(query)}`;
    
    // Use share_search parameter instead of keywords (matches your backend)
    if (keywords.trim()) {
      url += `&share_search=${encodeURIComponent(keywords)}`;
    }
    
    if (dateFrom) {
      url += `&date_from=${encodeURIComponent(dateFrom)}`;
    }
    
    if (dateTo) {
      url += `&date_to=${encodeURIComponent(dateTo)}`;
    }

    // Add top_k parameter for number of results
    url += `&top_k=10`;

    console.log('Calling API URL:', url); // Debug log

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'  // Skip ngrok browser warning
      }
    });

    // Check if response is HTML (error page) instead of JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Received HTML instead of JSON:', text.substring(0, 200));
      throw new Error('Server returned HTML instead of JSON - check ngrok tunnel');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // Debug log
    return data;
    
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Add health check function for debugging
export const checkHealth = async () => {
  try {
    const response = await fetch('https://817f-62-193-124-9.ngrok-free.app/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Health check successful:', data);
    return data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

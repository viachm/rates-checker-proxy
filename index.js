const ALLOWED_ORIGIN_PATTERN = /mliglehkfgodgioklanbdpnacfmfphmm|giobplimenegjjbochlglapnpackpiop/;
const ALLOWED_TARGET_PATTERN = /privatbank.ua|ukrsibbank.com/;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response('Missing url query parameter', { status: 400 });
  }

  if (!is_request_allowed(request, targetUrl)) {
    return new Response('Forbidden', { status: 403 });
  }

  // Fetch the original response from the target URL
  const response = await fetchOriginalResponse(targetUrl, request);

  // Make a new response by cloning the original response so we can modify the headers
  const newResponse = new Response(response.body, response);

  // Set CORS headers
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return newResponse;
}

function is_request_allowed(request, targetUrl) {
  const origin = request.headers.get('Origin') || '';
  const is_origin_allowed = ALLOWED_ORIGIN_PATTERN.test(origin)
  const is_target_allowed = ALLOWED_TARGET_PATTERN.test(targetUrl)
  console.log(`Checking request: is_origin_allowed = ${is_origin_allowed}', is_target_allowed = ${is_target_allowed}`);

  return is_origin_allowed && is_target_allowed
}

async function fetchOriginalResponse(targetUrl, request) {
  return await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method === "GET" ? undefined : request.body
  });
}

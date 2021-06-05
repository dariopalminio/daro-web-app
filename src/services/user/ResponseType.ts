export type ResponseType =
  {
    // `data` is the response that was provided by the server
    //data.access_token
    data: { access_token: string }

    // `status` is the HTTP status code from the server response
    status: any

    // `statusText` is the HTTP status message from the server response
    statusText: string

    // `headers` the HTTP headers that the server responded with
    // All header names are lower cased and can be accessed using the bracket notation.
    // Example: `response.headers['content-type']`
    headers: {}

    // `config` is the config that was provided to `axios` for the request
    config: {}

    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance in the browser
    request: {}
  }
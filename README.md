# http-request

A Promise wrapper around the native node `http.request` and `https.request` methods.

### Installation

```bash
npm install bellmounte-http-request
```

### Usage

```javascript
const options = {
    hostname: 'example.com',
    port: 80,
    path: '/api',
    method: 'POST',
};
const data = JSON.stringify({
    sample: 'test'
});

httpRequest(options, data).then((response) => {
    console.log({response});
}).catch((error) => {
    console.error({error});
});
```

Note: `options` follows the nodejs's method for [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback).

##### Additional Options
* `followAllRedirects` - Follows redirects from http status code 301.

const http = require('http');
const https = require('https');
const url = require('url');

const overwriteKeys = [
    'protocol',
    'auth',
    'host',
    'port',
    'hostname',
    'path'
];

const httpRequest = (options, data) => {
	return new Promise((resolve, reject) => {
        const callback = (response) => {
			const body = [];
			const followRedirect = (response.statusCode === 301 && options.followAllRedirects);

			if (response.statusCode < 200 || response.statusCode > 299) {
                if (followRedirect) {
                    const redirectURL = url.parse(response.headers.location);
                    overwriteKeys.forEach(key => {
                        if (typeof redirectURL[key] !== 'undefined') {
                            options[key] = redirectURL[key];
                        }
                    });

                    httpRequest(options, data).then(data => {
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    })

                } else {
	                reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
			}

			response.on('data', (chunk) => body.push(chunk));
			response.on('end', () => {
                if (!followRedirect) {
                    resolve(body.join(''));
                }
            });
		};

        let request;
        if (options.protocol === 'https:') {
            request = https.request(options, callback);
        } else {
            request = http.request(options, callback);
        }

		request.on('error', (error) => reject(error));
		if (data) {
			request.write(data);
		}
		request.end();
	});
};

module.exports = httpRequest;

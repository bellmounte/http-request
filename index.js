const http = require('http');

const httpRequest = (options, data) => {
	return new Promise((resolve, reject) => {
		const request = http.request(options, (response) => {
			const body = [];

			if (response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error('Failed to load page, status code: ' + response.statusCode));
			}

			response.on('data', (chunk) => body.push(chunk));
			response.on('end', () => resolve(body.join('')));
		});

		request.on('error', (error) => reject(error));
		if (data) {
			request.write(data);
		}
		request.end();
	});
};

module.exports = httpRequest;

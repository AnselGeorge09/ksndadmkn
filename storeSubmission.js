const fs = require('fs');

const storeSubmission = (request, response) => {
  const data = request.body;
  fs.appendFile('submissions.txt', data + "\n\n", (err) => {
    if (err) {
      response.status(500).send(`Error storing submission: ${err}`);
    } else {
      response.send(`Submission stored successfully`);
    }
  });
};

const getSubmissions = (request, response) => {
  fs.readFile('submissions.txt', (err, data) => {
    if (err) {
      response.status(404).send(`Error loading submissions: ${err}`);
    } else {
      response.send(data.toString());
    }
  });
};

// Set up a server to handle requests
const http = require('http');
const server = http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/storeSubmission') {
    storeSubmission(request, response);
  } else if (request.method === 'GET' && request.url === '/getSubmissions') {
    getSubmissions(request, response);
  } else {
    response.status(404).send('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
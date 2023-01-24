
let remoteUrl = "http://federal-transit.us-east-1.elasticbeanstalk.com";
let localUrl = "http://localhost:5000"

let USE_REMOTE = true;
let API_URL = localUrl;
if (USE_REMOTE) {
  API_URL = remoteUrl;
}

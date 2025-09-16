
let remoteUrl = "http://federal-transit-4-env.eba-gkdzun8i.us-east-1.elasticbeanstalk.com";
let localUrl = "http://localhost:5000"

let USE_REMOTE = false;
let API_URL = localUrl;
if (USE_REMOTE) {
  API_URL = remoteUrl;
}

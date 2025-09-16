## Usage

This frontend application does not use npm to serve the application. It serves static html, css, and javascript files.

To run the application, run the following command below. Note you do not get live reload functionality using the command.

```python -m http.server 8000```

The architecture of this Federal Transit app consists of a frontend application (written in React) and a backend application (written in Java/Spring).

Depending upon whether the backend application is local or remote, you can configure it in `config_api.js`.


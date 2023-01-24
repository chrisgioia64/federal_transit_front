


async function dropDatabaseAPI(setResponse) {
    setResponse("Processing request...");
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    const response = await fetch(API_URL + "/database/drop", requestOptions)
    let text = await response.text();
    setResponse(text);
    return text;
}

async function createDatabaseAPI(setResponse) {
    setResponse("Processing request...");
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    const response = await fetch(API_URL + "/database/create", requestOptions)
    let text = await response.text();
    console.log("text: " + text);
    setResponse(text);
    return text;
}

async function loadMasterAPI(setResponse) {
    setResponse("Processing request...");
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    const response = await fetch(API_URL + "/database/load_master/1", requestOptions)
    let text = await response.text();
    setResponse(text);
    return text;
}

async function numAgenciesAPI(setResponse) {
    // setResponse("Processing request...");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    const response = await fetch(API_URL + "/database/num_agencies", requestOptions)
    let text = await response.text();
    setResponse(text);
    return text;
}

async function setStatesAPI(setStates) {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:8081/query/states", requestOptions);
    let json = await response.json();
    console.log("json: " + json);
    setStates(json);
    return json;
}

async function setMetroAPI(setMetros, state) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "value": state
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch("http://localhost:8081/query/metro_by_state", requestOptions)
    let json = await response.json();
    setMetros(json);
    return json;
}

async function setMetroInfoAPI(setMetros, metro) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "value": metro
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response = await fetch("http://localhost:8081/query/metro_rank", requestOptions);
    let json = await response.json();
    // console.log("status: " + response.status);
    if (response.status == 200) {
        setMetros(json);
    }
    // console.log(json);
    return json;
}

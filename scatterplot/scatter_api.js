

async function query_scatterplot(setScatter, statistic1, transitType1, statistic2, transitType2, populationLimit) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({
        "aggregateStatistic1": statistic1,
        "transitAggregateType1": transitType1,
        "aggregateStatistic2": statistic2,
        "transitAggregateType2": transitType2,
        "populationLimit": populationLimit
      });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let response = await fetch(API_URL + "/query/scatterplot", requestOptions)
    let json = await response.json();
    console.log("json: " + json);
    setScatter(json);
    return json;
}
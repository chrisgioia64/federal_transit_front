
const useState = React.useState;
const useEffect = React.useEffect;

function OurApp() {
    return (
        <div>
            {/* <Header/> */}
            <StateAreaCards/>
        </div>
    )
}

function SearchComponent() {
    const [metro, setMetro] = useState([]);
    let [show, setShow] = useState(false);

    return (
        <div>
            <SearchBar metro={metro} setMetro={setMetro} setShow={setShow}/>
            <SearchResultPanel metro={metro} show={show} setShow={setShow}/>
        </div>
    )
}

function SearchBar(props) {
    const [metros, setMetros] = useState([]);
    
    let setMetro = props.setMetro;
    let setShow = props.setShow;

    function searchMetro() {
        var input = document.getElementById("myInput");
        setMetro(input.value);
        setShow(false);
    }

    useEffect(() => {
        var countries = ["Angola", "Argentina", "Armenia", "Belarus", "Belize", "China", "Cuba"];
        setMetroAllAPI(setMetros);
        autocomplete(document.getElementById("myInput"), metros);
    }, [metros])

    return (
    <div className="search_panel">
        <form autocomplete="off">
        <div className="autocomplete">
            <input id="myInput" type="text" name="myCountry" placeholder="Metropolitan Area" />
        </div>
        <input type="button" id="searchMetro" value="Search" onClick={searchMetro} />
        </form>
    </div>
    )
}

function SearchResultPanel(props) {
    let show = props.show;
    let setShow = props.setShow;

    let metro = props.metro;
    let prefix = "metro_search_result";
    let containerId = prefix + "_container";
    let containerIdHash = "#" + containerId;
    let divId = prefix + "_div";
    let divIdHash = "#" + prefix + "_div";

    
    function toggleDisplay() {
        setShow( x => !x);
        console.log("metro: " + metro);
    }

    return (
        <div id={divId} className="metro_card">
        <div className="metro_card_title">
        <button onClick={toggleDisplay} className="btn btn-link" type="button" aria-expanded="true" aria-controls={containerId}>
          {props.metro}
        </button>

        </div>
        <div className="metro_card_content" id={containerId}
            data-parent={divIdHash}>
            {show && <MetroAreaTable metro={props.metro} />}
            {show && <MetroAreaPopulationArea metro={props.metro} />}
            {show && <MetroAreaTransitChart metro={props.metro} />}
            {show && <MetroAreaStackedBarChart metro={props.metro} />}
            {show && <MetroAreaStackedBarChartAgency metro={props.metro} />}
            {show && <MetroTimeSeriesData metro={props.metro}  />}
        </div>
        </div>)
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function getResults(input, data) {
    const results = [];
    let i = 0;
    for (i = 0; i < data.length; i++) {
      if (input === data[i].slice(0, input.length)) {
        results.push(data[i]);
      }
    }
    return results;
  }

function autocompleteChange(data) {
    var autocomplete = document.getElementById("autocomplete");
    var resultsHTML = document.getElementById("result");
    resultsHTML.onclick = function (event) {
        const setValue = event.target.innerText;
        autocomplete.value = setValue;
        this.innerHTML = "";
    };

    autocomplete.oninput = function () {
        let results = [];
        const userInput = this.value;
        resultsHTML.innerHTML = "";
        if (userInput.length > 0) {
          results = getResults(userInput, data);
          resultsHTML.style.display = "block";
          let i = 0;
          for (i = 0; i < results.length; i++) {
            resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
          }
        }
    };
}




function Header() {
    return <h1>Metropolitan Areas</h1>
}

function StateAreaCards() {
    const [states, setStates] = useState([]);
    const [stateId, setStateId] = useState([]);
    const [metroId, setMetroId] = useState([]);

    useEffect(() => {
        setStatesAPI(setStates);
    }, [])

    function changeStates() {
        setStates(['MD','GA']);
    }
    function ChangeButton() {
        return (
            <button onClick={changeStates}>Change States</button>
        )
    }

    return (
    <div>
        {states.map(
            function(state) {
                        return <StateAreaCard state={state}
                                   key={state}
                                   stateId={stateId} setStateId={setStateId}
                                   metroId={metroId} setMetroId={setMetroId} />;
                    })
        }
    </div>)
}

function StateAreaCard(props) {
    const setStateId = props.setStateId;
    let divId = "state_card_" + props.state;

    const [metros, setMetros] = useState([]);

    useEffect(() => {
        setMetroAPI(setMetros, props.state);
    }, [])

    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(metros.length > 0);
    }, [metros])

    return (
    <div>
        {show && <MetroAreaCards metros={metros} divId={divId} state={props.state}/>}
     </div>)
}

function MetroAreaCards(props) {
    let metros = props.metros;
    let divId = props.divId;

    return (
        <div className="state_card" id={divId}>
        <p className="state_title">{props.state}</p>
        <ul>
            {metros.map(function(metro) {
                        return <MetroAreaCard metro={metro}
                                   state={props.state}
                                   key={metro}/>;
                    })
            }
        </ul>
        </div>
    )

}

function MetroAreaCard(props) {
    let prefix = "metro_" + props.state + "_" + props.metro.replaceAll(" ","").replaceAll(",","_");
    let containerId = prefix + "_container";
    let containerIdHash = "#" + containerId;
    let divId = prefix + "_div";
    let divIdHash = "#" + prefix + "_div";

    let [show, setShow] = useState(false);

    function toggleDisplay() {
        setShow( x => !x);
    }

    return (
        <div id={divId} className="metro_card">
        <div className="metro_card_title">
        <button onClick={toggleDisplay} className="btn btn-link" type="button" aria-expanded="true" aria-controls={containerId}>
          {props.metro}
        </button>

        </div>
        <div className="metro_card_content" id={containerId}
            data-parent={divIdHash}>
            {/* {show && <MetroAreaTable metro={props.metro} key={props.metro} />} */}
            {show && <MetroAreaPopulationArea metro={props.metro} />}
            {show && <MetroAreaTransitChart metro={props.metro} />}
            {show && <MetroAreaStackedBarChartAgency metro={props.metro} />}
            {show && <MetroAreaStackedBarChart metro={props.metro} />}
            {show && <MetroTimeSeriesData metro={props.metro} />}
        </div>
        </div>)
}

function MetroTimeSeriesData(props) {
    let metro = props.metro;
    let [agency, setAgency] = useState([]);
    let cardId = "metro_card_timeseries_" + props.metro.replaceAll(" ","").replaceAll(",","_");
    let agencyNameId = cardId + "_agency_name";
    let agencyModeId = cardId + "_agency_mode";
    let typeId = cardId + "_select_type";
    let graphId = cardId + "_graph";

    let [agencyModes, setAgencyModes] = useState([]);

    let [graphData, setGraphData] = useState([]);
    let aggregateType = document.getElementById(typeId);

    useEffect(() => {
        setAgencies(setAgency, metro);
    }, []);

    useEffect(() => {
        updateAgencyModeDropdown();
    }, [agency]);

    function updateAgencyModeDropdown() {
        if (agency.length > 0) {
            let agencyName = document.getElementById(agencyNameId);
            let agencyNameValue = agencyName.options[agencyName.selectedIndex].text;
            
            setAgencyModesApi(setAgencyModes, agencyName.value);
        } else {
            
        }
    }

    function updateGraphData() {
        let ntdId = document.getElementById(agencyNameId).value;
        let modeTos = document.getElementById(agencyModeId).value;
        let arr = modeTos.split("_");
        let mode = arr[0];
        let tos = arr[1];
        if (aggregateType.value == "all") {
            setLineGraphDataApi(setGraphData, ntdId, mode, tos);
        } else {
            setLineGraphDataApiByMonth(setGraphData, ntdId, mode, tos);
        }
    }

    return (
        <div id="time_series_panel" className="time_series_div">
            <h5>Time Series Data</h5>
        <table id="time_series_table">
        <tbody>
            <tr>
                <td className="col_1">Agency Name</td>
                <td className="col_2">
                    <select id={agencyNameId} name={agencyNameId} onChange={updateAgencyModeDropdown}>
                        {agency.map(function(agency) {
                            return <MetroTimeSeriesAgencyOption agency={agency} />;
                            })
                        }
                    </select>
                </td>
            </tr>
            <tr>
                <td className="col_1">Agency Mode</td>
                <td className="col_2">
                    <select id={agencyModeId} name={agencyModeId}>
                        {agencyModes.map(function(agencyMode) {
                            return <MetroTimeSeriesAgencyModeOption agencyMode={agencyMode} />;
                            })
                        }
                    </select>
                </td>
            </tr>
            <tr>
                <td className="col_1">Type</td>
                <td className="col_2">
                    <select id={typeId} name={typeId}>
                        <option value="all">All</option>
                        <option value="month">By Month</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td className="col_1"></td>
                <td className="col_2">
                    <input className="btn btn-primary" onClick={updateGraphData} id="search_button" type="button" value="Query" />
                </td>
            </tr>
        </tbody>
        </table>
        
        <LineGraphComponent graphId={graphId} graphData={graphData} aggregateType={aggregateType}/>

        </div>
    )
}

function LineGraphComponent(props) {
    let graphId = props.graphId;
    let graphData = props.graphData;
    let aggregateType = props.aggregateType;

    useEffect(() => {
        updateRidershipChart(graphId, graphData, aggregateType);
    }, [graphData])

    return (
        <div id={graphId}>
        </div>
    );
}

function updateRidershipChart(graphId, graphData, aggregateType) {
    let width = 700;

    let date_function = (d) => {
        let month = String(d.month).padStart(2, '0');
        let year = d.year;
        if (aggregateType.value == "month") {
            year = "2000";
        }
        let dt = year + "-" + month + "-01";
        return Date.parse(dt);
    }
    let data_function = (d) => {
        return d.data;
    }
    let chart = LineChart(graphData, {
        x: date_function,
        y: data_function,
        yLabel: "↑ UPT",
        width,
        height: 200,
        color: "steelblue"
      })


    let chartDiv = document.querySelector("#" + graphId);
    chartDiv.innerHTML = "";
    chartDiv.append(chart);
}


async function updateLineChart(chart_id, agencyNameId, agencyModeId, chart, setChart) {
    let ntdId = document.getElementById(agencyNameId);

    let json = await setPieChartTransitModesAPI(setChart, metro, "UPT");
    let cars = json.portions;
    let width = 400;
    chart = PieChart(cars, {
        name: d => d.category,
        value: d => d.data,
        width,
        height: 150
    })
    

    let chartDiv = document.querySelector("#" + chart_id);
    chartDiv.innerHTML = "";
    chartDiv.append(chart);

    json = await setPieChartTransitModesAPI(setChart, metro, "PASSENGER_MILES");
    cars = json.portions;
    chart = PieChart(cars, {
        name: d => d.category,
        value: d => d.data,
        width,
        height: 150
    })
    // chartDiv.append(chart);
}


function MetroTimeSeriesAgencyModeOption(props) {
    let agencyMode = props.agencyMode;
    let m = agencyMode.mode + "_" + agencyMode.typeOfService;
    return (
        <option value={m}>{m}</option>
    )
}

function MetroTimeSeriesAgencyOption(props) {
    let agency = props.agency;
    return (
        <option value={agency.ntdId}>{agency.agencyName}</option>
    )
}

function MetroAreaTransitChart(props) {
    const [chart, setChart] = useState([]);
    let cardId = "metro_card_pie_" + props.metro.replaceAll(" ","").replaceAll(",","_");

    useEffect(() => {
        updatePieChart(cardId, chart, setChart, props.metro);
    }, []);

    return (
        <div className='pie_chart_div'>
            <h5>UPT by Travel Mode</h5>
            <div id={cardId}></div>
        </div>
    ); 
}

async function updatePieChart(chart_id, chart, setChart, metro) {
    let json = await setPieChartTransitModesAPI(setChart, metro, "UPT");
    let cars = json.portions;
    let width = 400;
    
    chart = PieChart(cars, {
        name: d => d.category,
        value: d => d.data,
        width,
        height: 150
    })
    

    let chartDiv = document.querySelector("#" + chart_id);
    chartDiv.innerHTML   = "";
    // chartDiv.append(chart);

    // json = await setPieChartTransitModesAPI(setChart, metro, "PASSENGER_MILES");
    // cars = json.portions;
    // chart = PieChart(cars, {
    //     name: d => d.category,
    //     value: d => d.data,
    //     width,
    //     height: 150
    // })

    let series = []
    let labels = []
    let i = 0;
    for (i = 0; i < cars.length; i++) {
        series.push(cars[i].data);
        labels.push(cars[i].category);
    }

    var options = {
        series: series,
        chart: {
        width: 300,
        type: 'pie',
      },
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };

      var chart = new ApexCharts(document.querySelector("#" + chart_id), options);
      chart.render();

    // chartDiv.append(chart);
}

function MetroAreaPopulationArea(props) {
    // let json = await setPieChartTransitModesAPI(setChart, props.metro, "UPT");
    
    const [metros, setMetros] = useState([]);
    const [metrosTransit, setMetrosTransit] = useState([]);
    const [transit, setTransit] = useState([]);

    console.log("props.metro: " + props.metro);
    if (props.metro.startsWith("")) {
        useEffect(() => {
                setMetroInfoAPI(setMetros, props.metro);
                setMetroTransitTypeInfoAPI(setMetrosTransit, props.metro)
                setTransitModesAPI(setTransit, props.metro, "UPT")
            }, [])
    }

    let rail = '50%';

    return (
        <div className='population_area_div'>
            
            <table className="population_table">
             <tr>
                <th className="table_col_img"></th>
                <th className="table_col_attribute"></th>
                <th className="table_col_total">Total</th>
                <th className="table_col_total_rank">Rank</th>
                <th className="table_col_other"></th>
             </tr>
              <tr>
                <td className="table_col_img">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                    </svg>

                </td>
                <td className="table_col_attribute">Population</td>
                  <td className="table_col_total">{metros.length == 0 ? 0 : metros[0].population.toLocaleString()}</td>
                  <td className="table_col_total_rank">{metros == 0 ? 0 : metros[0].populationRank}</td>
                <td className="table_col_other"></td>
              </tr>

            <tr>
                <td className="table_col_img">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bus-front-fill" viewBox="0 0 16 16">
                    <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1"/>
                    </svg>

                </td>
                <td className="table_col_attribute">Trips per Person</td>
                  <td className="table_col_total">{metros.length == 0 ? 0 : metros[0].perCapitaAmount.toFixed(1)}</td>
                  <td className="table_col_total_rank">{metros.length == 0 ? 0 : metros[0].perCapitaRank.toLocaleString()}</td>
                <td className="table_col_other"></td>
            </tr>

            <tr>
                <td className="table_col_img">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cone-striped" viewBox="0 0 16 16">
                        <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9s-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12m-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4s1.2-.036 1.725-.098m4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257z"/>
                        </svg>

                </td>
                <td className="table_col_attribute">Operating Expenses per Person</td>
                  <td className="table_col_total">${metros.length == 0 ? 0 : metros[2].perCapitaAmount.toFixed(0)}</td>
                  <td className="table_col_total_rank">{metros.length == 0 ? 0 : metros[2].perCapitaRank.toLocaleString()}</td>
                  <td className="table_col_other"></td>
            </tr>
            
            <tr>
                <td className="table_col_img">

                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                    </svg>

                </td>
                <td className="table_col_attribute">Fares per Person</td>
                  <td className="table_col_total">${metros.length == 0 ? 0 : metros[3].perCapitaAmount.toFixed(0)}</td>
                  <td className="table_col_total_rank">{metros.length == 0 ? 0 : metros[3].perCapitaRank.toLocaleString()}</td>
                  <td className="table_col_other"></td>
            </tr>

            <tr>
                <td className="table_col_img">

                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-train-front-fill" viewBox="0 0 16 16">
                    <path d="M10.621.515C8.647.02 7.353.02 5.38.515c-.924.23-1.982.766-2.78 1.22C1.566 2.322 1 3.432 1 4.582V13.5A2.5 2.5 0 0 0 3.5 16h9a2.5 2.5 0 0 0 2.5-2.5V4.583c0-1.15-.565-2.26-1.6-2.849-.797-.453-1.855-.988-2.779-1.22ZM6.5 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m-2 2h7A1.5 1.5 0 0 1 13 5.5v2A1.5 1.5 0 0 1 11.5 9h-7A1.5 1.5 0 0 1 3 7.5v-2A1.5 1.5 0 0 1 4.5 4m.5 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2M4 5.5a.5.5 0 0 1 .5-.5h3v3h-3a.5.5 0 0 1-.5-.5zM8.5 8V5h3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
                    </svg>

                </td>
                <td className="table_col_attribute">Transit Usage</td>
                  <td colSpan='3'>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{"width": `${transit.rail}%`}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Rail </div>
                        <div class="progress-bar bg-success" role="progressbar" style={{"width": `${transit.bus}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Bus </div>
                        <div class="progress-bar bg-warning" role="progressbar" style={{"width": `${transit.demand}%`}} aria-valuenow='20' aria-valuemin="0" aria-valuemax="100">Demand</div>
                    </div>

                  </td>
            </tr>

              </table>
        </div>
    )
}

function MetroAreaTable(props) {
    const [metros, setMetros] = useState([]);
    const [metrosTransit, setMetrosTransit] = useState([]);

    if (props.metro.startsWith("")) {
        useEffect(() => {
            setMetroInfoAPI(setMetros, props.metro);
            setMetroTransitTypeInfoAPI(setMetrosTransit, props.metro)
        }, [])
    }

    let row = metros[0];
    console.log("metros: ");
    console.log(metros)

    return (
      <table className="metro_table">
          <thead>
              <tr>
                  <td className="table_col_attribute"></td>
                  <td className="table_col_total">Total</td>
                  <td className="table_col_total_rank">Total Rank</td>
                  <td className="table_col_per_capita">Per Capita</td>
                  <td className="table_col_per_capita_rank">Per Capita Rank</td>
              </tr>
          </thead>
          <tbody>
              <MetroAreaTablePopulationRow row={metros[0]}/>
              {metros.map(function(metro) {
                        return <MetroAreaTableRow row={metro} />;
                    })
              }
              {metrosTransit.map(function(metro) {
                        return <MetroAreaTableRow row={metro} />;
                    })
              }
          </tbody>
      </table>
    );
}

function MetroAreaTablePopulationRow(props) {
    let row = props.row;
    if (row != null) {
        return (
            <tr>
                    <td className="table_col_attribute">Population</td>
                      <td className="table_col_total">{row.population.toLocaleString()}</td>
                      <td className="table_col_total_rank">{row.populationRank}</td>
                      <td className="table_col_per_capita"></td>
                      <td className="table_col_per_capita_rank"></td>
            </tr>
        )
    } else {
        return <tr></tr>
    }
}

function MetroAreaTableRow(props) {
    let row = props.row;
    let perCapita = Math.round(row.perCapitaAmount * 10) / 10.0;
    let description = row.statisticName;
    if (row.groupType != null) {
        description += " (" + row.groupType + ")"
    }
    return (
        <tr>
                <td className="table_col_attribute">{description}</td>
                  <td className="table_col_total">{row.totalAmount.toLocaleString()}</td>
                  <td className="table_col_total_rank">{row.totalRank}</td>
                  <td className="table_col_per_capita">{perCapita.toFixed(1)}</td>
                  <td className="table_col_per_capita_rank">{row.perCapitaRank}</td>
        </tr>
    )
}


function MetroAreaStackedBarChart(props) {
    const [chart, setChart] = useState([]);
    const [years, setYears] = useState([]);

    let cardId = "metro_card_stacked_bar_" + props.metro.replaceAll(" ","").replaceAll(",","_");
    let selectId = "metro_card_select_" + props.metro.replaceAll(" ","").replaceAll(",","_");

    useEffect(() => {
        setYearsApi(setYears, props.metro);
    }, []);

    useEffect(() => {
        updateChart();
    }, [years]);

    function updateChart() {
        if (years.length > 0) {
            const yearSelect = document.querySelector("#" + selectId);
            updateStackedBarChart(cardId, chart, setChart, props.metro, yearSelect.value);
        }
    }

    return (
        <div className="stacked_bar_chart_div">
            <h5>UPT Usage by Agency/Travel Mode</h5>
            <div>
                <select id={selectId} onChange={updateChart}>
                {years.map(function(year) {
                            return <YearOption year={year} />;
                            })
                }
                </select>

            </div>
            <div id={cardId}></div>
        </div>
        
    );
}



function YearOption(props) {
    let year = props.year;
    return (
        <option value={year}>{year}</option>
    )
}


async function setYearsApi(setYears, metro) {
    let json = await setYearsForMetro(setYears, metro, "UPT");
}

async function updateStackedBarChart(chart_id, chart, setChart, metro, year) {
    let json = await setStackedBartChartTransitModesAPIYear(setChart, metro, "UPT", year)
    let data = json;
    let width = 1500;
    // let ages = [{0: "CB"}, {1: "MB"}, {2: "TB"}, {3: "LR"}, {4: "HR"}, {5: "DR"}];
    let s = new Set();
    for (var i = 0; i < data.length; i++) {
        var datum = data[i];
        s.add(datum.travelMode);
    }
    let ages = [];
    s.forEach(a => { ages.push(a);
                      });
    
    
    chart = StackedBarChart(data, {
        x: d => d.amount / 1000000,
        y: d => d.agencyName,
        z: d => d.travelMode,
        xLabel: "UPT (millions)",
        yDomain: d3.groupSort(data, D => d3.sum(D, d => d.amount), d => d.agencyName), // sort y by x
        zDomain: ages,
        colors: d3.schemeSpectral[ages.length],
        width,
      })
    

    let chartDiv = document.querySelector("#" + chart_id);
    chartDiv.innerHTML = "";
    chartDiv.append(chart);
}

async function setYearsApi(setYears, metro) {
    let json = await setYearsForMetro(setYears, metro, "UPT");
}

async function setAgencyStat(setStat) {
    let stats = ["Farebox Recovery", "Operating Expense Per Person"];
    setStat(stats);
}

function AgencyStatOption(props) {
    let stat = props.stat;
    return (
        <option value={stat}>{stat}</option>
    )
}

function MetroAreaStackedBarChartAgency(props) {
    const [chart, setChart] = useState([]);
    const [years, setYears] = useState([]);
    // const [stat, setStat] = useState([]);

    let cardId = "metro_card_stacked_bar_agency_" + props.metro.replaceAll(" ","").replaceAll(",","_");
    let selectId = "metro_card_select_agency_" + props.metro.replaceAll(" ","").replaceAll(",","_");

    let stats = ["Farebox Recovery", "Operating Expense Per Person", "Miles per Trip", "Operating Expense per Trip", "Operating Expense per Mile"];
    let stat = stats[0];

    useEffect(() => {
        updateChart();
    }, []);

    
    function updateChart() {
        // if (years.length > 0) {
            // const yearSelect = document.querySelector("#" + selectId);
            stat = document.getElementById(selectId).value;
            console.log("stat selected: " + stat);
            let statresult = getAgencyStatMap(stat);
            console.log("statresult: ");
            console.log(statresult);
            updateStackedBarChartAgency(cardId, chart, setChart, props.metro, statresult);
        //
    }

    return (
        <div className="stacked_bar_chart_div">
            <h5>Statistics by Agency</h5>
            <div>
                <select id={selectId} onChange={updateChart}>
                {stats.map(function(stat) {
                            return <AgencyStatOption stat={stat} />;
                            })
                }
                </select>

            </div>
            <div id={cardId}></div>
        </div>
        
    );
}

function getAgencyStatMap(stat) {
    if (stat === "Farebox Recovery") {
        return {
            'attribute' : 'fareboxRecovery',
            'title' : 'Farebox Recovery Ratio by Agency',
            'xLabel' : 'Farebox Recovery Ratio (%)',
            'valueFunction' : (d) => d.fareboxRecovery * 100
        }
    } else if (stat == 'Operating Expense Per Person') {
        return {
            'attribute' : 'operationCostPerPerson',
            'title' : 'Operating Expense per Person by Agency',
            'xLabel' : 'Operating Expense per Person',
            'valueFunction' : (d) => d.operationCostPerPerson
        }
    } else if (stat == 'Miles per Trip') {
        return {
            'attribute' : 'milesPerTrip',
            'title' : 'Miles per Trip by Agency',
            'xLabel' : 'Miles per Trip',
            'valueFunction' : (d) => d.milesPerTrip
        }
    } else if (stat == 'Operating Expense per Trip') {
        return {
            'attribute' : 'operatingExpensePerTrip',
            'title' : 'Operating Expense per Trip by Agency',
            'xLabel' : 'Operating Expense per Trip',
            'valueFunction' : (d) => d.operatingExpensePerTrip
        }
    } else if (stat == 'Operating Expense per Mile') {
        return {
            'attribute' : 'operatingExpensePerMile',
            'title' : 'Operating Expense per Mile by Agency',
            'xLabel' : 'Operating Expense per Mile',
            'valueFunction' : (d) => d.operatingExpensePerMile
        }
    }

}

async function updateStackedBarChartAgency(chart_id, chart, setChart, metro, stat) {
    let json = await setStackedBartChartAgency(setChart, metro)
    let data = json;
    let width = 1500;
    // let ages = [{0: "CB"}, {1: "MB"}, {2: "TB"}, {3: "LR"}, {4: "HR"}, {5: "DR"}];
    let s = new Set();
    for (var i = 0; i < data.length; i++) {
        var datum = data[i];
        s.add(datum.travelMode);
    }
    let ages = [];
    s.forEach(a => { ages.push(a);
                      });
    
    
    chart = StackedBarChart(data, {
        x: stat.valueFunction,
        y: d => d.agencyName,
        z: d => d.travelMode,
        xLabel: stat.xLabel,
        yDomain: d3.groupSort(data, D => d3.sum(D, stat.valueFunction), d => d.agencyName), // sort y by x
        zDomain: ages,
        colors: d3.schemeSpectral[ages.length],
        width,
      })
    

    let chartDiv = document.querySelector("#" + chart_id);
    chartDiv.innerHTML = "";
    chartDiv.append(chart);
}



const domContainer = document.querySelector("#app");
const root = ReactDOM.createRoot(domContainer);

root.render(<OurApp />);
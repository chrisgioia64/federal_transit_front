
const useState = React.useState;
const useEffect = React.useEffect;

function OurApp() {
    return (
        <div>
            <SearchComponent/>
            <Header/>
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
            {show && <MetroAreaTransitChart metro={props.metro} />}
            {show && <MetroAreaStackedBarChart metro={props.metro} />}
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
            {show && <MetroAreaTable metro={props.metro} key={props.metro} />}
            {show && <MetroAreaTransitChart metro={props.metro} />}
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

    console.log("series:" + series);
    console.log("labels: " + labels);

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
    let width = 800;
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
        x: d => d.amount / 1000,
        y: d => d.agencyName,
        z: d => d.travelMode,
        xLabel: "UPT (k)",
        yDomain: d3.groupSort(data, D => d3.sum(D, d => d.amount), d => d.agencyName), // sort y by x
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
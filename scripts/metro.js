
const useState = React.useState;
const useEffect = React.useEffect;

function OurApp() {
    return (
        <div>
            <Header/>
            <StateAreaCards/>
        </div>
    )
}

function Header() {
    return <h1>States</h1>
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

    return (
        <div className="state_card" id={divId}>
        <p className="state_title">{props.state}</p>
        <MetroAreaCards state={props.state} key={props.state} />
     </div>)
}

function MetroAreaCards(props) {
    const [metros, setMetros] = useState([]);

    useEffect(() => {
        setMetroAPI(setMetros, props.state);
    }, [])

    return (
        <ul>
            {metros.map(function(metro) {
                        return <MetroAreaCard metro={metro}
                                   state={props.state}
                                   key={metro}/>;
                    })
            }
        </ul>
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
                  <td className="table_col_per_capita">{perCapita}</td>
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
    console.log("data: " + data);
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
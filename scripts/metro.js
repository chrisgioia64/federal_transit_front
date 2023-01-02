
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
        console.log("show: " + show);
    }

    return (
        <div id={divId} className="metro_card">
        <div className="metro_card_title">
        <button onClick={toggleDisplay} className="btn btn-link" type="button" data-toggle="collapse" data-target={containerIdHash} aria-expanded="true" aria-controls={containerId}>
          {props.metro}
        </button>

        </div>
        <div className="metro_card_content collapse show" id={containerId}
            data-parent={divIdHash}>
            {show && <MetroAreaTable metro={props.metro} key={props.metro} />}
        </div>
        </div>)
}

function MetroAreaTable(props) {
    const [metros, setMetros] = useState([]);

    if (props.metro.startsWith("")) {
        useEffect(() => {
            setMetroInfoAPI(setMetros, props.metro);
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
    return (
        <tr>
                <td className="table_col_attribute">{row.statisticName}</td>
                  <td className="table_col_total">{row.totalAmount.toLocaleString()}</td>
                  <td className="table_col_total_rank">{row.totalRank}</td>
                  <td className="table_col_per_capita">{perCapita}</td>
                  <td className="table_col_per_capita_rank">{row.perCapitaRank}</td>
        </tr>
    )
}

const domContainer = document.querySelector("#app");
const root = ReactDOM.createRoot(domContainer);

root.render(<OurApp />);

const useState = React.useState;
const useEffect = React.useEffect;

function OurApp() {
    let [scatter, setScatter] = useState([]);

    return (
        <div>
            <FormComponent scatterX={scatter} setScatter={setScatter} />
            <ScatterPlotComponent scatter={scatter} />
            <TableComponent scatter={scatter} />
        </div>
    )
}


let json = "";


function FormComponent(props) {
    let setScatter = props.setScatter;
    let scatter = props.scatter;
    

    function clickQuery() {
        const xStatistic = document.querySelector("#x_statistic");
        const xTransit = document.querySelector("#x_transit");
        const yStatistic = document.querySelector("#y_statistic");
        const yTransit = document.querySelector("#y_transit");
        const populationCutoff = document.querySelector("#population_cutoff");
        const pop = parseInt(populationCutoff.value)
    
        console.log(xStatistic.value);

        query_scatterplot(setScatter, xStatistic.value, xTransit.value, yStatistic.value, yTransit.value, pop);
    }

    return (
    <div id="query_panel">
    <table id="query_table">
        <tbody>
        <tr>
            <td className="col_1">X Axis Statistic</td>
            <td className="col_2">
                <select className="form-control" id="x_statistic" name="x_statistic">
                    <option value="UPT">Unlinked Passenger Trips</option>
                    <option value="PASSENGER_MILES">Passenger Miles</option>
                    <option value="OPERATING_EXPENSES">Operating Expenses</option>
                    <option value="FARE">Fares</option>
                    <option value="POPULATION">Population</option>
                </select>
            </td>
        </tr>

        <tr>
            <td className="col_1">X Axis Transit Type</td>
            <td className="col_2">
                <select className="form-control" id="x_transit" name="x_transit">
                    <option value="ALL">All</option>
                    <option value="RAIL">Rail</option>
                    <option value="BUS">Bus</option>
                </select>
            </td>
        </tr>

        <tr>
            <td className="col_1">Y Axis Statistic</td>
            <td className="col_2">
                <select className="form-control" id="y_statistic" name="y_statistic">
                    <option value="UPT">Unlinked Passenger Trips</option>
                    <option value="PASSENGER_MILES">Passenger Miles</option>
                    <option value="OPERATING_EXPENSES">Operating Expenses</option>
                    <option value="FARE">Fares</option>
                    <option value="POPULATION">Population</option>
                </select>
            </td>
        </tr>

        <tr>
            <td className="col_1">Y Axis Transit Type</td>
            <td className="col_2">
                <select className="form-control" id="y_transit" name="y_transit">
                    <option value="ALL">All</option>
                    <option value="RAIL">Rail</option>
                    <option value="BUS">Bus</option>
                </select>
            </td>
        </tr>

        <tr>
            <td className="col_1">Population Cutoff</td>
            <td className="col_2">
                <select className="form-control" id="population_cutoff" name="population_cutoff">
                    <option value="2000000">2,000,000</option>
                    <option value="1000000">1,000,000</option>
                    <option value="500000">500,000</option>
                </select>
            </td>
        </tr>
        
        
        <tr>
            <td className="col_1">

            </td>
            <td className="col_2">
                <input className="btn btn-primary" onClick={clickQuery} id="search_button" type="button" value="Query" />
            </td>
        </tr>
        </tbody>
    </table>
    </div>    
    )
}

function ScatterPlotComponent(props) {
    return (
        <div></div>
    )
}

var datatable = null;

function reloadTable() {
    console.log("reload");
    if (datatable != null) {
        datatable.destroy();
    }

    datatable = new DataTable('#sscatter_table', {
        destroy: true
    });
}

function TableComponent(props) {
    
    useEffect(() => {
        reloadTable();
    }, [props.scatter])

    return (
        <div id="scatter_table_panel">
            <table id="scatter_table">
                <thead>
                    <tr>
                        <th className="scatter_table_col_1">Metropolitan Area</th>
                        <th className="scatter_table_col_2">X Amount</th>
                        <th className="scatter_table_col_3">X Rank</th>
                        <th className="scatter_table_col_4">Y Amount</th>
                        <th className="scatter_table_col_5">Y Rank</th>
                    </tr>
                </thead>
                <tbody>
                {props.scatter.map(function(x, index) {
                        return <TableRowComponent row={x} index={index} />;
                    })
                }
                </tbody>
                
            </table>
        </div>
    )
}

function TableRowComponent(props) {
    let row = props.row;
    let index = props.index;
    let row_shade = "row_odd";
    if (index % 2 == 0) {
        row_shade = "row_even";
    }

    return (
        <tr className={row_shade}>
            <td className="scatter_table_col_1">{row.metropolitanArea}</td>
            <td className="scatter_table_col_2">{row.entity1.totalAmount}</td>
            <td className="scatter_table_col_3">{row.entity1.totalRank}</td>
            <td className="scatter_table_col_4">{row.entity2.totalAmount}</td>
            <td className="scatter_table_col_5">{row.entity2.totalRank}</td>
        </tr>
    )
}

const domContainer = document.querySelector("#app");
const root = ReactDOM.createRoot(domContainer);

root.render(<OurApp />);
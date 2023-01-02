const useState = React.useState;
const useEffect = React.useEffect;

function OurApp() {
    return (
        <div>
            <DatabaseControl/>
        </div>
    )
}

function DatabaseControl() {
    return (<table id="database_table">
        <thead>
            <tr>
                <th className='col_1'>Action</th>
                <th className='col_2'>Result</th>
            </tr>
        </thead>
        <tbody>
            <DatabaseDrop/>
            <DatabaseCreate/>
            <DatabaseMaster/>
            <DatabaseNumAgencies/>
        </tbody>
    </table>)
}

function DatabaseDrop() {
    let [response, setResponse] = useState("None");

    function drop() {
        dropDatabaseAPI(setResponse);
    }

    return (
        <tr>
            <td className='col_1'>
                <button onClick={drop} type="button" class="btn btn-outline-primary">Drop Database</button>
            </td>
            <td className='col_2'>
                <span id='drop_database_text'>{response}</span>
            </td>
        </tr>
    )
}

function DatabaseCreate() {
    let [response, setResponse] = useState("None");

    function create() {
        createDatabaseAPI(setResponse);
    }

    return (
        <tr>
            <td className='col_1'>
                <button onClick={create} type="button" class="btn btn-outline-primary">Create Database</button>
            </td>
            <td className='col_2'>
                <span id='create_database_text'>{response}</span>
            </td>
        </tr>
    )
}

function DatabaseMaster() {
    let [response, setResponse] = useState("None");

    function create() {
        loadMasterAPI(setResponse);
    }

    return (
        <tr>
            <td className='col_1'>
                <button onClick={create} type="button" class="btn btn-outline-primary">Load Master</button>
            </td>
            <td className='col_2'>
                <span id='load_master_text'>{response}</span>
            </td>
        </tr>
    )
}

function DatabaseNumAgencies() {
    let [response, setResponse] = useState("");

    function create() {
        numAgenciesAPI(setResponse);
    }

    return (
        <tr>
            <td className='col_1'>
                <button onClick={create} type="button" class="btn btn-outline-primary">Get # Agencies</button>
            </td>
            <td className='col_2'>
                <span id='load_master_text'>{response}</span>
            </td>
        </tr>
    )
}



const domContainer = document.querySelector("#app");
const root = ReactDOM.createRoot(domContainer);

root.render(<OurApp />);

import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";



function App() {

    const [data, setData] = useState([]);

    const getData = () => {
        axios.get("api/data/GetData")
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useEffect(() => {
        getData();

    }, [])

    const [inputs, setInputs] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("api/data/GetData", inputs)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setInputs({});

            });
    };
    const handleDelete = (id) => {
        axios.delete(`/api/data/GetData/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = String(e.target.value);
        setInputs((prevState) => ({ ...prevState, [name]: value }));
    };







    return (
        <>
            <h2>Home</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input name='name' value={inputs.name || ""} onChange={handleChange} />

                </label>


                <label>
                    Message
                    <input name='message' value={inputs.message || ""} onChange={handleChange} />

                </label>

                <label>
                    Date
                    <input name='date' value={inputs.date || ""} onChange={handleChange} />

                </label>

                <button type='submit'>Submit</button>

            </form>


            {data.map((x) => (
                <>
                    <p>{x.id}</p>
                    <p>{x.name}</p>
                    <p>{x.message}</p>
                    <button onClick={() => handleDelete(x.id) }>Delete</button>
                    <button>Edit</button>
                    <p>{x.date}</p>


                </>
            ))}
        </>
    );


}

export default App;
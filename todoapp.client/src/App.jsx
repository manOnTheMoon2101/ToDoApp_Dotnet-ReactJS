/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Calendar from 'react-calendar';
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

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



    const [calendar, setCalendar] = useState(new Date());

    const newDay = calendar.getDate()
    const newMonth = calendar.getMonth()
    const newYear = calendar.getFullYear()

    const fullDate = `${newYear}-${newMonth}-${newDay}`

    return (
        <>
            
            
           
            
       
            <div className='formDiv'>
                <h2>ToDo App</h2>

               
                <form onSubmit={handleSubmit}>
                    <div className='insertDiv'>
                    <label>

                        <input className='messageI' placeholder="Insert Task..." name='message' value={inputs.message || ""} onChange={handleChange} />

                    </label>
                    <br/>
                <label>

                            {/*  <input placeholder="Your name..." name='name' value={inputs.name || ""} onChange={handleChange} /> */}

                </label>


                    <br />

                <label>
                    
                            {/*   <input name='date' value={inputs.date =  `${fullDate}`|| ""} onChange={handleChange} /> */}

                </label>
                </div>
                        <button className='submitB' type='submit'>Add</button>
                

                </form>
               
                {data.map((x) => (
                    <div className='dataPost'>

                        <div className='content'>
                        <p className='message'>{x.message}</p>
                        

                        </div>
                        
                        <div className='buttons'>
                            <button className='delete' onClick={() => handleDelete(x.id)}><AiOutlineDelete /></button>
                            <button><AiFillEdit /></button>
                        </div>

                        
                      


                    </div>
                ))}
                
            </div>

           
            {/* <Calendar onChange={setCalendar} value={calendar} /> */}
        </>
    );


}

export default App;
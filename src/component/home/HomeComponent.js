import React from 'react'
import './home.style.scss'
import Axios from 'axios'
export default function HomeComponent() {

    const [datalist, setDatalist] = React.useState([]);
    const [countries, setCountries] = React.useState(["India", "Australia"])
    const [newCountry, setNewCountry] = React.useState('');
    const [dropdown, setDropdown] = React.useState(false)

    const setUpData = async () => {
        let resOne = await Axios(`https://covid19.mathdro.id/api/`);
        let first = { country: "World", ...resOne.data }
        let temp = [];
        let i = 0;
        for (i = 0; i < countries.length; i++) {
            let res = await Axios(`https://covid19.mathdro.id/api/countries/${countries[i]}`);
            temp = [...temp, { country: countries[i], ...res.data }];
        }
        let main = [first, ...temp];
        setDatalist([...main])
        console.log("main", main)


    }

    React.useEffect(() => {
        setUpData()

    }, [countries])

    return (
        <div className="home-main">
            <nav className="home-main-header">
                <div className="country-adder">
                    <span onClick={()=>setDropdown(!dropdown)}>{!newCountry ? "Select >" : newCountry}</span>
                    <button onClick={()=>setCountries([...countries, newCountry])}>Add</button>
                    <div style={dropdown?{}:{display: 'none'}} className="dropdown">
                        {
                            listConstant.map(obj =>
                                <p onClick={() => {setNewCountry(obj); setDropdown(false)}}>
                                    {obj}
                                </p>)
                        }

                    </div>
                </div>


            </nav>
            <div className="main-wrapper">
                {
                    datalist.map(obj =>
                        <div className="display-data-row">
                            <h6>{obj.country}</h6>
                            <div className="card-wrapper">
                                <div>
                                    <span>Active Cases:</span>
                                    <span>{obj.confirmed.value - obj.recovered.value}</span>
                                </div>
                                <div>
                                    <span>Confirmed Cases:</span>
                                    <span>{obj.confirmed.value}</span>

                                </div>
                                <div>
                                    <span>Recovered Cases:</span>
                                    <span>{obj.recovered.value}</span>

                                </div>
                                <div>
                                    <span>Deaths:</span>
                                    <span>{obj.deaths.value}</span>

                                </div>

                            </div>


                        </div>
                    )
                }


            </div>

        </div>
    )
}
const listConstant = ["Bangladesh", "France", "Italy", "China", "Japan", "Australia"]
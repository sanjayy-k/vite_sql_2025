import {useState, useEffect} from 'react'
import axios from 'axios'
const App = () => {
  const [api, setApi] = useState([])
  useEffect(() => {
   const getData = async () => {
    try{
     const res = await axios.get('http://localhost:8000/api/inventory')
     console.log(res)
     const result  = res.data; 
     setApi(result)
    }
    catch(error){
        console.log(error)
    }
   }
   
   getData()
  },[])


  return (
    <div>{JSON.stringify(api)}</div>
  )
}

export default App
//frontend -> npm run dev
//server -> npm start


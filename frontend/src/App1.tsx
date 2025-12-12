
import {Routes,Route} from 'react-router-dom'
import App from './App'
import Login from './Login';
import Signup from './Signup';
import Shoppingcart from './components/Shoppingcart';
import Bill from './components/Bill';
import Thankyou from './components/Thankyou';

function App1() {
  return (
   <div className='App'>
    <Routes>
      <Route path="/" element={<Signup />}></Route>
        {/* "/" This is the first Page */}
        <Route path="/App" element={<App />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
         <Route path="/Shoppingcart" element={<Shoppingcart/>}></Route>
         <Route path="/Bill" element={<Bill/>}></Route>
         <Route path="/Thankyou" element={<Thankyou/>}></Route>
    </Routes>
   </div>
  )
}
export default App1;

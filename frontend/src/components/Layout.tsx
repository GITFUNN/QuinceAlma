import { Outlet } from "react-router-dom";
import { Toaster} from 'react-hot-toast';





const Layout = () =>{
    return(
        
        <div>
            <Toaster/>
            <div>
            <Outlet/>
            </div>
        </div>
  
    )
}
export default Layout
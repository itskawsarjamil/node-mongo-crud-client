import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import UpdataUser from "./UpdataUser";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        loader: ()=>fetch("http://localhost:5000/users"),
    },
    {
        path: '/updateuser/:id',
        element: <UpdataUser></UpdataUser>,
        loader:({params})=>fetch(`http://localhost:5000/updateuser/${params.id}`)
    },
]);

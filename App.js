import { useEffect } from "react";
import { initDatabase } from "./src/database/database";
import AppRoutes from "./src/navigation/AppRoutes";
export default function App(){
    useEffect(()=>{
        initDatabase();
    },[]);//Array Vazio =  Executa somente na primeira abertura do app
return <AppRoutes/>;
}
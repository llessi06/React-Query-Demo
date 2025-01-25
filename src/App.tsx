import Persons from "./Persons.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router";
import PersonDetail from "./PersonDetail.tsx";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <Routes>
                     <Route path="/" element={<Persons/>}/>
                   <Route path="/person/:id?" element={<PersonDetail/>}/>
               </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App

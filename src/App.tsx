import AllTimeStats from "./pages/AllTimeStats.tsx"
import Header from './pages/header/Header.tsx'


const App = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Header/>
            <AllTimeStats />
        </div>
    );
};

export default App;

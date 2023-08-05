// Homepage.js

// import Balance from "./Balance";
import Metamask from "./Metamask";

const Homepage = () => {
    return (
        <div className="bg-slate-700 min-h-[100vh]">
            <p className="text-xs text-white">this is the main branch</p>
            {/* <Balance /> */}
            <Metamask />
        </div>
    )
};

export default Homepage;
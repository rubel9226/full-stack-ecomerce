import ColumnThreeImg from "./Components/ColumnThreeImg";
import HomeFooter from "./Components/FooterStats/HomeFooter";
import Gadget from "./Components/GadgetPage/Gadget";
import HeroSlideImg from "./Components/HeroSlideImg";
import MidAllBanner from "./Components/MidAllBanner";
import NewCollection from "./Components/NewCollection";
import Offer24 from "./Components/Offer24";
import Popular from "./Components/Popular";

const HomePage = () => {
    return (
        <div className=''>

            <div className='w-11/12 md:container  mx-auto mt-3 flex flex-col md:flex-row gap-3'>
                <HeroSlideImg />
                <ColumnThreeImg />
            </div>
                
            <div className='w-11/12 md:container  mx-auto mt-3'>
                <Popular />
            </div>

            <div>
                <Offer24 />
            </div>
            
            <div>
                <MidAllBanner />
            </div>

            <div>
                <NewCollection />
            </div>
            
            <div>
                <Gadget />
            </div>

            <div>
                <HomeFooter />
            </div>
            
        </div>
    );
};

export default HomePage;
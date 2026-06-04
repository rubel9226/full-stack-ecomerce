import Footer from "../../../Components/AdminPage/Seared/Footer/Footer";
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

            <div className='px-4 md:px-0 md:container mx-auto mt-3'>
                <HeroSlideImg />
                <ColumnThreeImg />
            </div>
                
            <div className='px-4 md:px-0 md:container  mx-auto mt-3'>
                <Popular />
            </div>

            <div className="">
                <Offer24 />
            </div>
            
            <div className="px-4 md:px-0 md:container  mx-auto mt-3">
                <MidAllBanner />
            </div>

            <div className="px-4 md:px-0 md:container  mx-auto mt-3">
                <NewCollection />
            </div>
            
            <div className="px-4 md:px-0 md:container  mx-auto mt-3">
                <Gadget />
            </div>

            <div>
                <HomeFooter />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
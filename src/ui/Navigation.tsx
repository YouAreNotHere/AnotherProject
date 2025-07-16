import { Link } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import SearchBar from "../components/SearchBar.tsx";


const Navigation = () => {

    return(
            <nav className={"h-[56px]  bg-blue-500 align-center flex justify-start"}>
                <div className={"flex justify-start items-center gap-5 m-auto w-full max-w-[90%]"}>
                    <Link to="/" className={" md:bg-white flex md:text-blue-500 transition-colors duration-300 " +
                        "md:px-[15px] md:py-[4px] md:rounded-xl md:gap-[15px] md:hover:bg-gray-500 md:hover:text-white"}>
                        <span className="text-white hover:text-blue-200 transition-colors duration-300 md:text-inherit">
                            <GoHome className="w-6 h-6" />
                        </span>
                        <p className={"hidden md:flex md:text-inherit"}>
                            Домой
                        </p>
                    </Link>
                    <SearchBar/>
                </div>
            </nav>
        )
}

export default Navigation;
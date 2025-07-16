import useStore from "../shared/store/store.ts";
import { useState, useMemo } from "react";
import {useLocation} from "react-router-dom";
import { GoSearch, GoX } from "react-icons/go";
import PostsList from "./PostsList.tsx";
import Dropdown from "../shared/modals/Dropdown.tsx";

const SearchBar = () => {
    const { text, setText, resetText } = useStore();
    const [isFocused, setIsFocused] = useState(false);

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const isDropdownOpen = useMemo(()=> {
        return isFocused && !!text.trim() && !isHomePage
    },[isHomePage, isFocused, text]);

    return (
        <div className="w-full flex relative md:max-w-[300px]">
            <input
                placeholder="Поиск"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => {
                    setIsFocused(true)

                }}
                onBlur={() => {
                    setTimeout(()=> setIsFocused(false),100 )
                    // setIsDropdownOpen(false)
                }
                }
                className="bg-white w-full p-[10px] max-h-[30px] rounded-xl pr-8"
            />

            <div className="absolute right-[15px] top-1/2 transform -translate-y-1/2 ">
                <GoSearch
                    className={`w-5 h-5 text-gray-700 hover:text-blue-700 transition-all duration-300 
                    ${isFocused ? "opacity-0 scale-90 -z-10" : "opacity-100 scale-100"}`}
                />
                <GoX
                    className={`w-5 h-5 text-gray-700 hover:text-blue-700 transition-all duration-300 absolute 
                    top-0 left-0 cursor-pointer 
                    ${isFocused && text ? "opacity-100 scale-100" : "opacity-0 scale-90 -z-10"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        resetText();
                    }}
                />
            </div>
            {isDropdownOpen &&
            <Dropdown isDropdownOpen={isDropdownOpen}>
                <PostsList isDropdown={isDropdownOpen}/>
            </Dropdown>
            }
        </div>
    );
};

export default SearchBar;
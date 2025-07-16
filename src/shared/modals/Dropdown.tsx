import {useEffect} from "react";

const Dropdown = ({children, isDropdownOpen} : {children: React.ReactNode, isDropdownOpen: boolean}) => {

    useEffect(()=> {
        if (!isDropdownOpen) return

        document.body.style.overflow="hidden";

        return ()=> {
            document.body.style.overflow = "auto";
        };
    },[isDropdownOpen]);

    return(
        <div className={"w-full max-h-[60vh] absolute top-[30px] left-0 bg-gray-100 rounded-xl overflow-y-auto z-10 md:min-w-[70vw]"}>
            {children}
        </div>
    )
};

export default Dropdown;
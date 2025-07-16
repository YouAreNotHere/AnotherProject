import { createPortal } from 'react-dom';
import { GoX } from "react-icons/go";
import {useEffect} from "react";

interface Props {
    children? : React.ReactNode
    setIsModalOpen: React.Dispatch<boolean>
    isModalOpen: boolean
}
const Modal: React.FC<Props> = ({ children, setIsModalOpen, isModalOpen }: Props) => {

    useEffect(()=> {
        if (!isModalOpen) return

        document.body.style.overflow="hidden";

        return ()=> {
            document.body.style.overflow = "auto";
        };
    },[isModalOpen]);

    return createPortal(
        <div className="modal-backdrop fixed top-[0] left-[50%] min-h-[100%] overflow-y-auto
        bg-black/60 max-w-[100%] w-full transform -translate-x-1/2">
            <button
                className={"fixed top-[10px] right-[15px] text-white"}
                onClick={()=> setIsModalOpen(false)}>
                <span className={"text-white hover:text-blue-200 transition-colors duration-300"}>
                    <GoX className={"w-6 h-6"}/>
                </span>
            </button>
            <div className={"overflow-y-auto rounded-xl mt-[40px] bg-white max-w-[90%] m-auto max-h-[350px] md:max-h-[650px]"}>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;
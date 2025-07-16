import { GoArrowUp } from "react-icons/go";

const EndOfContent = ({content, isModal=false} : {content: string, isModal?: boolean}) => {

    const onClickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

    return(
        <div className="flex flex-col items-center justify-center pb-[30px] text-center">
            <h3 className="mt-4 text-lg font-medium text-gray-900">
                Похоже {content} закончились!
            </h3>
            {!isModal &&
                <button className="mt-1 text-sm text-white flex justify-between bg-blue-500 w-[200px] h-[40px]
                p-[10px] items-center rounded-xl hover:bg-gray-500 transition-colors duration-300 cursor-pointer"
                        onClick={onClickHandler}>
                    Вернуться вверх
                    <GoArrowUp className={"w-5 h-5"}/>
                </button>
            }
        </div>
    )
};

export default EndOfContent;
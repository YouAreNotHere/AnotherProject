import {GoAlert, GoHome} from "react-icons/go";

const Error = ({message, isModal=false} : {message: string, isModal?: boolean}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center my-[20px]">
            <GoAlert className={"w-10 h-10"}/>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
                Ошибка!
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {message}
            </p>
            {!isModal &&
                <a href={"/"}
                    className={"mt-[15px] items-center bg-blue-500 text-white h-[40px] w-[250px] flex justify-between " +
                        "p-[15px] rounded-xl transition-colors duration-300  hover:bg-gray-500"}
                >
                <span className={""}>
                  <GoHome className={"w-6 h-6"}/>
                </span>
                    <p>
                        Вернуться на главную
                    </p>
                </a>
            }
        </div>
    );
};

export default Error;
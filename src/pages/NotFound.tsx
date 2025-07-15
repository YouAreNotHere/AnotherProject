import {GoHome} from "react-icons/go";
import {Link} from "react-router-dom"
import image from "../assets/404.jpeg"

const NotFound = () => {
    return(
        <main className={"flex flex-col justify-between items-center gap-[20px] mt-[200px]"}>
            <h1 className={"text-2xl font-bold"}>
                Страница не найдена
            </h1>
            <img src={image} alt={"404 image"}/>
            <Link
                to={"/"}
                className={"mt-[15px] items-center bg-blue-500 text-white h-[40px] w-[250px] flex justify-between " +
                    "p-[15px] rounded-xl transition-colors duration-300  hover:bg-gray-500"}
            >
                <span className={""}>
                  <GoHome className={"w-6 h-6"}/>
                </span>
                <p>
                    Вернуться на главную
                </p>
            </Link>
        </main>
    )
}

export default NotFound;
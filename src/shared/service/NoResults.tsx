import { GoXCircle } from "react-icons/go";

const NoResults = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <GoXCircle className={"w-10 h-10"}/>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
                Ничего не найдено
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Попробуйте изменить запрос
            </p>
        </div>
    );
};

export default NoResults;
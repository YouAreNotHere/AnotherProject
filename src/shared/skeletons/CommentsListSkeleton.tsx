const CommentsListSkeleton = ({isModal} : {isModal: boolean}) => {
    return(
        <div className={`space-y-4 gap-[15px] flex flex-col bg-white rounded-xl ${isModal && "max-h-[350px] max-w-[90%] m-auto"}`}>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 rounded-md animate-pulse bg-blue-50 border-solid flex flex-col gap-[10px] m-0">
                    <div className="h-6 bg-gray-500 rounded min-h-[56px]"></div>
                    <div className="h-4 bg-gray-500 rounded w-full min-h-[24px]"></div>
                    <div className="h-4 bg-gray-500 rounded w-full min-h-[120px]"></div>
                </div>
            ))}
        </div>
    )
};

//СЛИШКОМ БОЛЬШОЙ МАРДЖИН ОТ РЕАЛЬНЫХ КОММЕНТОВ ДО СКЕЛЕТОНА

export default CommentsListSkeleton;
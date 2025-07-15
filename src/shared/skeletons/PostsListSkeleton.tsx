const PostsListSkeleton = ({isDropdown = false} : {isDropdown?: boolean}) => {
    return (
        <div className={`grid grid-cols-1 max-w-[90%] m-auto gap-4 ${!isDropdown && "md:grid-cols-3 xl:grid-cols-4"}`}>
            {[...Array(12)].map((_, index)=>(
                <div key={index} className={"bg-blue-50 p-[10px] gap-[10px] flex flex-col rounded-xl items-start"}>
                    <div className={"min-h-[40px] w-full bg-gray-500 animate-pulse rounded-xl"}/>
                    <div className={"min-h-[80px] w-full bg-gray-500 animate-pulse rounded-xl"}/>
                    <div className={"min-h-[20px] min-w-[50px] bg-gray-500 animate-pulse rounded-xl"}/>
                </div>
            ))}
        </div>
    )
};

export default PostsListSkeleton;
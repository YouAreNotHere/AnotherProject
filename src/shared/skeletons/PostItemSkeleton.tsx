const PostItemSkeleton = () => {
    return(
        <div className={"animate-pulse flex flex-col gap-[15px]"}>
            <div className={"min-h-[96px] w-full bg-gray-500"}/>
            <div className={"min-h-[120px] w-full bg-gray-500"}/>
        </div>
    )
};

export default PostItemSkeleton;
import PostCard from "./PostCard.tsx";

import type {Post} from "../shared/types/IPost.ts";
import useStore from "../shared/store/store.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import getPosts from "../shared/api/getPosts.tsx";
import {useEffect, useMemo, useState} from "react";
import useInfiniteScroll from "../shared/features/useInfiniteScroll.tsx";
import PostsListSkeleton from "../shared/skeletons/PostsListSkeleton.tsx";
import NoResults from "../shared/service/NoResults.tsx";
import EndOfContent from "../shared/service/EndOfContent.tsx";
import Error from "../shared/service/Error.tsx";
import {useTransition, animated} from "react-spring";

const PostsList= ({isDropdown = false} : {isDropdown?: boolean}) => {
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [showSecondSkeleton, setShowSecondSkeleton] = useState(false);
    const {text} = useStore();

    const {data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey:["posts", text],
        queryFn: ({pageParam})=> getPosts(pageParam, text),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: 1,
    });

    const allPosts = useMemo(
        () => data?.pages.flatMap((page) => page.data) || [],
        [data]) ;


    const getElementRef = useInfiniteScroll({
        onScroll: ()=> {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage()
        },
        enabled: hasNextPage,
    });

    useEffect(()=>{
        if (!isLoading) {
            setShowSkeleton(false)
            return
        }
        const timer = setTimeout(()=> setShowSkeleton(true), 300)
        return ()=> clearTimeout(timer);
    },[isLoading])

    useEffect(()=>{
        if (!isFetchingNextPage) {
            setShowSecondSkeleton(false)
            return
        }
        const timer = setTimeout(()=> setShowSecondSkeleton(true), 100)
        return ()=> clearTimeout(timer);
    },[isFetchingNextPage])

    const currentView = useMemo( () => {
        if (showSkeleton) return "loading";
        if (!allPosts.length && !isLoading && !isFetchingNextPage && !error ) return "no results";
        if (allPosts.length > 0) return "posts";
    }
    ,[showSkeleton, isLoading, allPosts, isFetchingNextPage, error])

    const transitions = useTransition(currentView, {
        from: {opacity: 0, transform: "translateY(10px)",},
        enter: {opacity: 1, transform: "translateY(0)",},
        leave: {opacity: 0, transform: "translate(10px)",},
        config: {duration: 300},
    })

    return(
        <section className={"py-[15px]"}>
            {transitions((style,view) => {
                switch (view){
                    case "loading":
                        return (
                            <animated.div style={style}>
                                <PostsListSkeleton isDropdown={isDropdown}/>
                            </animated.div>
                        );
                    case "no results":
                        return (
                            <animated.div style={style}>
                                <NoResults/>
                            </animated.div>
                        )
                    case "posts":
                        return (
                            <animated.div style={style}>
                                <ul className={`grid grid-cols-1 gap-4 w-[90%] m-auto ${!isDropdown && "md:grid-cols-3 xl:grid-cols-4"}`}>
                                    {allPosts.map((post: Post)=>(
                                        <li key={post.id} className={`rounded-xl h-full ${isDropdown ? "bg-white border-solid" : "bg-blue-50"}`}>
                                            <PostCard post={post} isDropdown={isDropdown}/>
                                        </li>
                                    ))}
                                    <li ref={getElementRef}/>
                                </ul>
                            </animated.div>
                        )
                    default:
                        return <Error message={"Что-то пошло не так"}/>
                }
            })}
            {transitions((style) => (
                showSecondSkeleton && hasNextPage && (
                    <animated.div style={style}>
                        <PostsListSkeleton isDropdown={isDropdown}/>
                    </animated.div>
                )
                )
            )}
            {!hasNextPage && allPosts.length > 0 && !isLoading &&
                <EndOfContent content={"посты"} isModal={isDropdown}/>
            }
            {error &&
                <Error message={error.message}/>
            }
        </section>
    )
}

export default PostsList;
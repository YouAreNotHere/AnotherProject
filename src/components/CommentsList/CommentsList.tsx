import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useMemo, useState} from "react";

import type {Comment} from "../../shared/types/IComment.ts";

import CommentItem from "../CommentItem.tsx";
import useInfiniteScroll from "../../shared/features/useInfiniteScroll.tsx";
import CommentsListSkeleton from "../../shared/skeletons/CommentsListSkeleton.tsx";
import Error from "../../shared/features/Error.tsx";
import EndOfContent from "../../shared/features/EndOfContent.tsx";
import getComments from "../../shared/api/getComments.tsx";
import {animated, useTransition} from "react-spring";
import NoResults from "../../shared/features/NoResults.tsx";
import { toast } from 'react-toastify';

const CommentsList = ({postId, isModal=false} : {postId: string, isModal?: boolean}) => {
    const [showSkeleton, setShowSkeleton] = useState(false);

    const {data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
        queryKey:['comments', postId],
        queryFn: ({pageParam})=> getComments(pageParam, postId),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: 1,
        // enabled: isModal && !!postId,
    })

    if (error) {
        toast.error("Ошибка загрузки постов");
    }

    const allComments: Comment[] = useMemo(
        ()=> data?.pages.flatMap((page)=> page.data) || []
        ,[data]);

    const getElementRef = useInfiniteScroll({
        onScroll: () => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage()
        },
        enabled: hasNextPage,
    })

    useEffect(()=>{
        if (!isLoading) {
            setShowSkeleton(false)
            return
        }
        const timer = setTimeout(()=> setShowSkeleton(true), 300)
        return ()=> clearTimeout(timer);
    },[isLoading])

    const currentView = useMemo( () => {
            if (showSkeleton) return "loading";
            if (!allComments.length && !isLoading && !isFetchingNextPage && !error ) return "no results";
            if (allComments.length > 0) return "comments";
        }
        ,[showSkeleton, isLoading, allComments, isFetchingNextPage, error])

    const transitions = useTransition(currentView, {
        from: {opacity: 0, transform: "translateY(10px)",},
        enter: {opacity: 1, transform: "translateY(0)",},
        leave: {opacity: 0, transform: "translate(10px)",},
        config: {duration: 300},
    })

    return(
        <section className={isModal
            ? "items-center"
            : "p-[0px] mt-[30px]" }>
            <h2 className={`text-xl my-[30px] text-start ${isModal && "max-w-[90%] m-auto text-start"}`}>
                Комментарии
            </h2>
            {transitions((style,view) => {
                switch (view){
                    case "loading":
                        return (
                            <animated.div style={style}>
                                <CommentsListSkeleton isModal={isModal}/>
                            </animated.div>
                        );
                    case "no results":
                        return (
                            <animated.div style={style}>
                                <NoResults/>
                            </animated.div>
                        )
                    case "comments":
                        toast("Данные загружены")
                        return (
                            <animated.div style={style}>
                                <ul className={`flex flex-col gap-[15px] ${isModal && "max-w-[90%] m-auto"}`}>
                                    {allComments.map((comment: Comment) =>(
                                        <li key={comment.id} className={"bg-blue-50 rounded-xl"}>
                                            <CommentItem comment={comment}/>
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
            {isFetchingNextPage &&
                <CommentsListSkeleton isModal={isModal}/>
            }
            {!hasNextPage && allComments.length > 0 && !isLoading &&
                <EndOfContent content={"Комментарии"} isModal={isModal}/>
            }
            {error &&
                <Error message={error.message} isModal={isModal}/>
            }
        </section>
    )
}

export default CommentsList;
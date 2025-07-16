import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

import CommentsList from "../components/CommentsList.tsx";
import Error from "../shared/service/Error.tsx";
import PostItemSkeleton from "../shared/skeletons/PostItemSkeleton.tsx";
import getPost from "../shared/api/getPost.tsx";
import {useEffect, useMemo, useState} from "react";
import {animated, useTransition} from "react-spring";
import NoResults from "../shared/service/NoResults.tsx";

const PostPage = () => {
    const { id } = useParams();
    const [showSkeleton, setShowSkeleton] = useState(false);

    const {data, isLoading, error} = useQuery({
        queryKey:["post"],
        queryFn: () => getPost(id),
    });

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
            if (!data && !isLoading && !error ) return "no results";
            if (data && id) return "post";
        }
        ,[showSkeleton, isLoading, data, error, id])

    const transitions = useTransition(currentView, {
        from: {opacity: 0, transform: "translateY(10px)",},
        enter: {opacity: 1, transform: "translateY(0)",},
        leave: {opacity: 0, transform: "translate(10px)",},
        config: {duration: 300},
    })

    return(
        <main className={" min-h-[100vh] p-[15px]"}>
            <div className={"max-w-[90%] m-auto"}>
                {transitions((style,view) => {
                    switch (view){
                        case "loading":
                            return (
                                <animated.div style={style}>
                                    <PostItemSkeleton/>
                                </animated.div>
                            );
                        case "no results":
                            return (
                                <animated.div style={style}>
                                    <NoResults/>
                                </animated.div>
                            )
                        case "post":
                            return (
                                <animated.div style={style}>
                                    <div className={"flex flex-col gap-[15px]"}>
                                        <h1 className={"text-2xl font-bold text-start"}>
                                            {data.title}
                                        </h1>
                                        <p className={"text-base text-start"}>
                                            {data.body}
                                        </p>
                                    </div>
                                </animated.div>
                            )
                        default:
                            return <Error message={"Что-то пошло не так"}/>
                    }
                })}
                {id && data &&
                    <CommentsList postId={id}/>
                }
                {error &&
                    <Error message={error.message}/>
                }
            </div>
        </main>
    )
}

export default PostPage;
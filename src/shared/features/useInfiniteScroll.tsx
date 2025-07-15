import {useEffect, useRef} from "react";

interface Props{
    onScroll: ()=>void
    enabled: boolean
}

const useInfiniteScroll = ({onScroll, enabled} : Props) => {
    const currentElement = useRef(null);

    useEffect(()=>{
        if (!enabled) return

        const observer = new IntersectionObserver(
            ([entry])=> {
                if (entry.isIntersecting) onScroll()
            },
            {threshold: 1.0},
        );

        if (currentElement.current){
            observer.observe(currentElement.current)
        }

        return ()=> {
            if (currentElement.current) observer.unobserve(currentElement.current)
        };
    },[enabled, onScroll])

    return currentElement
}

export default useInfiniteScroll;
import {useState} from "react";

interface Props{
    text: string
    textLimit: number
}

const TruncatedText
    = ({text, textLimit} : Props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const splitedText = text.split(" ");
    if (splitedText.length <= textLimit || !isCollapsed) return  <p className={"text-start"}>{text}</p>;
    return (
        <p className={"text-start"}>
            {splitedText.slice(0, textLimit).join(" ") + " "}
            <button
                className={"text-blue-500 transition-colors duration-300 hover:text-gray-500"}
                onClick={()=> {
                console.log(`Click! ${isCollapsed}`)
                setIsCollapsed(!isCollapsed)
            }}>
                ...read more
            </button>
        </p>
    )
}

export default TruncatedText;
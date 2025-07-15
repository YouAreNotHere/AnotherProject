import type {Comment} from "../shared/types/IComment.ts";
import TruncatedText from "../shared/features/TruncatedText.tsx";

const CommentItem = ({comment}: {comment: Comment}) => {
    const {name, email, body} = comment;

    return(
        <article className={" p-[10px] flex flex-col gap-[10px] h-full justify-between"}>
            <h3 className={"text-lg font-bold line-clamp-4 text-start"}>
                {name}
            </h3>
            <p className={"text-base text-start"}>
                {email}
            </p>
                {<TruncatedText text={body} textLimit={18}/>}
        </article>
    )
}

export default CommentItem;

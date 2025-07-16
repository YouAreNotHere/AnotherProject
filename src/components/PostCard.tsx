import type {Post} from "../shared/types/IPost.ts";
import { GoComment } from "react-icons/go";
import { GoLinkExternal } from "react-icons/go";
import {useState} from "react";
import Modal from "../shared/modals/Modal.tsx";
import CommentsList from "./CommentsList.tsx";

const PostCard = ({post, isDropdown=false}: {post: Post, isDropdown?: boolean}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={"rounded-xl p-[10px] flex flex-col gap-[10px] h-full justify-between"}>
            <h3 className={"text-sm font-bold line-clamp-4 text-start"}>
                {post.title}
            </h3>
            <div className={"flex flex-col gap-[10px]"}>
                <p className={"text-xs line-clamp-5 text-start"}>
                    {post.body}
                </p>
                <div className={"flex gap-[10px] justify-start lg:justify-between xl:justify-start"}>
                    {!isDropdown &&
                        <button
                            onClick={()=> setIsModalOpen(!isModalOpen)}
                            className={"text-xs  transition-colors duration-300 flex items-center text-white cursor-pointer " +
                                "md:bg-blue-500 md:rounded-xl md:py-[5px] md:px-[15px] md:h-[30px] hover:bg-gray-500"
                            }>
                        <span className={"text-blue-500 md:text-white"}>
                            <GoComment className={"w-5 h-5"}/>
                        </span>
                            <span className={"hidden lg:inline ml-2 text-white"}>
                            Комментарии
                        </span>
                        </button>
                    }
                    <a
                        href={`/post/${post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"text-xs text-white transition-colors duration-300 " +
                            "flex items-center md:bg-blue-500 md:rounded-xl md:py-[5px] md:px-[15px] md:h-[30px] hover:bg-gray-500"}>
                        <span className={"text-blue-500 md:text-white"}>
                            <GoLinkExternal className={"w-5 h-5"}/>
                        </span>
                        <span className={"hidden lg:inline ml-2"}>
                            Читать
                        </span>
                    </a>
                </div>
            </div>
            {isModalOpen &&
                <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
                    <CommentsList postId={post.id} isModal={isModalOpen}/>
                </Modal>
            }
        </div>
    )
}

export default PostCard;
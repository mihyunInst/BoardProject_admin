import { useEffect, useState } from "react"

export default function Statistics() {

    const [readCountData, setReadCountData] = useState(null);
    const [likeCountData, setLikeCountData] = useState(null);
    const [commentCountData, setCommentCountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 최대 조회 수 게시글 조회
    const getMaxReadCount = () => {
        fetch("/admin/maxReadCount")
        .then(res => res.json())
        .then(data => {
            setReadCountData(data);
        })
    }

    // 최대 좋아요 수 게시글 조회
    const getMaxLikeCount = () => {
        fetch("/admin/maxLikeCount")
        .then(res => res.json())
        .then(data => {
            setLikeCountData(data);
        })
    }

    // 최대 댓글 수 게시글 조회
    const getCommentCount = () => {
        fetch("/admin/maxCommentCount")
        .then(res => res.json())
        .then(data => {
            setCommentCountData(data);
        })
    }

    useEffect(() => {
        getMaxReadCount();
        getMaxLikeCount();
        getCommentCount();
    },[]);

    useEffect(() => {
        if(readCountData != null && likeCountData != null && commentCountData != null) {
            setIsLoading(false);
        } 
    }, [readCountData, likeCountData, commentCountData]);
      
    
    if(isLoading) {
        return <h1>Loading...</h1>
    } else {

        return (
            <div>
                <section className="statistics-section">
                    <h2>가장 조회수 많은 게시글</h2>
                    <p>게시글 번호 : {readCountData.boardNo}</p>
                    <p>게시글 조회수 : {readCountData.readCount}</p>
                    <p>게시글 제목 : {readCountData.boardTitle}</p>
                    <p>작성자 닉네임 : {readCountData.memberNickname}</p>
                </section>
    
                <section className="statistics-section">
                    <h2>가장 좋아요 많은 게시글</h2>
                    <p>게시글 번호 : {likeCountData.boardNo}</p>
                    <p>게시글 좋아요 수 : {likeCountData.likeCount}</p>
                    <p>게시글 제목 : {likeCountData.boardTitle}</p>
                    <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
                </section>

                <section className="statistics-section">
                    <h2>가장 댓글 많은 게시글</h2>
                    <p>게시글 번호 : {commentCountData.boardNo}</p>
                    <p>게시글 좋아요 수 : {commentCountData.commentCount}</p>
                    <p>게시글 제목 : {commentCountData.boardTitle}</p>
                    <p>작성자 닉네임 : {commentCountData.memberNickname}</p>
                </section>

            </div>
        )
    }

    
}
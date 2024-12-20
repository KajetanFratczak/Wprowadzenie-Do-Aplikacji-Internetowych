import React, {useEffect, useState} from 'react';
import Komentarz from './Komentarz';

interface user
{
    id: number;
    username: string;
    fullName: string;
}

interface KomentarzInterface
 {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: user;
}

const apiURL = "https://dummyjson.com/comments";

const Komentarze = () => {
    
    const [comments, setComments] = useState<KomentarzInterface[]>([]);
    
    useEffect(() => {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) =>{
                setComments(data.comments)
            })
    });

    return (
        <>
        <div>
            {comments.map((comment) => (
            <Komentarz
            key={comment.id}
            id={comment.id}
            body={comment.body}
            postId={comment.postId}
            likes={comment.likes}
            user={comment.user}
            />
            ))}
        </div>
        </>
    );
};

export default Komentarze;
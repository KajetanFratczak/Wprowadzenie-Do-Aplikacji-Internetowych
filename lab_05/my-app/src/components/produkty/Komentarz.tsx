import React, {useState} from 'react';

interface user
{
    id: number;
    username: string;
    fullName: string;
}

interface KomentarzProps
 {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: user;
}

const Komentarz = ({id, body, postId, likes, user}: KomentarzProps) => {
    
    const [likeCount, setLikeCount] = useState(likes);
    
    const handleLike = () => setLikeCount((prev) => prev + 1);
    const handleDislike = () => setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));

    return (
        <>
        <div>
            <div>
                <h3>{user.fullName}</h3>
            </div>
            <p>{body}</p>
            <div>
                <span>Liczba lajków: {likeCount}</span>
                <button onClick={handleLike}>👍</button>
                <button onClick={handleDislike}>👎</button>
            </div>
        </div>
        </>
    );
};

export default Komentarz;
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { CollectionGroup } from "firebase-admin/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

function useOwner() {
    const room = useRoom()
    const user = useUser()
    const [isOwner, setIsOwner] = useState(false);

    const[usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );

    useEffect(() => {
        if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
            // get owners
            const owners = usersInRoom.docs.filter(
                (doc) => doc.data().role == "owner"       
            )

            if (
                owners.some(
                    (owner) => owner.data().userId == user.user?.emailAddresses[0].toString()
                )
            ) {
                setIsOwner(true);
            }
        }
    
    }, [usersInRoom, user])
    return isOwner;
}
export default useOwner;
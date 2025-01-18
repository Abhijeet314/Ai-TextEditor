'use server'

import { auth } from "@clerk/nextjs/server"
import { adminDb } from "../firebase-admin"
import { query } from "firebase/firestore";
import liveblocks from "@/lib/liveblocks";
import { use } from "react";

export async function createNewDocument() {
    // whenever a user click on New Document without login we can use this so it will go directly in clerk login page
    auth.protect()

    const { sessionClaims } = await auth();
    const CollectionRef = adminDb.collection("documents")
    const collections = await CollectionRef.add({
        title: "New Document"
    })

    await adminDb.collection("users").doc(sessionClaims?.email!).collection("rooms").doc(collections.id).set({
        userId: sessionClaims?.email,
        role: "owner",
        createdAt: new Date(),
        roomId: collections.id,
    })

    return {docId: collections.id}

}

export async function deleteDocument(roomId: string) {
    auth.protect()
    console.log("Room deleted" + roomId)

    try {
        // delete the reference document itself
        await adminDb.collection("documents").doc(roomId).delete()

        const query = await adminDb.collectionGroup("rooms").where("roomId", "==", roomId).get()


        // delte the document/room with every user who is logged in that room
        const batch = adminDb.batch()

        // loop through every user's room and delete it
        query.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()

        // delete through liveblock room

        await liveblocks.deleteRoom(roomId);

        return {success: true}
     
    } catch (error) {
        console.log(error)
        return {success : false}
    }
}

export async function InviteUser(roomId: string, email:string ) {
    auth.protect()

    console.log("inviting", email)
    try {
        await adminDb
        .collection("users")
        .doc(email)
        .collection("rooms")
        .doc(roomId)
        .set({
            userId:email,
            role:"editor",
            createdAt: new Date(),
            roomId,
        })
        return {success:true}
    } catch (error) {
        console.log(error)
        return {success:false}
    }
}

export async function removeUserFromRoom(roomId: string, userId: string) {
    auth.protect()

    console.log("Deleting user from the room", userId, roomId)

    try {
        await adminDb
        .collection("users")
        .doc(userId)
        .collection("rooms")
        .doc(roomId)
        .delete()
        return {success: true}
    } catch (error) {
        return {success: false}
        console.log(error)
    }
}
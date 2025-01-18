import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export async function POST(req: NextRequest) {
  // Ensure authentication
  const authResult = await auth();
  if (!authResult.sessionClaims) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }

  const { sessionClaims } = authResult;
  const { room } = await req.json();

  // Check if email and fullname exist in sessionClaims
  const email = sessionClaims?.email;
  const fullname = sessionClaims?.fullname;

  if (!email || !fullname) {
    return NextResponse.json(
      { message: "Invalid session data" },
      { status: 400 }
    );
  }

  const session = liveblocks.prepareSession(email, {
    userInfo: {
      name: fullname,
      email: email,
      avatar: fullname,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }
}

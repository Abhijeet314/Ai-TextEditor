import { User } from "./types";

// we are doing this because next js doesnt know sessionClaims that are stored manually by us so we provide a type of User
// in which we have our sessionClaims which is just extra info about the user such as fullname email and password
declare global {
    interface CustomJwtSessionClaims extends User {}
}
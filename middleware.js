import { NextResponse } from "next/server";

//middleware to check if users are logged in before accessing the user route by calling server at localhost:4000/api/user
export async function middleware(req) {
    console.log(req.nextUrl.pathname);
    if (req.nextUrl.pathname.toLowerCase() == '/satan') {
        return NextResponse.redirect(new URL('https://cdn.discordapp.com/attachments/983003838304886854/1167164721561083965/SlashTheBrand.wav?ex=654d21da&is=653aacda&hm=47b0de2ee7989f89552037b3455e7584dd6708bcf423ac7cb15c5c97f24da915&', req.url));
    }
}
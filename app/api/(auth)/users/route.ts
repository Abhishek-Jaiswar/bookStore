import connectToDb from "@/lib/config/db"
import User from "@/lib/models/user"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connectToDb()
        const users = await User.find()

        return new NextResponse(JSON.stringify(users), { status: 200 })
    } catch (error: any) {
        return new NextResponse("Error while fetching user...!" + error.message,
            { status: 500 }
        )
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json()
        await connectToDb()

        const newUser = new User(body)
        await newUser.save()

        return new NextResponse(JSON.stringify({ message: "User is created...!", user: newUser }), { status: 200 })
    } catch (error: any) {
        return new NextResponse("Error while creating user: " + error, { status: 200 })
    }
}


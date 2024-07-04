import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

const connectToDb = async () => {
    const connectionState = mongoose.connection.readyState

    if (connectionState === 1) {
        console.log("Already connected...!");
        return;
    }

    if (connectionState === 2) {
        console.log("Connecting...!");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI!, {
            dbName: 'next14RestApi',
            bufferCommands: true
        })
        console.log("Database connected successfuly...!");
        
    } catch (error: any) {
        console.log("An Error Occured while connecting...!", error);
        throw new Error("Error: ", error)
    }
}

export default connectToDb
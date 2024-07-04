import mongoose, {Schema, models, model, Document} from 'mongoose'


interface Review {
    reviewer: string
    ratings: string,
    comments: string,
}

interface Dimensions {
    width: number,
    height: number,
    thickness: number,
}

interface Image {
    frontView: string,
    backView: string,
    sideView: string,
}

interface BookTypes extends Document {
    title: string,
    description: string,
    author: string,
    price: number,
    publishedDate: Date,
    reviews: Review[],
    edition: string,
    genre: string[],
    dimensions?: Dimensions,
    availability: string,
    pageCount?: number,
    language?: string
    images: Image[],
    createdAt: Date
}

const dimensionValidator = function(this: any) {
    if (!this.dimensions || !this.dimensions.width || !this.dimensions.height || !this.dimensions.thickness) {
        throw new Error("Dimensions are not available")
    }
}

const bookSchema = new Schema<BookTypes>({
    title: {
        type: String,
        required: [true, "Book title is required!"],
        min: 1,
        max: 255
    },
    description: {
        type: String,
        required: [true, "please give little bit of description"]
    },
    author: {
        type: String,
        required: [true, "Author of the book is required!"]
    },
    price: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    reviews: {
        type: [
            {
                reviewer: String,
                ratings: String,
                comments: String
            }
        ],
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    dimensions: {
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        thickness: {
            type: Number
        },
        validate: [dimensionValidator, "Dimensions are not available!"]
    },
    availability: {
        type: String,
        enum: ["In Stocks", "Out Of Stocks", "Upcoming"],
        required: true
    },
    pageCount: {
        type: Number,
    },
    language: {
        type: String,
    },
    images: {
        type: [
            {
                frontView: String,
                backView: String,
                sideView: String
            }
        ]
    },
    createdAt: {
        type: Date
    }

})

const Book = models.Book as mongoose.Model<BookTypes> || mongoose.model("Book", bookSchema)

export default Book;
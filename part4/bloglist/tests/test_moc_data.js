const initBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

// MOC Blogs Data
const blogsData = {
    blogs: initBlogs,
    listWithOneBlog: [initBlogs[1]],
    listWithTwoBlogs: [initBlogs[0], initBlogs[5]],
    favoriteFromManyBlogs: initBlogs[2],
    favoriteFromOneBlog: initBlogs[1], 
    mostBlogsFromManyBlogs: { author: "Robert C. Martin", blogs: 3 },
    mostBlogsFromOneBlog: { author: 'Edsger W. Dijkstra', blogs: 1 },
    mostLikesFromManyBlogs: { author: "Edsger W. Dijkstra", likes: 17 },
    mostLikesFromOneBlog: { author: 'Edsger W. Dijkstra', likes: 5 },
    blogWithuotLikesProperty: { title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll" },
    blogWithuotTitleProperty: { author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2 },
    blogWithuotUrlProperty: { title: "Type wars", author: "Robert C. Martin", likes: 2 },
}

// MOC Users Data
const invalidUserData = {
    emptyData: {},
    emptyUsername: { username: '', password: '123' },
    emptyPassword: { username: 'abc', password: '' },
    shortUsername: { username: 'ab', password: '123' },
    shortPassword: { username: 'abc', password: '12' },
    duplicateUsername: { username: 'root', password: 'password' } 
}

module.exports = {
    blogsData,
    invalidUserData
}

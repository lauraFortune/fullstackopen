const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
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

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

//======= TESTS - TOTAL LIKES
describe('total likes', () => {
    // @test1 - no blogs
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })
    // @ test2 - 1 blog
    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = blogs.slice(0, 1) // create single item array from blogs array
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(7)
    })
    // @ test3 - many blogs
      test('of a bigger list is calculated correctly', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
      })
})

//======= TESTS - FAVOURTIE BLOG
describe('favourite blog', () => {
    // @ test1 - zero blogs
    test('returns null when the blog list is empty', () => {
        const blogs = []
        const result = listHelper.favouriteBlog(blogs)
        const expected = null
        expect(result).toEqual(expected)
    })
    // @ test2 - 1 blog
    test('returns blog when blogs list has only one blog', () => {
        const listWithOneBlog = blogs.slice(0, 1) // create single item array from blogs array
        const result = listHelper.favouriteBlog(listWithOneBlog)
        const expected = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(expected)
    })
    // @ test3 - many blogs
    test('returns blog with most likes, when list has more than one blogs', () => {
        const result = listHelper.favouriteBlog(blogs)
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(expected)
    })
    // @ test4 - many top favourites
    test('returns the first blog with the most likes, when more than one blogs have the same number of likes', () => {
        const result = listHelper.favouriteBlog(blogs)
        const expected = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(expected)
    })
})

//======= TESTS - MOST BLOGS
describe('most blogs', () => {
    // @ test1 - zero blogs
    test('returns blog when blogs list has only one blog', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        const expected = null
        expect(result).toEqual(expected)
    })
    // @ test2 - 1 blog
    test('returns null when the blog list is empty', () => {
        const listWithOneBlog = blogs.slice(0, 1) // create single item array from blogs ar
        const result = listHelper.mostBlogs(listWithOneBlog)
        const expected = {
            author: "Michael Chan",
            blogs: 1
        }
        expect(result).toEqual(expected)
    })
    // @ test3 - many blogs
    test('returns author name and blog count for author with most blogs, when list has more than one blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const expected = { author: 'Robert C. Martin', blogs: 3 }
        expect(result).toEqual(expected)
    })
})


//======= TESTS - MOST LIKED
describe('most likes', () => {
      // @ test1 - zero blogs
      test('returns null when the blog list is empty', () => {
        const blogs = []
        const result = listHelper.mostLikes(blogs)
        const expected = null
        expect(result).toEqual(expected)
    })
    // @ test2 - 1 blog
    test('returns blog when blogs list has only one blog', () => {
        const listWithOneBlog = blogs.slice(0, 1) // create single item array from blogs array
        const result = listHelper.mostLikes(listWithOneBlog)
        const expected = {
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(expected)
    })
    // @ test3 - many blogs
    test('returns author name and like count for author with most likes, when list has more than one blogs', () => {
        const result = listHelper.mostLikes(blogs)
        const expected = {author: 'Edsger W. Dijkstra', likes: 17}
        expect(result).toEqual(expected)
    })
})
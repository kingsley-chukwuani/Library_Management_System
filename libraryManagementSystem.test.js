// File path: /mnt/data/libraryManagementSystem.test.js

const { Book, User, Library } = require('./libraryManagementSystem');

describe('Library Management System', () => {
    let library;
    let book1, book2;
    let user1;

    beforeEach(() => {
        library = new Library();
        book1 = new Book("Harry Potter", "J.K Rowlings", "123456789", "1");
        book2 = new Book("Things Fall Apart", "Chinua Achebe", "987654321", "2");
        user1 = new User("Alex Kings", "u1");
        
        library.addNewBook(book1);
        library.addNewBook(book2);
        library.registerMember(user1);
    });

    test('should add a new book to the library', () => {
        const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "111111111", "3");
        expect(library.addNewBook(book3)).toBe(true);
        expect(library.books.length).toBe(3);
    });

    test('should register a new member', () => {
        const user2 = new User("Jane Paul", "u2");
        expect(library.registerMember(user2)).toBe(true);
        expect(library.members.length).toBe(2);
    });

    test('should allow a user to borrow a book', () => {
        expect(library.borrowBook("u1", "123456789")).toBe(true);
        expect(user1.borrowedBooks.length).toBe(1);
        expect(book1.isBorrowed()).toBe(true);
    });

    test('should not allow a user to borrow more than 3 books', () => {
        const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "111111111", "3");
        const book4 = new Book("Lord Of The Ring", "J.D. Salinger", "222222222", "4");
        library.addNewBook(book3);
        library.addNewBook(book4);
        
        library.borrowBook("u1", "123456789");
        library.borrowBook("u1", "987654321");
        library.borrowBook("u1", "111111111");
    
        try {
            library.borrowBook("u1", "222222222");
        } catch (e) {
            expect(e.message).toBe("Cannot borrow more than 3 books");
        }
        expect(user1.borrowedBooks.length).toBe(3);
    });

        test('should allow a user to return a book', () => {
            library.borrowBook("u1", "123456789");
            expect(user1.returnBook("123456789")).toBe(true);
            expect(user1.borrowedBooks.length).toBe(0);
            expect(book1.isBorrowed()).toBe(false);
        });

            test('should not allow returning a book not borrowed by the user', () => {
                try {
                    user1.returnBook("987654321");
                } catch (e) {
                    expect(e.message).toBe("Book not found in user's borrowed books");
                }
            
            });
        }) 

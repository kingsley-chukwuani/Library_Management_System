
class Book {
    constructor(title, author, isbn, id) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.id = id;
        this.borrowed = false;
    }

    isBorrowed() {
        return this.borrowed;
    }
}

class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (this.borrowedBooks.length >= 3) {
            throw new Error("Cannot borrow more than 3 books");
        }
        if (!book.isBorrowed()) {
            book.borrowed = true;
            this.borrowedBooks.push(book);
            return true;
        }
        throw new Error("Book is already borrowed");
    }

    returnBook(isbn) {
        const bookIndex = this.borrowedBooks.findIndex(book => book.isbn === isbn);
        if (bookIndex !== -1) {
            this.borrowedBooks[bookIndex].borrowed = false;
            this.borrowedBooks.splice(bookIndex, 1);
            return true;
        }
        throw new Error("Book not found in user's borrowed books");
    }

    peekBook(isbn) {
        return this.borrowedBooks.find(book => book.isbn === isbn) || null;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    addNewBook(book) {
        if (!this.books.some(b => b.isbn === book.isbn)) {
            this.books.push(book);
            return true;
        }
        throw new Error("Book with this ISBN already exists");
    }

    registerMember(user) {
        if (!this.members.some(member => member.id === user.id)) {
            this.members.push(user);
            return true;
        }
        throw new Error("User with this ID already exists");
    }

    borrowBook(userId, isbn) {
        const user = this.members.find(member => member.id === userId);
        const book = this.books.find(b => b.isbn === isbn);
        if (user && book) {
            return user.borrowBook(book);
        }
        throw new Error("User or book not found");
    }
}

// Example usage
const library = new Library();

const book1 = new Book("Harry Potter", "J.K Rowlings", "123456789", "1");
const book2 = new Book("Things Fall Apart", "Chinua Achebe", "987654321", "2");

const user1 = new User("Alex Kings", "u1");

library.addNewBook(book1);
library.addNewBook(book2);

library.registerMember(user1);

try {
    console.log(library.borrowBook("u1", "123456789")); // true
    console.log(user1.borrowedBooks); // [book1]
    console.log(user1.returnBook("123456789")); // true
    console.log(user1.borrowedBooks); // []
} catch (error) {
    console.error(error.message);
}



module.exports = { Library, Book, User };
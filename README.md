## Library Management System

### Overview
This project is a simple Library Management System implemented in JavaScript. It includes classes for `Book`, `User`, and `Library` to handle book borrowing and returning functionalities. Additionally, it includes a set of unit tests to verify the correct behavior of the system.

### Installation
1. Clone the repository:
   ```sh
   git clone `https://github.com/kingsley-chukwuani/Library_Management_System.git`
   ```
2. Navigate to the project directory:
   ```sh
   cd `Library_Management_System`
   ```
3. Install the required dependencies:
   ```sh
   `npm install`
   ```

### Usage

#### Classes

- **Book**: Represents a book in the library.
  - Properties:
    - `title`: Title of the book.
    - `author`: Author of the book.
    - `isbn`: ISBN of the book.
    - `id`: Unique identifier for the book.
    - `borrowed`: Boolean indicating if the book is borrowed.
  - Methods:
    - `isBorrowed()`: Returns if the book is borrowed.

- **User**: Represents a user of the library.
  - Properties:
    - `name`: Name of the user.
    - `id`: Unique identifier for the user.
    - `borrowedBooks`: Array of books borrowed by the user.
  - Methods:
    - `borrowBook(book)`: Allows the user to borrow a book if they haven't reached the limit of 3 books.
    - `returnBook(isbn)`: Allows the user to return a book by ISBN.
    - `peekBook(isbn)`: Checks if the user has borrowed a book by ISBN.

- **Library**: Represents the library.
  - Properties:
    - `books`: Array of books in the library.
    - `members`: Array of registered members.
  - Methods:
    - `addNewBook(book)`: Adds a new book to the library if it doesn't already exist.
    - `registerMember(user)`: Registers a new user if they aren't already registered.
    - `borrowBook(userId, isbn)`: Allows a registered user to borrow a book by ISBN.

#### Example Usage
```js
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
```

### Testing
Unit tests are provided to ensure the system works as expected. The tests are located in `libraryManagementSystem.test.js`.

#### Running Tests
To run the tests, use the following command:
```sh
npm test
```

### Project Structure
```
.
├── libraryManagementSystem.js     # Main library management system code
├── libraryManagementSystem.test.js # Unit tests for the system
├── package.json                   # Project metadata and dependencies
└── README.md                      # Project documentation
```

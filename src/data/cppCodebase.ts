import { CPPFile } from '../types';

export const CPP_CODEBASE: CPPFile[] = [
  {
    id: 'book_hpp',
    name: 'Book.hpp',
    language: 'cpp',
    category: 'header',
    description: 'Header file for the Book class demonstrating Encapsulation with private attributes and public accessors.',
    content: `// ============================================================================
// File: Book.hpp
// Concept: ENCAPSULATION & DATA HIDING
// Description: Header file defining the Book class declaration.
// ============================================================================

#ifndef BOOK_HPP  // Include Guard Start: Prevents this header from being included multiple times
#define BOOK_HPP

#include <string>    // For std::string to store text (title, author, isbn)
#include <iostream>  // For std::cout output streams

// ----------------------------------------------------------------------------
// CLASS DECLARATION: Book
// Demonstrates Encapsulation: Hides member variables behind private access,
// exposing safe public getter and setter methods to inspect or modify state.
// ----------------------------------------------------------------------------
class Book {
private:
    // --- PRIVATE DATA MEMBERS ---
    // These attributes CANNOT be directly accessed or modified outside the class.
    std::string title;        // Title of the book (e.g., "Clean Code")
    std::string author;       // Author of the book (e.g., "Robert C. Martin")
    std::string isbn;         // Unique International Standard Book Number
    bool is_borrowed;         // Availability flag: true if checked out, false if available

public:
    // --- CONSTRUCTORS ---
    // Default constructor: Initializes a book with blank/default values.
    Book();

    // Parameterized constructor: Initializes a book with specific details.
    Book(const std::string& title, const std::string& author, const std::string& isbn);

    // --- GETTER METHODS (ACCESSORS) ---
    // The 'const' keyword at the end guarantees that getter methods will NOT 
    // modify any member variables of the Book object (Const Correctness).
    std::string get_title() const;
    std::string get_author() const;
    std::string get_isbn() const;
    bool get_is_borrowed() const;

    // --- SETTER METHODS (MUTATORS) ---
    // Setters allow controlled modification with built-in validation.
    void set_title(const std::string& t);
    void set_author(const std::string& a);
    void set_isbn(const std::string& i);
    void set_borrowed(bool status);

    // --- UTILITY METHODS ---
    // Prints book metadata to std::cout formatted cleanly.
    void display_info() const;
};

#endif // BOOK_HPP - Include Guard End
`,
    annotations: [
      { line: 20, label: 'Private Data Members', concept: 'Encapsulation', explanation: 'Attributes title, author, isbn, and is_borrowed are hidden from direct external modification.' },
      { line: 36, label: 'Const Accessors', concept: 'Encapsulation & Const Correctness', explanation: 'Getters use "const" at the end to guarantee they will not modify the state of the Book object.' }
    ]
  },
  {
    id: 'book_cpp',
    name: 'Book.cpp',
    language: 'cpp',
    category: 'source',
    description: 'Implementation file for the Book class methods.',
    content: `// ============================================================================
// File: Book.cpp
// Concept: CLASS IMPLEMENTATION & MEMBER INITIALIZER LISTS
// Description: Defines the method bodies declared in Book.hpp.
// ============================================================================

#include "Book.hpp" // Include corresponding header file for declaration

// Default Constructor: Uses Member Initializer List syntax (: field(val))
// Member initializer lists are faster and cleaner than assignment inside the body.
Book::Book() 
    : title(""), author(""), isbn(""), is_borrowed(false) {}

// Parameterized Constructor: Pass strings by const reference (const std::string&)
// Passing by const reference avoids copying heavy string objects into memory.
Book::Book(const std::string& title, const std::string& author, const std::string& isbn)
    : title(title), author(author), isbn(isbn), is_borrowed(false) {}

// Getters: Simply return private attributes safely without modifying anything.
std::string Book::get_title() const {
    return title;
}

std::string Book::get_author() const {
    return author;
}

std::string Book::get_isbn() const {
    return isbn;
}

bool Book::get_is_borrowed() const {
    return is_borrowed;
}

// Setters: Validate input before mutating state (Encapsulation safeguard)
void Book::set_title(const std::string& t) {
    if (!t.empty()) { // Ensure title is not an empty string
        title = t;
    }
}

void Book::set_author(const std::string& a) {
    if (!a.empty()) { // Ensure author is not empty
        author = a;
    }
}

void Book::set_isbn(const std::string& i) {
    if (!i.empty()) { // Ensure ISBN code is not empty
        isbn = i;
    }
}

void Book::set_borrowed(bool status) {
    is_borrowed = status; // Update availability status
}

// Display method: Formats and outputs book information to console
void Book::display_info() const {
    std::cout << "[ISBN: " << isbn << "] \"" << title << "\" by " << author 
              << " (" << (is_borrowed ? "Borrowed" : "Available") << ")" << std::endl;
}
`,
    annotations: []
  },
  {
    id: 'member_hpp',
    name: 'Member.hpp',
    language: 'cpp',
    category: 'header',
    description: 'Header defining Member base class and subclasses RegularMember (limit 3) and PremiumMember (limit 5) demonstrating Inheritance and Polymorphism.',
    content: `// ============================================================================
// File: Member.hpp
// Concept: INHERITANCE, POLYMORPHISM & PURE VIRTUAL FUNCTIONS
// Description: Base class 'Member' and derived subclasses 'RegularMember' & 'PremiumMember'.
// ============================================================================

#ifndef MEMBER_HPP
#define MEMBER_HPP

#include <string>
#include <vector>    // Dynamic array container to hold list of borrowed ISBNs
#include <iostream>

// ----------------------------------------------------------------------------
// BASE CLASS: Member
// Serves as abstract superclass. Uses 'protected:' so derived child classes
// can directly access member attributes while keeping them hidden from main().
// ----------------------------------------------------------------------------
class Member {
protected:
    // 'protected' access specifier: Accessible by this class AND derived subclasses
    std::string name;
    std::string member_id;
    std::vector<std::string> list_of_borrowed_books; // List of active ISBN codes borrowed

public:
    // Base constructor
    Member(const std::string& name, const std::string& member_id);

    // VIRTUAL DESTRUCTOR: Crucial for OOP in C++!
    // Ensures that deleting a derived object (RegularMember) through a base
    // pointer (Member*) properly calls the derived destructor and prevents memory leaks.
    virtual ~Member() = default;

    // Getters
    std::string get_name() const;
    std::string get_member_id() const;
    const std::vector<std::string>& get_borrowed_books() const;
    size_t get_borrowed_count() const;

    // PURE VIRTUAL METHODS (= 0): Makes 'Member' an abstract base class.
    // Every concrete child class MUST override these methods to provide specific behavior.
    virtual size_t get_max_borrow_limit() const = 0; // Regular = 3, Premium = 5
    virtual std::string get_member_type() const = 0;  // Returns string title

    // Common logic shared by all library members
    bool can_borrow() const;
    bool borrow_book(const std::string& isbn);
    bool return_book(const std::string& isbn);

    // Virtual display method (can be overridden by subclasses if needed)
    virtual void display_info() const;
};

// ----------------------------------------------------------------------------
// SUBCLASS 1: RegularMember (Inherits from Member)
// Demonstrates Inheritance: 'public Member' means all public/protected items
// from Member are inherited here. Regular members have a max limit of 3 books.
// ----------------------------------------------------------------------------
class RegularMember : public Member {
public:
    RegularMember(const std::string& name, const std::string& member_id);

    // 'override' keyword: Tells compiler we intend to override base virtual method.
    // Prevents typos in method signatures!
    size_t get_max_borrow_limit() const override;
    std::string get_member_type() const override;
};

// ----------------------------------------------------------------------------
// SUBCLASS 2: PremiumMember (Inherits from Member)
// Premium members receive an expanded borrowing quota of up to 5 books.
// ----------------------------------------------------------------------------
class PremiumMember : public Member {
public:
    PremiumMember(const std::string& name, const std::string& member_id);

    size_t get_max_borrow_limit() const override;
    std::string get_member_type() const override;
};

#endif // MEMBER_HPP
`,
    annotations: [
      { line: 28, label: 'Virtual Destructor', concept: 'Polymorphism', explanation: 'Ensures correct destruction when derived member objects are deleted through base Member pointers.' },
      { line: 38, label: 'Pure Virtual Method', concept: 'Abstraction & Polymorphism', explanation: 'get_max_borrow_limit() = 0 enforces that every member subclass specifies its custom borrowing capacity (3 vs 5).' },
      { line: 52, label: 'Inheritance Syntax', concept: 'Inheritance', explanation: 'class RegularMember : public Member inherits attributes name, member_id, and list_of_borrowed_books.' }
    ]
  },
  {
    id: 'member_cpp',
    name: 'Member.cpp',
    language: 'cpp',
    category: 'source',
    description: 'Implementation file for Member, RegularMember, and PremiumMember.',
    content: `// ============================================================================
// File: Member.cpp
// Concept: INHERITANCE IMPLEMENTATION & POLYMORPHIC BEHAVIOR
// Description: Defines logic for borrowing limits, returning, and member subclasses.
// ============================================================================

#include "Member.hpp"
#include <algorithm> // For std::find algorithm to search inside vectors

// Base Member Constructor
Member::Member(const std::string& name, const std::string& member_id)
    : name(name), member_id(member_id) {}

std::string Member::get_name() const {
    return name;
}

std::string Member::get_member_id() const {
    return member_id;
}

const std::vector<std::string>& Member::get_borrowed_books() const {
    return list_of_borrowed_books;
}

size_t Member::get_borrowed_count() const {
    return list_of_borrowed_books.size();
}

// POLYMORPHIC LIMIT CHECK:
// Calls 'get_max_borrow_limit()', which dynamically evaluates to 3 for Regular
// or 5 for Premium thanks to virtual function dispatch!
bool Member::can_borrow() const {
    return list_of_borrowed_books.size() < get_max_borrow_limit();
}

// Borrow Book Logic
bool Member::borrow_book(const std::string& isbn) {
    if (!can_borrow()) { // Check against specific member limit
        std::cout << "[ERROR] Member " << name << " (" << get_member_type() 
                  << ") has reached the maximum borrow limit of " 
                  << get_max_borrow_limit() << " books!" << std::endl;
        return false;
    }
    list_of_borrowed_books.push_back(isbn); // Add ISBN to member's borrowed list
    return true;
}

// Return Book Logic
bool Member::return_book(const std::string& isbn) {
    // std::find searches the vector from start to end for matching ISBN
    auto it = std::find(list_of_borrowed_books.begin(), list_of_borrowed_books.end(), isbn);
    if (it != list_of_borrowed_books.end()) { // Found match!
        list_of_borrowed_books.erase(it);      // Remove item from vector
        return true;
    }
    return false; // ISBN was not found in member's borrowed list
}

void Member::display_info() const {
    std::cout << "Member [" << member_id << "] " << name 
              << " (" << get_member_type() << ") - Borrowed: " 
              << list_of_borrowed_books.size() << "/" << get_max_borrow_limit() << " books" << std::endl;
}

// ----------------------------------------------------------------------------
// RegularMember Subclass Implementation
// Delegates constructor initialization to parent Member class via Member(name, member_id).
// ----------------------------------------------------------------------------
RegularMember::RegularMember(const std::string& name, const std::string& member_id)
    : Member(name, member_id) {}

size_t RegularMember::get_max_borrow_limit() const {
    return 3; // Enforces max limit of 3 books for Regular Members
}

std::string RegularMember::get_member_type() const {
    return "Regular Member";
}

// ----------------------------------------------------------------------------
// PremiumMember Subclass Implementation
// Delegates constructor initialization to parent Member class.
// ----------------------------------------------------------------------------
PremiumMember::PremiumMember(const std::string& name, const std::string& member_id)
    : Member(name, member_id) {}

size_t PremiumMember::get_max_borrow_limit() const {
    return 5; // Enforces max limit of 5 books for Premium Members
}

std::string PremiumMember::get_member_type() const {
    return "Premium Member";
}
`,
    annotations: []
  },
  {
    id: 'abstract_library_hpp',
    name: 'AbstractLibrary.hpp',
    language: 'cpp',
    category: 'header',
    description: 'Header for abstract base class AbstractLibrary defining common library interface operations using Pure Virtual Functions.',
    content: `// ============================================================================
// File: AbstractLibrary.hpp
// Concept: INTERFACE ABSTRACTION
// Description: Abstract interface class defining required library operations.
// ============================================================================

#ifndef ABSTRACT_LIBRARY_HPP
#define ABSTRACT_LIBRARY_HPP

#include "Book.hpp"
#include <string>

// ----------------------------------------------------------------------------
// ABSTRACT CLASS / INTERFACE: AbstractLibrary
// An abstract class contains at least one pure virtual function (= 0).
// It cannot be instantiated directly. Instead, it acts as a contract/interface
// that concrete library classes (like MyLibrary) MUST implement.
// ----------------------------------------------------------------------------
class AbstractLibrary {
public:
    // Virtual destructor guarantees clean polymorphic object cleanup
    virtual ~AbstractLibrary() = default;

    // --- PURE VIRTUAL INTERFACE METHODS ---
    // Pure virtual functions (= 0) specify WHAT operations a library must offer,
    // leaving the HOW (implementation) up to derived classes.
    virtual bool add_book(const Book& book) = 0;
    virtual bool borrow_book(const std::string& member_id, const std::string& isbn) = 0;
    virtual bool return_book(const std::string& member_id, const std::string& isbn) = 0;
};

#endif // ABSTRACT_LIBRARY_HPP
`,
    annotations: [
      { line: 21, label: 'Pure Virtual Functions', concept: 'Abstraction', explanation: 'virtual bool fn() = 0 makes AbstractLibrary an abstract class. Concrete subclasses MUST implement all 3 methods.' }
    ]
  },
  {
    id: 'book_repository_hpp',
    name: 'BookRepository.hpp',
    language: 'cpp',
    category: 'header',
    description: 'BookRepository wrapper class around a standard container (std::unordered_map) for composition inside MyLibrary.',
    content: `// ============================================================================
// File: BookRepository.hpp
// Concept: CONTAINER WRAPPER & COMPOSITION COMPONENT
// Description: Manages catalog of Book objects using std::unordered_map.
// ============================================================================

#ifndef BOOK_REPOSITORY_HPP
#define BOOK_REPOSITORY_HPP

#include "Book.hpp"
#include <unordered_map> // Hash map container for O(1) average lookup speed
#include <vector>
#include <optional>

// ----------------------------------------------------------------------------
// CLASS DECLARATION: BookRepository
// Encapsulates standard template library container (unordered_map).
// Maps ISBN string key -> Book object value.
// ----------------------------------------------------------------------------
class BookRepository {
private:
    // Hash map storing books by their unique ISBN string key
    std::unordered_map<std::string, Book> books;

public:
    // Repository CRUD operations
    bool add_book(const Book& book);
    bool has_book(const std::string& isbn) const;
    Book* get_book_ptr(const std::string& isbn);
    const Book* get_book_ptr(const std::string& isbn) const;
    bool remove_book(const std::string& isbn);
    std::vector<Book> get_all_books() const;
    size_t size() const;
};

#endif // BOOK_REPOSITORY_HPP
`,
    annotations: [
      { line: 20, label: 'Standard Container Delegate', concept: 'Composition & Container Delegation', explanation: 'BookRepository delegates storage management to std::unordered_map<std::string, Book> for O(1) ISBN lookups.' }
    ]
  },
  {
    id: 'book_repository_cpp',
    name: 'BookRepository.cpp',
    language: 'cpp',
    category: 'source',
    description: 'Implementation file for BookRepository operations.',
    content: `// ============================================================================
// File: BookRepository.cpp
// Concept: CONTAINER DELEGATION & HASH MAP MANAGEMENT
// Description: Implementation of book storage and retrieval methods.
// ============================================================================

#include "BookRepository.hpp"

// Add Book to Repository
bool BookRepository::add_book(const Book& book) {
    if (has_book(book.get_isbn())) {
        return false; // Reject duplicate ISBNs
    }
    books[book.get_isbn()] = book; // Insert into unordered_map
    return true;
}

// Check if book exists in catalog
bool BookRepository::has_book(const std::string& isbn) const {
    return books.find(isbn) != books.end();
}

// Return mutable pointer to Book object inside hash map
Book* BookRepository::get_book_ptr(const std::string& isbn) {
    auto it = books.find(isbn);
    if (it != books.end()) {
        return &(it->second); // Return address of Book object stored in map value
    }
    return nullptr; // Return nullptr if ISBN does not exist
}

// Return const pointer to Book object (read-only inspect)
const Book* BookRepository::get_book_ptr(const std::string& isbn) const {
    auto it = books.find(isbn);
    if (it != books.end()) {
        return &(it->second);
    }
    return nullptr;
}

// Erase book from repository
bool BookRepository::remove_book(const std::string& isbn) {
    return books.erase(isbn) > 0;
}

// Gather vector list of all books in catalog
std::vector<Book> BookRepository::get_all_books() const {
    std::vector<Book> result;
    result.reserve(books.size()); // Pre-allocate memory capacity for performance
    for (const auto& pair : books) {
        result.push_back(pair.second); // Copy Book value from map pair
    }
    return result;
}

// Total number of books in catalog
size_t BookRepository::size() const {
    return books.size();
}
`,
    annotations: []
  },
  {
    id: 'mylibrary_hpp',
    name: 'MyLibrary.hpp',
    language: 'cpp',
    category: 'header',
    description: 'Header for MyLibrary class implementing AbstractLibrary, containing BookRepository via Composition, managing Members via Aggregation, and orchestrating book borrowings via Association.',
    content: `// ============================================================================
// File: MyLibrary.hpp
// Concept: SYSTEM INTEGRATION (COMPOSITION, AGGREGATION & ASSOCIATION)
// Description: Main Library controller implementing AbstractLibrary interface.
// ============================================================================

#ifndef MY_LIBRARY_HPP
#define MY_LIBRARY_HPP

#include "AbstractLibrary.hpp"
#include "BookRepository.hpp"
#include "Member.hpp"
#include <unordered_map>
#include <memory>      // For std::shared_ptr and std::make_shared
#include <vector>

// ----------------------------------------------------------------------------
// CLASS DECLARATION: MyLibrary
// Realizes AbstractLibrary interface. Combines:
// 1. Composition: Holds BookRepository object directly (MyLibrary owns Repository).
// 2. Aggregation: Holds collection of std::shared_ptr<Member> (Members can exist independently).
// 3. Association: Connects Member and Book during borrow_book() / return_book().
// ----------------------------------------------------------------------------
class MyLibrary : public AbstractLibrary {
private:
    // COMPOSITION: 'repository' lifetime is strictly tied to MyLibrary.
    BookRepository repository; 

    // AGGREGATION: Shared pointers store registered Member instances.
    // Member objects can exist independently outside of MyLibrary.
    std::unordered_map<std::string, std::shared_ptr<Member>> members;

public:
    MyLibrary();
    ~MyLibrary() override = default;

    // --- MEMBER REGISTRATION ---
    bool register_member(std::shared_ptr<Member> member);
    std::shared_ptr<Member> get_member(const std::string& member_id) const;

    // --- IMPLEMENTING ABSTRACTLIBRARY INTERFACE ---
    // Must override all pure virtual methods from AbstractLibrary
    bool add_book(const Book& book) override;
    bool borrow_book(const std::string& member_id, const std::string& isbn) override;
    bool return_book(const std::string& member_id, const std::string& isbn) override;

    // --- UTILITY DISPLAY & ACCESSORS ---
    void display_catalog() const;
    void display_members() const;
    const BookRepository& get_repository() const;
};

#endif // MY_LIBRARY_HPP
`,
    annotations: [
      { line: 25, label: 'Composition', concept: 'Composition', explanation: 'BookRepository is owned directly inside MyLibrary. Lifetime is strictly tied to MyLibrary.' },
      { line: 29, label: 'Aggregation', concept: 'Aggregation', explanation: 'members map stores shared pointers to Member. Members can exist outside or come and go.' },
      { line: 39, label: 'Association Orchestration', concept: 'Association', explanation: 'borrow_book connects a Member object reference with a Book object reference, updating state on both sides.' }
    ]
  },
  {
    id: 'mylibrary_cpp',
    name: 'MyLibrary.cpp',
    language: 'cpp',
    category: 'source',
    description: 'Implementation file for MyLibrary operations.',
    content: `// ============================================================================
// File: MyLibrary.cpp
// Concept: INTERFACE IMPLEMENTATION & OBJECT ASSOCIATIONS
// Description: Orchestrates member registration, book borrowing, and returns.
// ============================================================================

#include "MyLibrary.hpp"
#include <iostream>

MyLibrary::MyLibrary() {}

// Register a member into the system (Aggregation)
bool MyLibrary::register_member(std::shared_ptr<Member> member) {
    if (!member || members.find(member->get_member_id()) != members.end()) {
        std::cout << "[INFO] Member ID " << (member ? member->get_member_id() : "null") << " already registered or invalid." << std::endl;
        return false;
    }
    members[member->get_member_id()] = member; // Store shared pointer in map
    std::cout << "[SUCCESS] Registered " << member->get_member_type() << ": " << member->get_name() << " [" << member->get_member_id() << "]" << std::endl;
    return true;
}

// Retrieve shared pointer to a registered member
std::shared_ptr<Member> MyLibrary::get_member(const std::string& member_id) const {
    auto it = members.find(member_id);
    if (it != members.end()) {
        return it->second;
    }
    return nullptr;
}

// Add book to repository (Delegates to BookRepository composition component)
bool MyLibrary::add_book(const Book& book) {
    bool success = repository.add_book(book);
    if (success) {
        std::cout << "[SUCCESS] Added Book to Repository: \"" << book.get_title() << "\" [ISBN: " << book.get_isbn() << "]" << std::endl;
    } else {
        std::cout << "[ERROR] Book with ISBN " << book.get_isbn() << " already exists in repository." << std::endl;
    }
    return success;
}

// --- BORROW BOOK METHOD (DEMONSTRATES ASSOCIATION) ---
// Links a specific Member object with a specific Book object in memory.
bool MyLibrary::borrow_book(const std::string& member_id, const std::string& isbn) {
    // Step 1: Find Member in aggregation map
    auto member = get_member(member_id);
    if (!member) {
        std::cout << "[ERROR] Borrow failed: Member ID " << member_id << " not found." << std::endl;
        return false;
    }

    // Step 2: Find Book in composition repository
    Book* book = repository.get_book_ptr(isbn);
    if (!book) {
        std::cout << "[ERROR] Borrow failed: Book ISBN " << isbn << " not found in repository." << std::endl;
        return false;
    }

    // Step 3: Verify book availability
    if (book->get_is_borrowed()) {
        std::cout << "[ERROR] Borrow failed: Book \"" << book->get_title() << "\" is already borrowed." << std::endl;
        return false;
    }

    // Step 4: Verify polymorphic borrowing limit (3 for Regular, 5 for Premium)
    if (!member->can_borrow()) {
        std::cout << "[ERROR] Borrow failed: Member " << member->get_name() 
                  << " reached maximum limit of " << member->get_max_borrow_limit() << " books." << std::endl;
        return false;
    }

    // Step 5: Execute Association (Update state on both Member and Book sides)
    member->borrow_book(isbn);
    book->set_borrowed(true);

    std::cout << "[SUCCESS] " << member->get_name() << " (" << member->get_member_type() 
              << ") borrowed \"" << book->get_title() << "\". (" 
              << member->get_borrowed_count() << "/" << member->get_max_borrow_limit() << " active)" << std::endl;
    return true;
}

// --- RETURN BOOK METHOD ---
// Unlinks Member and Book object states.
bool MyLibrary::return_book(const std::string& member_id, const std::string& isbn) {
    auto member = get_member(member_id);
    if (!member) {
        std::cout << "[ERROR] Return failed: Member ID " << member_id << " not found." << std::endl;
        return false;
    }

    Book* book = repository.get_book_ptr(isbn);
    if (!book) {
        std::cout << "[ERROR] Return failed: Book ISBN " << isbn << " not in repository." << std::endl;
        return false;
    }

    if (!member->return_book(isbn)) {
        std::cout << "[ERROR] Return failed: Member " << member->get_name() << " does not hold ISBN " << isbn << std::endl;
        return false;
    }

    book->set_borrowed(false); // Mark book as available again
    std::cout << "[SUCCESS] " << member->get_name() << " returned \"" << book->get_title() 
              << "\". Remaining borrowed: " << member->get_borrowed_count() << std::endl;
    return true;
}

void MyLibrary::display_catalog() const {
    std::cout << "\n=========== LIBRARY CATALOG (" << repository.size() << " Books) ===========" << std::endl;
    for (const auto& book : repository.get_all_books()) {
        book.display_info();
    }
    std::cout << "========================================================\n" << std::endl;
}

void MyLibrary::display_members() const {
    std::cout << "\n=========== REGISTERED MEMBERS (" << members.size() << " Members) ===========" << std::endl;
    for (const auto& pair : members) {
        pair.second->display_info();
    }
    std::cout << "=========================================================\n" << std::endl;
}

const BookRepository& MyLibrary::get_repository() const {
    return repository;
}
`,
    annotations: []
  },
  {
    id: 'main_cpp',
    name: 'main.cpp',
    language: 'cpp',
    category: 'main',
    description: 'Driver file demonstrating all OOP principles, member borrowing limits, polymorphic abstraction, and error scenarios.',
    content: `// ============================================================================
// File: main.cpp
// Concept: MAIN DRIVER & COMPLETE OOP SYSTEM HARNESS
// Description: Demonstrates Encapsulation, Inheritance, Polymorphism, Abstraction,
//              Composition, Aggregation, and Association in execution.
// ============================================================================

#include "MyLibrary.hpp"
#include <iostream>
#include <memory> // For std::unique_ptr, std::shared_ptr, std::make_unique, std::make_shared

int main() {
    std::cout << "===================================================\n";
    std::cout << "   C++ LIBRARY MANAGEMENT SYSTEM - OOP TEST HARNESS\n";
    std::cout << "===================================================\n\n";

    // --- POLYMORPHISM & ABSTRACTION DEMONSTRATION ---
    // We instantiate MyLibrary using a smart pointer to the abstract base class (AbstractLibrary).
    // This demonstrates loose coupling: main() depends on the Abstract interface, not raw implementation details.
    std::unique_ptr<AbstractLibrary> library = std::make_unique<MyLibrary>();

    // Using dynamic_cast to access MyLibrary-specific helper functions (like register_member)
    MyLibrary* myLib = dynamic_cast<MyLibrary*>(library.get());

    // ------------------------------------------------------------------------
    // STEP 1. POPULATE CATALOG (Encapsulation + Composition)
    // Books are created using constructors and passed into the library repository.
    // ------------------------------------------------------------------------
    std::cout << "--- 1. Adding Books to Repository ---\n";
    library->add_book(Book("The C++ Programming Language", "Bjarne Stroustrup", "978-0321563842"));
    library->add_book(Book("Design Patterns", "Erich Gamma et al.", "978-0201633610"));
    library->add_book(Book("Clean Code", "Robert C. Martin", "978-0132350884"));
    library->add_book(Book("Effective Modern C++", "Scott Meyers", "978-1491903994"));
    library->add_book(Book("Introduction to Algorithms", "Thomas H. Cormen", "978-0262033848"));
    library->add_book(Book("Structure and Interpretation of Computer Programs", "Harold Abelson", "978-0262510875"));

    // ------------------------------------------------------------------------
    // STEP 2. REGISTER MEMBERS (Inheritance: Regular vs Premium Subclasses)
    // Demonstrates Subclassing: Alice is a RegularMember (limit 3 books).
    // Bob is a PremiumMember (limit 5 books).
    // ------------------------------------------------------------------------
    std::cout << "\n--- 2. Registering Members (Inheritance) ---\n";
    auto alice = std::make_shared<RegularMember>("Alice Smith", "M001"); // Max 3 books
    auto bob = std::make_shared<PremiumMember>("Bob Jones", "M002");    // Max 5 books

    myLib->register_member(alice);
    myLib->register_member(bob);

    myLib->display_catalog();
    myLib->display_members();

    // ------------------------------------------------------------------------
    // STEP 3. TEST BORROWING LIMITS (Polymorphism)
    // Regular Member Alice attempts to borrow 4 books.
    // The 4th borrow attempt MUST be rejected by the system!
    // ------------------------------------------------------------------------
    std::cout << "--- 3. Testing Regular Member Borrowing Limit (Alice - Max 3) ---\n";
    library->borrow_book("M001", "978-0321563842"); // Borrow 1
    library->borrow_book("M001", "978-0201633610"); // Borrow 2
    library->borrow_book("M001", "978-0132350884"); // Borrow 3
    // 4th borrow attempt: Triggers borrowing limit enforcement!
    library->borrow_book("M001", "978-1491903994"); 

    // ------------------------------------------------------------------------
    // STEP 4. TEST PREMIUM MEMBER BORROWING LIMITS (Bob - Max 5)
    // Premium Member Bob can borrow up to 5 books without error.
    // ------------------------------------------------------------------------
    std::cout << "\n--- 4. Testing Premium Member Borrowing Limit (Bob - Max 5) ---\n";
    library->borrow_book("M002", "978-1491903994"); // Borrow 1
    library->borrow_book("M002", "978-0262033848"); // Borrow 2
    library->borrow_book("M002", "978-0262510875"); // Borrow 3

    // ------------------------------------------------------------------------
    // STEP 5. RETURNING BOOKS & RE-BORROWING
    // Alice returns a book, freeing up her capacity to borrow another.
    // ------------------------------------------------------------------------
    std::cout << "\n--- 5. Returning Books ---\n";
    library->return_book("M001", "978-0321563842"); // Alice returns 1st book
    // Alice now holds 2/3 books, so her 4th book borrow will now SUCCEED!
    std::cout << "Alice attempts borrowing again after returning:\n";
    library->borrow_book("M001", "978-0321563842");

    myLib->display_catalog();
    myLib->display_members();

    std::cout << "===================================================\n";
    std::cout << "   ALL C++ OOP SYSTEM TESTS EXECUTED SUCCESSFULLY!\n";
    std::cout << "===================================================\n";

    return 0; // Return exit code 0 indicating successful execution
}
`,
    annotations: [
      { line: 18, label: 'Polymorphic Object Creation', concept: 'Abstraction & Polymorphism', explanation: 'Using AbstractLibrary pointer to store MyLibrary instance allows runtime polymorphic execution.' }
    ]
  }
];

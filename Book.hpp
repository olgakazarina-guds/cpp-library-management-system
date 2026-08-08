// ============================================================================
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

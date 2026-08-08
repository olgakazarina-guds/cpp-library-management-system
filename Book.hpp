// ============================================================================
// File: Book.hpp
// Concept: ENCAPSULATION & DATA HIDING
// Description: Defines private book attributes and public getters/setters.
// ============================================================================

#ifndef BOOK_HPP  // Include Guard Start: Prevents multi-inclusion errors
#define BOOK_HPP

#include <string>    // For std::string storing book attributes
#include <iostream>  // For std::cout console output

// ----------------------------------------------------------------------------
// CLASS DECLARATION: Book
// Concept (Encapsulation): Hides member variables behind 'private', 
// providing safe public getter and setter functions.
// ----------------------------------------------------------------------------
class Book {
private:
    // PRIVATE DATA MEMBERS (Hidden from external direct access)
    std::string title;        // Book title (e.g., 'Clean Code')
    std::string author;       // Book author (e.g., 'Robert C. Martin')
    std::string isbn;         // Unique ISBN identifier key
    bool is_borrowed;         // Availability flag (true if checked out)

public:
    // Constructors
    Book();
    Book(const std::string& title, const std::string& author, const std::string& isbn);

    // Getters (Accessors) - 'const' guarantees getter will not alter object state
    std::string get_title() const;
    std::string get_author() const;
    std::string get_isbn() const;
    bool get_is_borrowed() const;

    // Setters (Mutators) - Controlled modification with input validation
    void set_title(const std::string& t);
    void set_author(const std::string& a);
    void set_isbn(const std::string& i);
    void set_borrowed(bool status);

    // Utility Method
    void display_info() const;
};

#endif // BOOK_HPP
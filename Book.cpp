// ============================================================================
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
    std::cout << "[ISBN: " << isbn << "] "" << title << "" by " << author 
              << " (" << (is_borrowed ? "Borrowed" : "Available") << ")" << std::endl;
}

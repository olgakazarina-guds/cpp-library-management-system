// ============================================================================
// File: Book.cpp
// Concept: CLASS IMPLEMENTATION & INITIALIZER LISTS
// ============================================================================

#include "Book.hpp"

// Default Constructor: Uses Member Initializer List syntax (: field(val))
Book::Book() 
    : title(""), author(""), isbn(""), is_borrowed(false) {}

// Parameterized Constructor: Pass strings by const reference to avoid unnecessary memory copies
Book::Book(const std::string& title, const std::string& author, const std::string& isbn)
    : title(title), author(author), isbn(isbn), is_borrowed(false) {}

std::string Book::get_title() const { return title; }
std::string Book::get_author() const { return author; }
std::string Book::get_isbn() const { return isbn; }
bool Book::get_is_borrowed() const { return is_borrowed; }

void Book::set_title(const std::string& t) { if (!t.empty()) title = t; }
void Book::set_author(const std::string& a) { if (!a.empty()) author = a; }
void Book::set_isbn(const std::string& i) { if (!i.empty()) isbn = i; }
void Book::set_borrowed(bool status) { is_borrowed = status; }

void Book::display_info() const {
    std::cout << "[ISBN: " << isbn << "] '" << title << "' by " << author 
              << " (" << (is_borrowed ? "Borrowed" : "Available") << ")" << std::endl;
}
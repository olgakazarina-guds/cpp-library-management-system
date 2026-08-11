// ============================================================================
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

// Helper to check if member currently holds a specific book by ISBN
bool Member::has_borrowed_isbn(const std::string& isbn) const {
    return std::find(list_of_borrowed_books.begin(), list_of_borrowed_books.end(), isbn) != list_of_borrowed_books.end();
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

// ============================================================================
// File: Member.cpp
// Concept: POLYMORPHIC LIMIT ENFORCEMENT & SUBCLASS LOGIC
// ============================================================================

#include "Member.hpp"
#include <algorithm>

Member::Member(const std::string& name, const std::string& member_id)
    : name(name), member_id(member_id) {}

std::string Member::get_name() const { return name; }
std::string Member::get_member_id() const { return member_id; }
const std::vector<std::string>& Member::get_borrowed_books() const { return list_of_borrowed_books; }
size_t Member::get_borrowed_count() const { return list_of_borrowed_books.size(); }

// POLYMORPHIC CHECK: Calls get_max_borrow_limit() dynamically (3 vs 5)
bool Member::can_borrow() const {
    return list_of_borrowed_books.size() < get_max_borrow_limit();
}

bool Member::borrow_book(const std::string& isbn) {
    if (!can_borrow()) {
        std::cout << "[ERROR] Member " << name << " (" << get_member_type() 
                  << ") reached maximum borrow limit of " 
                  << get_max_borrow_limit() << " books!" << std::endl;
        return false;
    }
    list_of_borrowed_books.push_back(isbn);
    return true;
}

bool Member::return_book(const std::string& isbn) {
    auto it = std::find(list_of_borrowed_books.begin(), list_of_borrowed_books.end(), isbn);
    if (it != list_of_borrowed_books.end()) {
        list_of_borrowed_books.erase(it);
        return true;
    }
    return false;
}

void Member::display_info() const {
    std::cout << "Member [" << member_id << "] " << name 
              << " (" << get_member_type() << ") - Borrowed: " 
              << list_of_borrowed_books.size() << "/" << get_max_borrow_limit() << " books" << std::endl;
}

// RegularMember (Limit 3)
RegularMember::RegularMember(const std::string& name, const std::string& member_id)
    : Member(name, member_id) {}

size_t RegularMember::get_max_borrow_limit() const { return 3; }
std::string RegularMember::get_member_type() const { return "Regular Member"; }

// PremiumMember (Limit 5)
PremiumMember::PremiumMember(const std::string& name, const std::string& member_id)
    : Member(name, member_id) {}

size_t PremiumMember::get_max_borrow_limit() const { return 5; }
std::string PremiumMember::get_member_type() const { return "Premium Member"; }
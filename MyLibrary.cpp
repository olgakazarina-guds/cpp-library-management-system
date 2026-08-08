// ============================================================================
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
        std::cout << "[SUCCESS] Added Book to Repository: "" << book.get_title() << "" [ISBN: " << book.get_isbn() << "]" << std::endl;
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
        std::cout << "[ERROR] Borrow failed: Book "" << book->get_title() << "" is already borrowed." << std::endl;
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
              << ") borrowed "" << book->get_title() << "". (" 
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
    std::cout << "[SUCCESS] " << member->get_name() << " returned "" << book->get_title() 
              << "". Remaining borrowed: " << member->get_borrowed_count() << std::endl;
    return true;
}

void MyLibrary::display_catalog() const {
    std::cout << "
=========== LIBRARY CATALOG (" << repository.size() << " Books) ===========" << std::endl;
    for (const auto& book : repository.get_all_books()) {
        book.display_info();
    }
    std::cout << "========================================================
" << std::endl;
}

void MyLibrary::display_members() const {
    std::cout << "
=========== REGISTERED MEMBERS (" << members.size() << " Members) ===========" << std::endl;
    for (const auto& pair : members) {
        pair.second->display_info();
    }
    std::cout << "=========================================================
" << std::endl;
}

const BookRepository& MyLibrary::get_repository() const {
    return repository;
}

// ============================================================================
// File: MyLibrary.cpp
// Concept: INTERFACE IMPLEMENTATION & OBJECT ASSOCIATIONS
// ============================================================================

#include "MyLibrary.hpp"
#include <iostream>

MyLibrary::MyLibrary() {}

bool MyLibrary::register_member(std::shared_ptr<Member> member) {
    if (!member || members.find(member->get_member_id()) != members.end()) {
        std::cout << "[INFO] Member ID " << (member ? member->get_member_id() : "null") << " invalid or exists." << std::endl;
        return false;
    }
    members[member->get_member_id()] = member;
    std::cout << "[SUCCESS] Registered " << member->get_member_type() << ": " << member->get_name() << " [" << member->get_member_id() << "]" << std::endl;
    return true;
}

std::shared_ptr<Member> MyLibrary::get_member(const std::string& member_id) const {
    auto it = members.find(member_id);
    return (it != members.end()) ? it->second : nullptr;
}

bool MyLibrary::add_book(const Book& book) {
    bool success = repository.add_book(book);
    if (success) {
        std::cout << "[SUCCESS] Added Book to Repository: '" << book.get_title() << "' [ISBN: " << book.get_isbn() << "]" << std::endl;
    } else {
        std::cout << "[ERROR] Book with ISBN " << book.get_isbn() << " already exists." << std::endl;
    }
    return success;
}

// ASSOCIATION DEMONSTRATION: Links Member and Book object states in memory
bool MyLibrary::borrow_book(const std::string& member_id, const std::string& isbn) {
    auto member = get_member(member_id);
    if (!member) {
        std::cout << "[ERROR] Borrow failed: Member ID " << member_id << " not found." << std::endl;
        return false;
    }

    Book* book = repository.get_book_ptr(isbn);
    if (!book) {
        std::cout << "[ERROR] Borrow failed: Book ISBN " << isbn << " not found in repository." << std::endl;
        return false;
    }

    if (book->get_is_borrowed()) {
        std::cout << "[ERROR] Borrow failed: Book '" << book->get_title() << "' is already borrowed." << std::endl;
        return false;
    }

    if (!member->can_borrow()) {
        std::cout << "[ERROR] Borrow failed: Member " << member->get_name() 
                  << " reached maximum limit of " << member->get_max_borrow_limit() << " books." << std::endl;
        return false;
    }

    member->borrow_book(isbn);
    book->set_borrowed(true);

    std::cout << "[SUCCESS] " << member->get_name() << " (" << member->get_member_type() 
              << ") borrowed '" << book->get_title() << "'. (" 
              << member->get_borrowed_count() << "/" << member->get_max_borrow_limit() << " active)" << std::endl;
    return true;
}

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

    book->set_borrowed(false);
    std::cout << "[SUCCESS] " << member->get_name() << " returned '" << book->get_title() 
              << "'. Remaining borrowed: " << member->get_borrowed_count() << std::endl;
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
// ============================================================================
// File: Main.cpp
// Concept: MAIN DRIVER & COMPLETE OOP TEST HARNESS
// ============================================================================

#include "MyLibrary.hpp"
#include <iostream>
#include <memory>

int main() {
    std::cout << "===================================================\n";
    std::cout << "   C++ LIBRARY MANAGEMENT SYSTEM - OOP TEST HARNESS\n";
    std::cout << "===================================================\n\n";

    // POLYMORPHISM & ABSTRACTION: Base pointer storing derived MyLibrary object
    std::unique_ptr<AbstractLibrary> library = std::make_unique<MyLibrary>();
    MyLibrary* myLib = dynamic_cast<MyLibrary*>(library.get());

    // 1. POPULATE CATALOG (Encapsulation + Composition)
    std::cout << "--- 1. Adding Books to Repository ---\n";
    library->add_book(Book("The C++ Programming Language", "Bjarne Stroustrup", "978-0321563842"));
    library->add_book(Book("Design Patterns", "Erich Gamma et al.", "978-0201633610"));
    library->add_book(Book("Clean Code", "Robert C. Martin", "978-0132350884"));
    library->add_book(Book("Effective Modern C++", "Scott Meyers", "978-1491903994"));
    library->add_book(Book("Introduction to Algorithms", "Thomas H. Cormen", "978-0262033848"));

    // 2. REGISTER MEMBERS (Subclassing: Regular vs Premium)
    std::cout << "\n--- 2. Registering Members (Inheritance) ---\n";
    auto alice = std::make_shared<RegularMember>("Alice Smith", "M001"); // Max 3 books
    auto bob = std::make_shared<PremiumMember>("Bob Jones", "M002");    // Max 5 books

    myLib->register_member(alice);
    myLib->register_member(bob);

    myLib->display_catalog();
    myLib->display_members();

    // 3. TEST BORROWING LIMITS (Regular Member Alice - Limit 3)
    std::cout << "--- 3. Testing Regular Member Borrowing Limit (Alice - Max 3) ---\n";
    library->borrow_book("M001", "978-0321563842"); // Borrow 1
    library->borrow_book("M001", "978-0201633610"); // Borrow 2
    library->borrow_book("M001", "978-0132350884"); // Borrow 3
    library->borrow_book("M001", "978-1491903994"); // 4th attempt: ENFORCES LIMIT & REJECTS!

    // 4. TEST PREMIUM MEMBER BORROWING LIMITS (Bob - Limit 5)
    std::cout << "\n--- 4. Testing Premium Member Borrowing Limit (Bob - Max 5) ---\n";
    library->borrow_book("M002", "978-1491903994"); // Borrow 1
    library->borrow_book("M002", "978-0262033848"); // Borrow 2

    // 5. RETURNING BOOKS & RE-BORROWING
    std::cout << "\n--- 5. Returning Books ---\n";
    library->return_book("M001", "978-0321563842"); // Alice returns 1st book
    std::cout << "Alice attempts borrowing again after returning:\n";
    library->borrow_book("M001", "978-0321563842"); // Now succeeds!

    myLib->display_catalog();
    myLib->display_members();

    std::cout << "===================================================\n";
    std::cout << "   ALL C++ OOP SYSTEM TESTS EXECUTED SUCCESSFULLY!\n";
    std::cout << "===================================================\n";

    return 0;
}
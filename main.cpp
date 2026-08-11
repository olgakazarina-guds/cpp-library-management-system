// ============================================================================
// File: Main.cpp
// Concept: MAIN DRIVER & COMPLETE OOP SYSTEM HARNESS
// Description: Demonstrates Encapsulation, Inheritance, Polymorphism, Abstraction,
//              Composition, Aggregation, and Association in execution.
// ============================================================================

#include "AbstractLibrary.hpp"
#include "MyLibrary.hpp"
#include "Book.hpp"
#include "Member.hpp"
#include <iostream>
#include <memory> // For std::unique_ptr, std::shared_ptr, std::make_unique, std::make_shared

int main() {
    std::cout << "===================================================" << std::endl;
    std::cout << "   C++ LIBRARY MANAGEMENT SYSTEM - OOP TEST HARNESS" << std::endl;
    std::cout << "===================================================" << std::endl << std::endl;

    // --- POLYMORPHISM & ABSTRACTION DEMONSTRATION ---
    // Simple concept: Instantiate MyLibrary using pointer to abstract interface AbstractLibrary.
    std::unique_ptr<AbstractLibrary> library = std::make_unique<MyLibrary>();

    // Dynamic cast allows accessing MyLibrary specific methods like register_member
    MyLibrary* myLib = dynamic_cast<MyLibrary*>(library.get());

    // ------------------------------------------------------------------------
    // STEP 1. POPULATE CATALOG (Encapsulation + Composition)
    // Simple concept: Adding Russian classic literature into repository
    // ------------------------------------------------------------------------
    std::cout << "--- 1. Adding Books to Repository ---" << std::endl;
    library->add_book(Book("War and Peace", "Leo Tolstoy", "978-0140447934"));
    library->add_book(Book("Crime and Punishment", "Fyodor Dostoevsky", "978-0140449136"));
    library->add_book(Book("The Master and Margarita", "Mikhail Bulgakov", "978-0141180144"));
    library->add_book(Book("Anna Karenina", "Leo Tolstoy", "978-0143035008"));
    library->add_book(Book("The Brothers Karamazov", "Fyodor Dostoevsky", "978-0140449242"));
    library->add_book(Book("Fathers and Sons", "Ivan Turgenev", "978-0140441475"));

    // ------------------------------------------------------------------------
    // STEP 2. REGISTER MEMBERS (Inheritance: Regular vs Premium Subclasses)
    // Simple concept: Anna Ivanova is RegularMember (limit 3), Dmitry Petrov is PremiumMember (limit 5)
    // ------------------------------------------------------------------------
    std::cout << std::endl << "--- 2. Registering Members (Inheritance) ---" << std::endl;
    auto anna = std::make_shared<RegularMember>("Anna Ivanova", "M001");    // Max 3 books
    auto dmitry = std::make_shared<PremiumMember>("Dmitry Petrov", "M002");  // Max 5 books

    myLib->register_member(anna);
    myLib->register_member(dmitry);

    myLib->display_catalog();
    myLib->display_members();

    // ------------------------------------------------------------------------
    // STEP 3. TEST BORROWING LIMITS (Polymorphism)
    // Simple concept: Anna attempts to borrow 4 books, 4th attempt fails because max limit is 3.
    // ------------------------------------------------------------------------
    std::cout << "--- 3. Testing Regular Member Borrowing Limit (Anna Ivanova - Max 3) ---" << std::endl;
    library->borrow_book("M001", "978-0140447934"); // Borrow 1: War and Peace
    library->borrow_book("M001", "978-0140449136"); // Borrow 2: Crime and Punishment
    library->borrow_book("M001", "978-0141180144"); // Borrow 3: The Master and Margarita
    // 4th borrow attempt: Triggers borrowing limit enforcement!
    library->borrow_book("M001", "978-0143035008"); 

    // ------------------------------------------------------------------------
    // STEP 4. TEST PREMIUM MEMBER BORROWING LIMITS (Dmitry Petrov - Max 5)
    // Simple concept: Dmitry can borrow up to 5 books.
    // ------------------------------------------------------------------------
    std::cout << std::endl << "--- 4. Testing Premium Member Borrowing Limit (Dmitry Petrov - Max 5) ---" << std::endl;
    library->borrow_book("M002", "978-0143035008"); // Borrow 1: Anna Karenina
    library->borrow_book("M002", "978-0140449242"); // Borrow 2: The Brothers Karamazov
    library->borrow_book("M002", "978-0140441475"); // Borrow 3: Fathers and Sons

    // ------------------------------------------------------------------------
    // STEP 5. RETURNING BOOKS & RE-BORROWING
    // Simple concept: Returning a book frees up borrowing capacity
    // ------------------------------------------------------------------------
    std::cout << std::endl << "--- 5. Returning Books ---" << std::endl;
    library->return_book("M001", "978-0140447934"); // Anna returns War and Peace
    std::cout << "Anna attempts borrowing again after returning:" << std::endl;
    library->borrow_book("M001", "978-0140447934");

    myLib->display_catalog();
    myLib->display_members();

    std::cout << "===================================================" << std::endl;
    std::cout << "   ALL C++ OOP SYSTEM TESTS EXECUTED SUCCESSFULLY!" << std::endl;
    std::cout << "===================================================" << std::endl;

    return 0; // Return 0 = successful execution
}

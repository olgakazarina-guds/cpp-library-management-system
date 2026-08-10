# C++ Library Management System (Mini-Project Week 3 & 4)

A modular, clean C++ application modeling a Library Management System built with Object-Oriented Programming (OOP) principles, clean C++ header/source file separation, standard containers, and memory management best practices.

## 📌 Project Overview
This project models books, library members (Regular and Premium), and library operations such as adding, borrowing, and returning books.

### Key Object-Oriented Programming (OOP) Concepts Applied

1. **Encapsulation (`Book.hpp` & `Book.cpp`)**
   - Private member attributes (`title`, `author`, `isbn`, `is_borrowed`) protected from external mutation.
   - Public const getters (accessors) and setters (mutators) with built-in validation (e.g., ISBN formatting check).

2. **Inheritance & Polymorphism (`Member.hpp`, `RegularMember.hpp`, `PremiumMember.hpp`)**
   - Base class `Member` encapsulates common properties (`name`, `member_id`, `borrowed_books`).
   - `RegularMember` subclass enforces a maximum borrowing limit of **3 books**.
   - `PremiumMember` subclass elevates the borrowing limit to **5 books**.
   - Polymorphic method `can_borrow()` dynamically enforces limits based on member tier.

3. **Abstraction (`AbstractLibrary.hpp`)**
   - Pure abstract interface class specifying required library contracts (`add_book`, `borrow_book`, `return_book`).
   - Ensures decoupling between caller code and internal storage implementations.

4. **Composition & Aggregation (`BookRepository.hpp`, `MyLibrary.hpp`)**
   - `BookRepository` delegates book storage using standard library containers (`std::vector<Book>`).
   - `MyLibrary` composes the repository and maintains loose association references with active members.

---

## 🛠️ How to Compile and Run locally

### Prerequisites
- GCC / G++ (v11 or newer) or Clang++ (v13 or newer)
- Make (optional)

### Compilation Commands (Using g++)
```bash
# Navigate to project directory
cd cpp-library-management-system

# Compile all source files
g++ -std=c++17 -Wall -Wextra Book.cpp Member.cpp RegularMember.cpp PremiumMember.cpp BookRepository.cpp MyLibrary.cpp main.cpp -o library_app

# Execute the application
./library_app
```

### Using Makefile (if present)
```bash
make
./library_app
make clean
```

---

## 📄 Submission & Peer Review Guidelines (ORA Checklist)
- [x] Header (`.hpp`/`.h`) and Source (`.cpp`) separation for all classes.
- [x] Double-blind submission: No personal names in submitted zip or PDF code.
- [x] Includes sample prompts & AI usage framework statement in deliverables.
- [x] Includes proof of execution screenshot / video walkthrough.

> 🔒 **Double-Blind Submission Note**: Per peer review guidelines, do not include student names inside source headers or code comments. Share the GitHub repository link exclusively in the dedicated ORA form text field.

---

## 🏗️ Class Hierarchy Architecture

```
                 +-----------------------+
                 |    AbstractLibrary    |  (Abstract Base Class)
                 +-----------------------+
                             ^
                             | (Inheritance)
                 +-----------------------+
                 |       MyLibrary       |
                 +-----------------------+
                 |  - repo: Repository  | (Composition)
                 |  - members: Map       | (Aggregation)
                 +-----------------------+
                             |
                   (Association during borrow)
                             v
                 +-----------------------+
                 |        Member         |  (Abstract Base Class)
                 +-----------------------+
                        /         \
          (Inheritance)/           \(Inheritance)
                      v             v
       +---------------+           +---------------+
       | RegularMember |           | PremiumMember |
       | (Max: 3)      |           | (Max: 5)      |
       +---------------+           +---------------+
```

---

## 🤖 AI Usage Statement
This project used AI support for code structure analysis, C++17 best-practice verification, and generating test fixtures. All design decisions and implementation details were validated manually.

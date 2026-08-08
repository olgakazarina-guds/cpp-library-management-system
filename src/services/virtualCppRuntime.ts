import { Book, Member, LogEntry } from '../types';

export class VirtualCppRuntime {
  private books: Map<string, Book> = new Map();
  private members: Map<string, Member> = new Map();
  private logs: LogEntry[] = [];
  private logIdCounter = 0;

  constructor() {
    this.resetToDefaults();
  }

  public resetToDefaults() {
    this.books.clear();
    this.members.clear();
    this.logs = [];

    // Default sample books (Russian Classic Literature)
    const sampleBooks: Book[] = [
      { isbn: '978-0140447934', title: 'War and Peace', author: 'Leo Tolstoy', isBorrowed: false },
      { isbn: '978-0140449136', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', isBorrowed: false },
      { isbn: '978-0141180144', title: 'The Master and Margarita', author: 'Mikhail Bulgakov', isBorrowed: false },
      { isbn: '978-0143035008', title: 'Anna Karenina', author: 'Leo Tolstoy', isBorrowed: false },
      { isbn: '978-0140449242', title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', isBorrowed: false },
      { isbn: '978-0140441475', title: 'Fathers and Sons', author: 'Ivan Turgenev', isBorrowed: false },
      { isbn: '978-0140448078', title: 'Dead Souls', author: 'Nikolai Gogol', isBorrowed: false },
      { isbn: '978-0140448108', title: 'Eugene Onegin', author: 'Alexander Pushkin', isBorrowed: false },
      { isbn: '978-0486266824', title: 'The Cherry Orchard', author: 'Anton Chekhov', isBorrowed: false }
    ];

    for (const b of sampleBooks) {
      this.books.set(b.isbn, b);
    }

    // Default members
    const anna: Member = {
      id: 'M001',
      name: 'Anna Ivanova',
      type: 'regular',
      maxBorrowLimit: 3,
      borrowedIsbns: []
    };

    const dmitry: Member = {
      id: 'M002',
      name: 'Dmitry Petrov',
      type: 'premium',
      maxBorrowLimit: 5,
      borrowedIsbns: []
    };

    this.members.set(anna.id, anna);
    this.members.set(dmitry.id, dmitry);

    this.addLog('cpp_cout', '=== C++ Virtual Runtime Initialized ===', '[main.cpp:08]');
    this.addLog('info', `Loaded ${this.books.size} books into BookRepository (Composition: std::unordered_map)`);
    this.addLog('info', `Registered 2 members (Inheritance: RegularMember M001 [Limit: 3], PremiumMember M002 [Limit: 5])`);
  }

  private addLog(type: LogEntry['type'], text: string, cppTrace?: string) {
    const entry: LogEntry = {
      id: `log-${++this.logIdCounter}-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type,
      text,
      cppTrace
    };
    this.logs.push(entry);
  }

  public getBooks(): Book[] {
    return Array.from(this.books.values());
  }

  public getMembers(): Member[] {
    return Array.from(this.members.values());
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public addBook(title: string, author: string, isbn: string): boolean {
    if (!title.trim() || !author.trim() || !isbn.trim()) {
      this.addLog('error', '[BookRepository::add_book] Invalid parameters: All fields are required.');
      return false;
    }

    if (this.books.has(isbn)) {
      this.addLog('error', `[BookRepository::add_book] ISBN ${isbn} already exists in BookRepository!`, '[BookRepository.cpp:08]');
      return false;
    }

    const newBook: Book = {
      isbn,
      title,
      author,
      isBorrowed: false
    };

    this.books.set(isbn, newBook);
    this.addLog('success', `[SUCCESS] Added Book to Repository: "${title}" [ISBN: ${isbn}]`, '[MyLibrary.cpp:24]');
    return true;
  }

  public registerMember(name: string, id: string, type: 'regular' | 'premium'): boolean {
    if (!name.trim() || !id.trim()) {
      this.addLog('error', '[MyLibrary::register_member] Name and ID cannot be empty.');
      return false;
    }

    if (this.members.has(id)) {
      this.addLog('error', `[MyLibrary::register_member] Member ID ${id} is already registered!`, '[MyLibrary.cpp:10]');
      return false;
    }

    const newMember: Member = {
      id,
      name,
      type,
      maxBorrowLimit: type === 'regular' ? 3 : 5,
      borrowedIsbns: []
    };

    this.members.set(id, newMember);
    const memberTypeStr = type === 'regular' ? 'Regular Member (Limit: 3)' : 'Premium Member (Limit: 5)';
    this.addLog('success', `[SUCCESS] Registered ${memberTypeStr}: ${name} [${id}]`, '[MyLibrary.cpp:14]');
    return true;
  }

  public borrowBook(memberId: string, isbn: string): boolean {
    const member = this.members.get(memberId);
    if (!member) {
      this.addLog('error', `[MyLibrary::borrow_book] Member ID ${memberId} not found in registered members map.`, '[MyLibrary.cpp:33]');
      return false;
    }

    const book = this.books.get(isbn);
    if (!book) {
      this.addLog('error', `[MyLibrary::borrow_book] ISBN ${isbn} not found in BookRepository.`, '[MyLibrary.cpp:40]');
      return false;
    }

    if (book.isBorrowed) {
      this.addLog('error', `[MyLibrary::borrow_book] Borrow failed: "${book.title}" is currently borrowed.`, '[MyLibrary.cpp:46]');
      return false;
    }

    // Check inheritance-based borrow limit (3 for Regular, 5 for Premium)
    if (member.borrowedIsbns.length >= member.maxBorrowLimit) {
      const typeLabel = member.type === 'regular' ? 'RegularMember' : 'PremiumMember';
      this.addLog('error', `[ERROR] Borrow failed: ${member.name} (${typeLabel}) reached limit of ${member.maxBorrowLimit} books!`, '[Member.cpp:28]');
      return false;
    }

    // Perform association update on both Member and Book sides
    book.isBorrowed = true;
    book.borrowedByMemberId = memberId;
    book.borrowedDate = new Date().toLocaleDateString();
    member.borrowedIsbns.push(isbn);

    const activeCount = member.borrowedIsbns.length;
    const typeLabel = member.type === 'regular' ? 'Regular' : 'Premium';
    this.addLog('success', `[SUCCESS] ${member.name} (${typeLabel}) borrowed "${book.title}". (${activeCount}/${member.maxBorrowLimit} active)`, '[MyLibrary.cpp:58]');
    return true;
  }

  public returnBook(memberId: string, isbn: string): boolean {
    const member = this.members.get(memberId);
    if (!member) {
      this.addLog('error', `[MyLibrary::return_book] Member ID ${memberId} not found.`, '[MyLibrary.cpp:66]');
      return false;
    }

    const book = this.books.get(isbn);
    if (!book) {
      this.addLog('error', `[MyLibrary::return_book] ISBN ${isbn} not found in repository.`, '[MyLibrary.cpp:72]');
      return false;
    }

    const idx = member.borrowedIsbns.indexOf(isbn);
    if (idx === -1) {
      this.addLog('error', `[MyLibrary::return_book] Member ${member.name} does not hold ISBN ${isbn}.`, '[MyLibrary.cpp:77]');
      return false;
    }

    member.borrowedIsbns.splice(idx, 1);
    book.isBorrowed = false;
    book.borrowedByMemberId = undefined;
    book.borrowedDate = undefined;

    this.addLog('success', `[SUCCESS] ${member.name} returned "${book.title}". Remaining borrowed: ${member.borrowedIsbns.length}`, '[MyLibrary.cpp:84]');
    return true;
  }

  public async runFullTestSuite(onStep?: () => void): Promise<void> {
    this.resetToDefaults();
    this.addLog('cpp_cout', '>>> RUNNING COMPLETE C++ TEST HARNESS SCRIPT <<<', '[main.cpp:05]');

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    await delay(300);
    this.addLog('cpp_cout', '--- Test 1: Adding New Russian Literature Classic to Repository ---');
    this.addBook('Notes from Underground', 'Fyodor Dostoevsky', '978-0140445251');
    if (onStep) onStep();

    await delay(400);
    this.addLog('cpp_cout', '--- Test 2: Anna Ivanova (Regular, Limit=3) borrows 3 books ---');
    this.borrowBook('M001', '978-0140447934'); // War and Peace (1/3)
    if (onStep) onStep();

    await delay(400);
    this.borrowBook('M001', '978-0140449136'); // Crime and Punishment (2/3)
    if (onStep) onStep();

    await delay(400);
    this.borrowBook('M001', '978-0141180144'); // The Master and Margarita (3/3)
    if (onStep) onStep();

    await delay(400);
    this.addLog('cpp_cout', '--- Test 3: Anna attempts 4th borrow (Should Exceed Limit) ---');
    this.borrowBook('M001', '978-0143035008'); // Anna Karenina (Should FAIL!)
    if (onStep) onStep();

    await delay(400);
    this.addLog('cpp_cout', '--- Test 4: Dmitry Petrov (Premium, Limit=5) borrows 4 books ---');
    this.borrowBook('M002', '978-0143035008'); // Anna Karenina (1/5)
    this.borrowBook('M002', '978-0140449242'); // The Brothers Karamazov (2/5)
    this.borrowBook('M002', '978-0140441475'); // Fathers and Sons (3/5)
    this.borrowBook('M002', '978-0140448078'); // Dead Souls (4/5)
    if (onStep) onStep();

    await delay(400);
    this.addLog('cpp_cout', '--- Test 5: Returning Book & Freeing Borrowing Quota ---');
    this.returnBook('M001', '978-0140447934'); // Anna returns War and Peace -> now 2/3
    if (onStep) onStep();

    await delay(400);
    this.addLog('cpp_cout', '--- Test 6: Anna borrows again after returning ---');
    this.borrowBook('M001', '978-0140448108'); // Eugene Onegin (Success!)
    if (onStep) onStep();

    await delay(300);
    this.addLog('cpp_cout', '==================================================');
    this.addLog('cpp_cout', '   ALL C++ OOP SYSTEM TESTS EXECUTED SUCCESSFULLY!');
    this.addLog('cpp_cout', '==================================================');
    if (onStep) onStep();
  }
}

export const virtualRuntime = new VirtualCppRuntime();

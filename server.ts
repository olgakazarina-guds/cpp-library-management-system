import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily or when API key is available
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for AI Code Review & Deliverables Disclosure Assistant
app.post("/api/ai-review", async (req, res) => {
  try {
    const { code, userPrompt } = req.body;
    if (!code) {
      return res.status(400).json({ error: "No C++ code provided for review." });
    }

    const ai = getAi();
    const systemInstruction = `You are a C++ Senior Software Engineer and Computer Science University Professor reviewing a student's C++ Library Management System mini-project.
Analyze the code against the assignment criteria:
1. Encapsulation: Book class attributes (private title, author, isbn) with getter/setter methods and const-correctness.
2. Inheritance: Member base class with RegularMember (max 3 books limit) and PremiumMember (max 5 books limit) subclasses.
3. Abstraction: AbstractLibrary interface with pure virtual functions (add_book, borrow_book, return_book) and virtual destructor.
4. Composition, Aggregation, Association: BookRepository composition in MyLibrary, Member aggregation/registration, and book borrowing association.
5. Modern C++ Best Practices: Standard library containers (std::vector, std::unordered_map), pass-by-const-reference, smart pointers vs raw pointers, header/source separation.

Return your evaluation as structured JSON with fields:
- "overallScore": number (0-100)
- "summary": string (2-3 sentences overview)
- "criteriaFeedback": array of objects with { "category": string, "status": "pass" | "warning" | "fail", "comments": string }
- "keyStrengths": array of strings
- "areasForImprovement": array of strings
- "aiUsageFramework": string (A structured AI Usage Disclosure table/statement documenting how AI was utilized for design, architecture review, and code validation, strictly adhering to assignment guidelines)
- "improvedCodeSnippet": string (optional suggested C++ code fixes if needed)`;

    const promptText = `Student Submission:\n\n\`\`\`cpp\n${code}\n\`\`\`\n\nStudent Additional Note/Question: ${userPrompt || "Please grade according to week 4 requirements."}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const result = JSON.parse(text);
    return res.json(result);
  } catch (err: any) {
    console.error("AI Review Error:", err);
    return res.status(500).json({
      error: err.message || "Failed to process AI code review.",
    });
  }
});

// API Endpoint for C++ OOP Concept Guidance / Tutor
app.post("/api/tutor", async (req, res) => {
  try {
    const { question, topic } = req.body;
    const ai = getAi();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Question: ${question}\nTopic Focus: ${topic || "C++ OOP Principles in Library Management System"}`,
      config: {
        systemInstruction: `You are an expert C++ OOP tutor assisting a student transitioning from Python to C++. Explain concepts clearly with concise code examples comparing Python vs C++ (pointers, references, virtual functions, header/source separation, const correctness). Keep explanations accurate, friendly, and practical.`,
      },
    });

    return res.json({ answer: response.text });
  } catch (err: any) {
    console.error("Tutor Error:", err);
    return res.status(500).json({ error: err.message || "Failed to query AI tutor." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`C++ OOP Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

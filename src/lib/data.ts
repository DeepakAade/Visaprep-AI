export const visaTypes = [
  { value: "f1", label: "F-1 (Student Visa)" },
  { value: "b2", label: "B-2 (Tourism/Visitor Visa)" },
  { value: "h1b", label: "H-1B (Work Visa)" },
  { value: "j1", label: "J-1 (Exchange Visitor)" },
];

export const questionCategories = [
  {
    category: "Personal Background",
    questions: [
      "What is your purpose of travel to the United States?",
      "Why did you choose this particular university/course?",
      "Can you tell me about your family?",
      "What are your plans after you complete your studies/visit?",
    ],
  },
  {
    category: "Financial Status",
    questions: [
      "Who is sponsoring your education/trip?",
      "What is your sponsor's occupation and annual income?",
      "How will you cover your living expenses in the US?",
      "Do you have any proof of funds?",
    ],
  },
  {
    category: "Ties to Home Country",
    questions: [
      "Do you have family in your home country?",
      "Do you own any property or have significant assets here?",
      "Do you have a job offer waiting for you upon your return?",
      "What makes you certain you will return to your home country?",
    ],
  },
];

export const documentChecklists = {
  f1: [
    { id: "f1-1", label: "Passport (valid for at least 6 months)", checked: false },
    { id: "f1-2", label: "Form I-20", checked: false },
    { id: "f1-3", label: "SEVIS I-901 Fee Receipt", checked: false },
    { id: "f1-4", label: "DS-160 Confirmation Page", checked: false },
    { id: "f1-5", label: "Visa Appointment Letter", checked: false },
    { id: "f1-6", label: "Financial Documents (bank statements, sponsorship letter)", checked: false },
    { id: "f1-7", label: "Academic Transcripts and Diplomas", checked: false },
    { id: "f1-8", label: "Standardized Test Scores (TOEFL, IELTS, GRE, GMAT)", checked: false },
  ],
  b2: [
    { id: "b2-1", label: "Passport (valid for at least 6 months)", checked: false },
    { id: "b2-2", label: "DS-160 Confirmation Page", checked: false },
    { id: "b2-3", label: "Visa Appointment Letter", checked: false },
    { id: "b2-4", label: "Proof of financial ability to cover trip costs", checked: false },
    { id: "b2-5", label: "Ties to home country (employment letter, property ownership)", checked: false },
    { id: "b2-6", label: "Travel Itinerary", checked: false },
  ],
  h1b: [
    { id: "h1b-1", label: "Passport (valid for at least 6 months)", checked: false },
    { id: "h1b-2", label: "Form I-797 (Approval Notice)", checked: false },
    { id: "h1b-3", label: "DS-160 Confirmation Page", checked: false },
    { id: "h1b-4", label: "Visa Appointment Letter", checked: false },
    { id: "h1b-5", label: "Employment Verification Letter", checked: false },
    { id: "h1b-6", label: "Educational Degrees and Transcripts", checked: false },
    { id: "h1b-7", label: "Updated Resume/CV", checked: false },
  ],
  j1: [
      { id: "j1-1", label: "Passport (valid for at least 6 months)", checked: false },
      { id: "j1-2", label: "Form DS-2019", checked: false },
      { id: "j1-3", label: "SEVIS I-901 Fee Receipt", checked: false },
      { id: "j1-4", label: "DS-160 Confirmation Page", checked: false },
      { id: "j1-5", label: "Visa Appointment Letter", checked: false },
      { id: "j1-6", label: "Proof of Financial Support", checked: false },
      { id: "j1-7", label: "Program Sponsor's Information", checked: false },
  ]
};

export const mockSavedResponses = [
    {
        id: 1,
        question: "What is your purpose of travel to the United States?",
        answer: "I am going to the United States to pursue a Master's degree in Computer Science at the University of Southern California. I am passionate about AI and machine learning, and USC's program is one of the best in the world.",
        date: "2024-07-20"
    },
    {
        id: 2,
        question: "Who is sponsoring your education?",
        answer: "My parents are sponsoring my education. My father is a software engineer and my mother is a doctor. They have saved enough funds to cover my tuition and living expenses for the entire duration of my program.",
        date: "2024-07-18"
    }
]

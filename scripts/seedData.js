const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/User")
const Section = require("../models/Section")
const Hero = require("../models/Hero")
const About = require("../models/About")
const Experience = require("../models/Experience")
const Education = require("../models/Education")
const Skills = require("../models/Skills")
const Project = require("../models/Project")
const Volunteer = require("../models/Volunteer")
const Publication = require("../models/Publication")
const Patent = require("../models/Patent")
const Award = require("../models/Award")
const TestScore = require("../models/TestScore")
const Language = require("../models/Language")
const Certification = require("../models/Certification")
const Course = require("../models/Course")

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio")
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Section.deleteMany({})
    await Hero.deleteMany({})
    await About.deleteMany({})
    await Experience.deleteMany({})
    await Education.deleteMany({})
    await Skills.deleteMany({})
    await Project.deleteMany({})
    await Volunteer.deleteMany({})
    await Publication.deleteMany({})
    await Patent.deleteMany({})
    await Award.deleteMany({})
    await TestScore.deleteMany({})
    await Language.deleteMany({})
    await Certification.deleteMany({})
    await Course.deleteMany({})

   

    // Create sections
    const sections = [
      { name: "hero", isEnabled: true, displayOrder: 1 },
      { name: "about", isEnabled: true, displayOrder: 2 },
      { name: "experience", isEnabled: true, displayOrder: 3 },
      { name: "education", isEnabled: true, displayOrder: 4 },
      { name: "skills", isEnabled: true, displayOrder: 5 },
      { name: "projects", isEnabled: true, displayOrder: 6 },
      { name: "volunteer", isEnabled: true, displayOrder: 7 },
      { name: "publications", isEnabled: true, displayOrder: 8 },
      { name: "patents", isEnabled: true, displayOrder: 9 },
      { name: "awards", isEnabled: true, displayOrder: 10 },
      { name: "testscores", isEnabled: true, displayOrder: 11 },
      { name: "languages", isEnabled: true, displayOrder: 12 },
      { name: "certifications", isEnabled: true, displayOrder: 13 },
      { name: "courses", isEnabled: true, displayOrder: 14 },
      { name: "contact", isEnabled: true, displayOrder: 15 },
    ]
    await Section.insertMany(sections)

    // Seed Hero data
    await Hero.create({
      name: "Aarti Karande",
      tagline: "Full Stack Developer & Software Engineer",
      description: "Passionate about creating innovative solutions and building scalable applications.",
      profileImage: "/professional-headshot.png",
      resumeUrl: "/resume.pdf",
      socials: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe",
        email: "john@example.com",
        website: "https://johndoe.dev",
      },
    })

    // Seed About data
    await About.create({
      title: "About Me",
      content:
        "I am a passionate full-stack developer with over 5 years of experience in building web applications. I specialize in React, Node.js, and modern web technologies. I love solving complex problems and creating user-friendly solutions.",
      image: "https://t4.ftcdn.net/jpg/03/69/19/81/360_F_369198116_K0sFy2gRTo1lmIf5jVGeQmaIEibjC3NN.jpg",
    })

    // Seed Experience data
    await Experience.insertMany([
      {
        company: "Tech Solutions Inc.",
        position: "Senior Full Stack Developer",
        location: "San Francisco, CA",
        startDate: new Date("2022-01-01"),
        current: true,
        description: "Lead development of web applications using React and Node.js",
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
        achievements: ["Increased application performance by 40%", "Led team of 5 developers"],
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        location: "New York, NY",
        startDate: new Date("2020-06-01"),
        endDate: new Date("2021-12-31"),
        description: "Developed responsive web applications and improved user experience",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        achievements: ["Reduced load time by 50%", "Implemented new design system"],
      },
    ])

    // Seed Education data
    await Education.create({
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Boston, MA",
      startDate: new Date("2016-09-01"),
      endDate: new Date("2020-05-31"),
      gpa: "3.8/4.0",
      description: "Focused on software engineering and web development",
      achievements: ["Dean's List", "Computer Science Society President"],
    })

    // Seed Skills data
    await Skills.insertMany([
      {
        category: "Frontend",
        skills: [
          { name: "React", level: "Expert" },
          { name: "JavaScript", level: "Expert" },
          { name: "HTML/CSS", level: "Expert" },
          { name: "Tailwind CSS", level: "Advanced" },
        ],
      },
      {
        category: "Backend",
        skills: [
          { name: "Node.js", level: "Advanced" },
          { name: "Express.js", level: "Advanced" },
          { name: "MongoDB", level: "Advanced" },
          { name: "PostgreSQL", level: "Intermediate" },
        ],
      },
    ])

    // Seed Projects data
    await Project.insertMany([
      {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce application with payment integration",
        image: "/ecommerce-website-homepage.png",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://ecommerce-demo.com",
        githubUrl: "https://github.com/johndoe/ecommerce",
        featured: true,
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-06-30"),
      },
      {
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates",
        image: "/task-management-dashboard.png",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        liveUrl: "https://taskapp-demo.com",
        githubUrl: "https://github.com/johndoe/taskapp",
        featured: true,
        startDate: new Date("2022-08-01"),
        endDate: new Date("2022-12-31"),
      },
    ])

    // Seed Volunteer data
    await Volunteer.insertMany([
      {
        organization: "Code for Good",
        role: "Lead Developer",
        location: "San Francisco, CA",
        startDate: new Date("2021-03-01"),
        current: true,
        description: "Leading a team of volunteer developers to build applications for non-profit organizations",
        achievements: ["Built 3 web applications for local charities", "Mentored 15+ junior developers"],
        website: "https://codeforgood.org",
      },
      {
        organization: "Tech Education Initiative",
        role: "Programming Instructor",
        location: "Remote",
        startDate: new Date("2020-09-01"),
        endDate: new Date("2021-02-28"),
        description: "Teaching programming fundamentals to underserved communities",
        achievements: ["Taught 50+ students", "Developed curriculum for web development bootcamp"],
        website: "https://techeducation.org",
      },
    ])

    // Seed Publications data
    await Publication.insertMany([
      {
        title: "Modern Web Development Practices: A Comprehensive Guide",
        authors: ["Aarti Karande", "Jane Smith"],
        journal: "Journal of Web Technologies",
        publicationDate: new Date("2023-05-15"),
        volume: "12",
        issue: "3",
        pages: "45-62",
        doi: "10.1234/jwt.2023.12345",
        url: "https://journal-web-tech.com/articles/modern-web-dev",
        abstract:
          "This paper explores modern web development practices including component-based architecture, state management, and performance optimization techniques.",
      },
      {
        title: "Scalable Architecture Patterns for Node.js Applications",
        authors: ["Aarti Karande"],
        journal: "Software Engineering Quarterly",
        publicationDate: new Date("2022-11-20"),
        volume: "8",
        issue: "4",
        pages: "112-128",
        doi: "10.5678/seq.2022.67890",
        url: "https://software-eng-quarterly.com/scalable-nodejs",
        abstract:
          "An analysis of architectural patterns that enable Node.js applications to scale effectively in production environments.",
      },
    ])

    // Seed Patents data
    await Patent.insertMany([
      {
        title: "Method and System for Real-time Data Synchronization in Web Applications",
        patentNumber: "US10,123,456",
        inventors: ["Aarti Karande", "Alice Johnson"],
        assignee: "Tech Solutions Inc.",
        filingDate: new Date("2022-03-15"),
        publicationDate: new Date("2023-09-20"),
        status: "Granted",
        abstract:
          "A novel approach to synchronizing data across multiple client applications in real-time using WebSocket connections and conflict resolution algorithms.",
        url: "https://patents.uspto.gov/patent/10123456",
      },
    ])

    // Seed Awards data
    await Award.insertMany([
      {
        title: "Developer of the Year",
        issuer: "Tech Innovation Awards",
        date: new Date("2023-12-01"),
        description:
          "Recognized for outstanding contributions to open-source projects and innovative web development solutions",
        category: "Professional",
        url: "https://techinnovationawards.com/2023/developer-year",
      },
      {
        title: "Best Final Project",
        issuer: "University of Technology",
        date: new Date("2020-05-15"),
        description: "Awarded for exceptional senior capstone project in computer science",
        category: "Academic",
        url: "https://university-tech.edu/awards/2020",
      },
      {
        title: "Hackathon Winner - Best Web Application",
        issuer: "Global Hack Week",
        date: new Date("2021-10-30"),
        description: "First place winner for developing an innovative social impact web application",
        category: "Competition",
        url: "https://globalhackweek.com/2021/winners",
      },
    ])

    // Seed Test Scores data
    await TestScore.insertMany([
      {
        testName: "AWS Certified Solutions Architect",
        score: "892/1000",
        date: new Date("2023-08-15"),
        validUntil: new Date("2026-08-15"),
        credentialId: "AWS-CSA-2023-JD001",
        url: "https://aws.amazon.com/certification/verify/JD001",
      },
      {
        testName: "Google Cloud Professional Developer",
        score: "Pass",
        date: new Date("2022-11-20"),
        validUntil: new Date("2024-11-20"),
        credentialId: "GCP-PD-2022-JD002",
        url: "https://cloud.google.com/certification/verify/JD002",
      },
    ])

  await Language.insertMany([
  {
    language: "English",
    proficiency: "Native",
    certifications: [
      { name: "TOEFL iBT", score: "118/120", date: new Date("2023-06-01") },
    ],
  },
  {
    language: "Spanish",
    proficiency: "Professional Working",
    certifications: [
      { name: "DELE B2 Certificate", score: null, date: new Date("2022-05-15") },
    ],
  },
  {
    language: "French",
    proficiency: "Elementary",
    certifications: [
      { name: "DELF A2 Certificate", score: null, date: new Date("2021-11-20") },
    ],
  },
])


    // Seed Certifications data
    await Certification.insertMany([
      {
        name: "AWS Certified Solutions Architect - Associate",
        issuer: "Amazon Web Services",
        issueDate: new Date("2023-08-15"),
        expirationDate: new Date("2026-08-15"),
        credentialId: "AWS-CSA-2023-JD001",
        url: "https://aws.amazon.com/certification/verify/JD001",
        skills: ["Cloud Architecture", "AWS Services", "Security", "Scalability"],
      },
      {
        name: "Google Cloud Professional Cloud Developer",
        issuer: "Google Cloud",
        issueDate: new Date("2022-11-20"),
        expirationDate: new Date("2024-11-20"),
        credentialId: "GCP-PD-2022-JD002",
        url: "https://cloud.google.com/certification/verify/JD002",
        skills: ["Google Cloud Platform", "Application Development", "DevOps", "Microservices"],
      },
      {
        name: "MongoDB Certified Developer Associate",
        issuer: "MongoDB Inc.",
        issueDate: new Date("2023-03-10"),
        expirationDate: new Date("2026-03-10"),
        credentialId: "MDB-DEV-2023-JD003",
        url: "https://university.mongodb.com/verify/JD003",
        skills: ["MongoDB", "Database Design", "Aggregation", "Performance Optimization"],
      },
      {
        name: "React Developer Certification",
        issuer: "Meta",
        issueDate: new Date("2022-07-25"),
        expirationDate: new Date("2025-07-25"),
        credentialId: "META-REACT-2022-JD004",
        url: "https://developers.facebook.com/certification/verify/JD004",
        skills: ["React", "JavaScript", "Frontend Development", "Component Architecture"],
      },
    ])

   await Course.insertMany([
  {
    name: "Advanced React Patterns and Performance",
    provider: "Frontend Masters",
    completionDate: new Date("2023-09-15"),
    certificateUrl: "https://frontendmasters.com/certificates/react-advanced-JD001",
    description:
      "Deep dive into advanced React patterns, performance optimization techniques, and testing strategies",
    skills: ["React", "Performance Optimization", "Advanced Patterns", "Testing"],
  },
  {
    name: "Node.js: The Complete Guide to Build RESTful APIs",
    provider: "Udemy",
    completionDate: new Date("2023-06-20"),
    certificateUrl: "https://udemy.com/certificate/nodejs-complete-JD002",
    description: "Comprehensive course covering Node.js fundamentals, API development, and database integration",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Authentication"],
  },
  {
    name: "AWS Solutions Architect Bootcamp",
    provider: "A Cloud Guru",
    completionDate: new Date("2023-07-30"),
    certificateUrl: "https://acloudguru.com/certificates/aws-sa-JD003",
    description: "Intensive bootcamp preparing for AWS Solutions Architect certification with hands-on labs",
    skills: ["AWS", "Cloud Architecture", "Security", "Scalability", "Cost Optimization"],
  },
  {
    name: "Full Stack Web Development with GraphQL",
    provider: "Pluralsight",
    completionDate: new Date("2022-12-10"),
    certificateUrl: "https://pluralsight.com/certificates/graphql-fullstack-JD004",
    description:
      "Complete guide to building full-stack applications using GraphQL, Apollo, and modern web technologies",
    skills: ["GraphQL", "Apollo", "React", "Node.js", "Database Integration"],
  },
  {
    name: "Docker and Kubernetes: The Complete Guide",
    provider: "Udemy",
    completionDate: new Date("2023-04-18"),
    certificateUrl: "https://udemy.com/certificate/docker-kubernetes-JD005",
    description: "Comprehensive course on containerization and orchestration using Docker and Kubernetes",
    skills: ["Docker", "Kubernetes", "DevOps", "Container Orchestration", "CI/CD"],
  },
])


    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedData()

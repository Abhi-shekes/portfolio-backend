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
const Talk = require("../models/Talk")
const Internship = require("../models/Internship")
const Workshop = require("../models/Workshop")
const Training = require("../models/Training")
const Appreciation = require("../models/Appreciation")
const JournalPaper = require("../models/JournalPaper")
const ResearchPaper = require("../models/ResearchPaper")
const ConferencePaper = require("../models/ConferencePaper")
const BookChapter = require("../models/BookChapter")
const GalleryImage = require("../models/GalleryImage")
const Slider = require("../models/Slider")

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio")
    console.log("Connected to MongoDB")

    // Clear existing data
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
    await Talk.deleteMany({})
    await Internship.deleteMany({})
    await Workshop.deleteMany({})
    await Training.deleteMany({})
    await Appreciation.deleteMany({})
    await JournalPaper.deleteMany({})
    await ResearchPaper.deleteMany({})
    await ConferencePaper.deleteMany({})
    await BookChapter.deleteMany({})
    await GalleryImage.deleteMany({})
    await Slider.deleteMany({})

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
      { name: "talks", isEnabled: true, displayOrder: 16 },
      { name: "internships", isEnabled: true, displayOrder: 17 },
      { name: "workshops", isEnabled: true, displayOrder: 18 },
      { name: "trainings", isEnabled: true, displayOrder: 19 },
      { name: "appreciations", isEnabled: true, displayOrder: 20 },
      { name: "journalpapers", isEnabled: true, displayOrder: 21 },
      { name: "researchpapers", isEnabled: true, displayOrder: 22 },
      { name: "conferencepapers", isEnabled: true, displayOrder: 23 },
      { name: "bookchapters", isEnabled: true, displayOrder: 24 },
      { name: "gallery", isEnabled: true, displayOrder: 25 },
    ]
    await Section.insertMany(sections)

    // Seed Hero data for Dr. Aarti Karande
    await Hero.create({
      name: "Dr. Aarti Milind Karande",
      tagline: "Assistant Professor & Researcher in Computer Engineering",
      description: "Passionate educator and researcher specializing in Cloud Computing, Artificial Intelligence, and Machine Learning. Dedicated to mentoring students and contributing to innovative research at Sardar Patel Institute of Technology.",
      profileImage: "https://picsum.photos/seed/1/600/400",
      resumeUrl: "/resume.pdf",
      socials: {
        linkedin: "https://linkedin.com/in/aartikarande",
        github: "https://github.com/aartikarande",
        email: "aartimkarande@spit.ac.in",
        website: "https://aartimkarande.in/",
      },
    })

    // Seed About data
    await About.create({
      title: "About Me",
      content: "I am an Assistant Professor at Sardar Patel Institute of Technology with a Ph.D. in Computer Engineering. My research focuses on enterprise architecture, business process agility, cloud computing, and artificial intelligence. I have developed frameworks for managing business process standardization and hold patents in enterprise architecture and innovation stove. My teaching philosophy emphasizes practical knowledge with industry-relevant skills to prepare students for real-world challenges in the IT industry.",
      image: "https://picsum.photos/seed/2/600/400",
    })

    // Seed Experience data - Academic positions
    await Experience.insertMany([
      {
        company: "Sardar Patel Institute of Technology",
        position: "Assistant Professor",
        location: "Mumbai, Maharashtra, India",
        startDate: new Date("2007-07-01"),
        current: true,
        description: "Teaching undergraduate and postgraduate courses in Computer Engineering. Mentoring students for academic projects and research publications.",
        technologies: ["Cloud Computing", "AI/ML", "Data Mining", "Software Engineering"],
        achievements: ["Guided 50+ student projects", "Published 23+ research papers", "Mentored award-winning research teams"],
      },
      {
        company: "Sardar Patel Institute of Technology",
        position: "PG Admission Coordinator",
        location: "Mumbai, Maharashtra, India",
        startDate: new Date("2018-06-01"),
        endDate: new Date("2020-05-31"),
        description: "Managed postgraduate admissions process and coordinated with academic committees",
        technologies: ["Academic Administration", "Student Recruitment"],
        achievements: ["Streamlined admission process", "Increased postgraduate enrollment"],
      },
      {
        company: "Sardar Patel Institute of Technology",
        position: "Placement Coordinator",
        location: "Mumbai, Maharashtra, India",
        startDate: new Date("2016-06-01"),
        endDate: new Date("2018-05-31"),
        description: "Coordinated campus placements and industry interactions for computer engineering students",
        technologies: ["Industry Relations", "Career Counseling"],
        achievements: ["Improved placement rates", "Established new industry partnerships"],
      },
    ])

    // Seed Education data - Indian institutions
    await Education.insertMany([
      {
        institution: "University of Mumbai",
        degree: "Ph.D",
        field: "Computer Engineering",
        location: "Mumbai, Maharashtra, India",
        startDate: new Date("2010-07-01"),
        endDate: new Date("2015-06-30"),
        description: "Doctoral research in enterprise architecture and business process agility",
      },
      {
        institution: "VJTI Mumbai",
        degree: "M.Tech",
        field: "Computer Engineering",
        location: "Mumbai, Maharashtra, India",
        startDate: new Date("2005-07-01"),
        endDate: new Date("2007-05-31"),
        description: "Specialization in integrated service management using SOA",
      },
      {
        institution: "Sardar Patel College of Engineering",
        degree: "B.E.",
        field: "Computer Engineering",
        location: "Mumbai, Maharashtra, India",
        startDate: new Date("2001-07-01"),
        endDate: new Date("2005-05-31"),
      }
    ])

    // Seed Skills data - Research and technical domains
    await Skills.insertMany([
      {
        category: "Research Areas",
        skills: [
          { name: "Cloud Computing", level: "Expert" },
          { name: "Artificial Intelligence", level: "Expert" },
          { name: "Machine Learning", level: "Expert" },
          { name: "Soft Computing", level: "Advanced" },
          { name: "Data Warehouse", level: "Advanced" },
          { name: "Business Intelligence", level: "Advanced" },
        ],
      },
      {
        category: "Professional Skills",
        skills: [
          { name: "COBIT 5 Framework", level: "Advanced" },
          { name: "Agile Project Management", level: "Advanced" },
          { name: "Enterprise Architecture", level: "Expert" },
          { name: "Business Process Modeling", level: "Expert" },
          { name: "Academic Research", level: "Expert" },
          { name: "Student Mentoring", level: "Expert" },
        ],
      },
    ])

    // Seed Projects data - Research projects
    await Project.insertMany([
      {
        title: "Enterprise Architecture Framework for Business Process Agility",
        description: "Research project developing frameworks for managing business process standardization and agility in enterprise architecture",
        image: "https://picsum.photos/seed/3/600/400",
        technologies: ["Enterprise Architecture", "Business Process Modeling", "SOA"],
        featured: true,
        startDate: new Date("2010-01-01"),
        endDate: new Date("2015-12-31"),
      },
      {
        title: "Cloud Computing Integration in Academic Curriculum",
        description: "Development and implementation of cloud computing modules in computer engineering curriculum",
        image: "https://picsum.photos/seed/4/600/400",
        technologies: ["Cloud Computing", "Curriculum Development", "Academic Research"],
        featured: true,
        startDate: new Date("2018-01-01"),
        endDate: new Date("2020-12-31"),
      },
    ])

    // Seed Volunteer data - Academic services
    await Volunteer.insertMany([
      {
        organization: "Computer Society of India",
        role: "Faculty Coordinator",
        location: "Mumbai, India",
        startDate: new Date("2015-01-01"),
        current: true,
        description: "Coordinating student chapter activities and technical events",
        achievements: ["Organized 10+ technical workshops", "Increased student participation in CSI activities"],
        website: "https://csi-india.org",
      },
      {
        organization: "ISTE Student Chapter",
        role: "Faculty Advisor",
        location: "Mumbai, India",
        startDate: new Date("2016-01-01"),
        endDate: new Date("2020-12-31"),
        description: "Guiding students in organizing technical events and competitions",
        achievements: ["Mentored winning teams in technical competitions", "Organized national level technical fest"],
        website: "https://iste.org",
      },
    ])

    // Seed Publications data - Research publications
    await Publication.insertMany([
      {
        title: "A Framework for Managing Business Process Standardization and Agility in Enterprise Architecture",
        authors: ["Aarti M. Karande", "S.D. Sawarkar"],
        journal: "International Journal of Computer Applications",
        publicationDate: new Date("2015-03-15"),
        volume: "114",
        issue: "15",
        pages: "1-6",
        doi: "10.5120/20082-2345",
        url: "https://www.ijcaonline.org/archives/volume114/number15/20082-2345",
        abstract: "This paper proposes a framework to manage business process standardization and agility in enterprise architecture context.",
      },
      {
        title: "Integrated Service Management using Service Oriented Architecture",
        authors: ["Aarti M. Karande"],
        journal: "International Journal of Engineering Research and Applications",
        publicationDate: new Date("2012-07-20"),
        volume: "2",
        issue: "4",
        pages: "1982-1986",
        doi: "10.1234/ijera.2012.2195",
        url: "https://www.ijera.com/papers/Vol2_issue4/JZ2419821986.pdf",
        abstract: "Research on integrated service management approaches using service oriented architecture principles.",
      },
    ])

    // Seed Patents data
    await Patent.insertMany([
      {
        title: "Enterprise Architecture and Innovation Stove",
        patentNumber: "IN 295789",
        inventors: ["Aarti M. Karande"],
        assignee: "Sardar Patel Institute of Technology",
        filingDate: new Date("2015-03-10"),
        publicationDate: new Date("2016-09-15"),
        status: "Granted",
        abstract: "Patent for enterprise architecture framework and innovation stove methodology for business process management.",
      },
    ])

    // Seed Awards data
    await Award.insertMany([
      {
        title: "Best Teacher of the Year",
        issuer: "Cognizant Technology Solutions",
        date: new Date("2018-03-15"),
        description: "Recognized for exceptional teaching contributions and student mentorship in computer engineering",
        category: "Professional",
      },
      {
        title: "Best Research Paper Award",
        issuer: "International Conference on Computing and Communication Systems",
        date: new Date("2014-12-10"),
        description: "Award for outstanding research paper on enterprise architecture frameworks",
        category: "Academic",
      },
    ])

    // Seed Test Scores data
    await TestScore.insertMany([
      {
        testName: "COBIT 5 Foundation",
        score: "Pass",
        date: new Date("2016-05-10"),
        validUntil: new Date("2021-05-10"),
        credentialId: "COBIT5-CERT-2016",
        url: "https://www.isaca.org/certification/cobit-certification",
      },
      {
        testName: "Agile Project Management Foundation",
        score: "Pass",
        date: new Date("2015-08-20"),
        validUntil: new Date("2020-08-20"),
        credentialId: "APMG-AGILE-2015",
        url: "https://apmg-international.com/agilepm",
      },
    ])

    // Seed Language data
    await Language.insertMany([
      {
        language: "English",
        proficiency: "Professional Working",
      },
      {
        language: "Hindi",
        proficiency: "Native",
      },
      {
        language: "Marathi",
        proficiency: "Native",
      },
    ])

    // Seed Certifications data
    await Certification.insertMany([
      {
        name: "COBIT 5 Foundation",
        issuer: "ISACA",
        issueDate: new Date("2016-05-10"),
        expirationDate: new Date("2021-05-10"),
        credentialId: "COBIT5-CERT-2016",
        url: "https://www.isaca.org/certification/cobit-certification",
        skills: ["IT Governance", "Process Management", "Framework Implementation"],
      },
      {
        name: "Agile Project Management Foundation",
        issuer: "APMG International",
        issueDate: new Date("2015-08-20"),
        expirationDate: new Date("2020-08-20"),
        credentialId: "APMG-AGILE-2015",
        url: "https://apmg-international.com/agilepm",
        skills: ["Agile Methodology", "Project Management", "Scrum"],
      },
    ])

    // Seed Course data
    await Course.insertMany([
      {
        name: "Advanced Cloud Computing",
        provider: "NPTEL",
        completionDate: new Date("2019-12-15"),
        certificateUrl: "https://nptel.ac.in/noc/certificates/",
        description: "Comprehensive course on cloud computing architectures, deployment models, and security aspects",
        skills: ["Cloud Architecture", "Virtualization", "Cloud Security", "Deployment Models"],
      },
      {
        name: "Machine Learning Foundations",
        provider: "NPTEL",
        completionDate: new Date("2018-11-20"),
        certificateUrl: "https://nptel.ac.in/noc/certificates/",
        description: "Fundamental concepts and algorithms in machine learning and pattern recognition",
        skills: ["Machine Learning", "Pattern Recognition", "Classification Algorithms", "Neural Networks"],
      },
    ])

    // Seed Talk data
    await Talk.insertMany([
      {
        title: "Machine Learning and Transfer Learning in Modern Applications",
        description: "Technical session on machine learning advancements and transfer learning methodologies",
        event: "National Conference on Emerging Technologies",
        date: new Date("2023-02-15"),
        location: "Mumbai, India",
        url: "https://nacet.org/sessions/ml-transfer-learning",
      },
      {
        title: "Business Modeling and Enterprise Architecture",
        description: "Guest lecture on business modeling techniques and enterprise architecture frameworks",
        event: "Industry-Academia Conclave",
        date: new Date("2022-11-20"),
        location: "Pune, India",
        url: "https://industryacademiaconclave.in/sessions/business-modeling",
      },
      {
        title: "Women in Technology and Entrepreneurship",
        description: "Keynote address on opportunities and challenges for women in technology entrepreneurship",
        event: "Women Techmakers Conference",
        date: new Date("2022-03-08"),
        location: "Mumbai, India",
        url: "https://womentechmakers.com/mumbai2022",
      },
    ])

    // Seed Internship data - Mentoring roles
    await Internship.insertMany([
      {
        title: "Research Internship Mentor",
        description: "Mentoring undergraduate students in research methodology and paper publication",
        company: "Sardar Patel Institute of Technology",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2023-08-31"),
        location: "Mumbai, India",
        skills: ["Research Methodology", "Academic Writing", "Paper Publication", "Mentoring"],
      },
      {
        title: "Project Guide for Industry Internships",
        description: "Guiding students through industry internship projects and evaluations",
        company: "Sardar Patel Institute of Technology",
        startDate: new Date("2022-12-01"),
        endDate: new Date("2023-05-31"),
        location: "Mumbai, India",
        skills: ["Project Guidance", "Industry Collaboration", "Student Evaluation", "Technical Mentoring"],
      },
    ])

    // Seed Workshop data
    await Workshop.insertMany([
      {
        title: "Research Paper Writing and Publication Workshop",
        description: "Hands-on workshop on research methodology, paper writing, and publication process",
        type: "conducted",
        organizer: "S.P.I.T. Research Cell",
        date: new Date("2023-01-15"),
        location: "Mumbai, India",
        duration: "2 days",
        certificate: "/certificates/research-workshop-2023.pdf",
      },
      {
        title: "Cloud Computing Applications in Industry",
        description: "Workshop on practical applications of cloud computing in various industry domains",
        type: "conducted",
        organizer: "Computer Society of India",
        date: new Date("2022-08-20"),
        location: "Mumbai, India",
        duration: "1 day",
        certificate: "/certificates/cloud-workshop-2022.pdf",
      },
    ])

    // Seed Training data
    await Training.insertMany([
      {
        title: "Faculty Development Program on AI and ML",
        description: "Intensive training program on artificial intelligence and machine learning for academic faculty",
        provider: "IIT Bombay",
        startDate: new Date("2022-05-01"),
        endDate: new Date("2022-05-15"),
        duration: "40 hours",
        certificate: "/certificates/ai-ml-fdp-2022.pdf",
        skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks"],
      },
      {
        title: "Advanced Research Methodology",
        description: "Training on advanced research methodologies and statistical analysis techniques",
        provider: "SNDT Women's University",
        startDate: new Date("2021-07-01"),
        endDate: new Date("2021-07-10"),
        duration: "30 hours",
        certificate: "/certificates/research-methodology-2021.pdf",
        skills: ["Research Design", "Statistical Analysis", "Data Collection", "Hypothesis Testing"],
      },
    ])

    // Seed Appreciation data
    await Appreciation.insertMany([
      {
        title: "Outstanding Contribution to Academic Research",
        description: "Recognized for significant contributions to academic research and publications",
        awardedBy: "University of Mumbai",
        date: new Date("2023-01-20"),
        category: "Research",
        certificate: "/certificates/research-contribution-2023.pdf",
      },
      {
        title: "Excellence in Student Mentoring",
        description: "Appreciated for exceptional mentoring and guidance to undergraduate students",
        awardedBy: "S.P.I.T. Student Council",
        date: new Date("2022-12-15"),
        category: "Mentoring",
        certificate: "/certificates/mentoring-excellence-2022.pdf",
      },
    ])

    // Seed JournalPaper data
    await JournalPaper.insertMany([
      {
        title: "A Framework for Managing Business Process Standardization and Agility in Enterprise Architecture",
        authors: ["Aarti M. Karande", "S.D. Sawarkar"],
        journal: "International Journal of Computer Applications",
        volume: "114",
        issue: "15",
        pages: "1-6",
        publishDate: new Date("2015-03-15"),
        doi: "10.5120/20082-2345",
        url: "https://www.ijcaonline.org/archives/volume114/number15/20082-2345",
        abstract: "This paper presents a comprehensive framework to manage business process standardization and agility in enterprise architecture context, addressing the challenges of dynamic business environments.",
        pdf: "/papers/enterprise-framework-2015.pdf",
      },
      {
        title: "Integrated Service Management using Service Oriented Architecture",
        authors: ["Aarti M. Karande"],
        journal: "International Journal of Engineering Research and Applications",
        volume: "2",
        issue: "4",
        pages: "1982-1986",
        publishDate: new Date("2012-07-20"),
        doi: "10.1234/ijera.2012.2195",
        url: "https://www.ijera.com/papers/Vol2_issue4/JZ2419821986.pdf",
        abstract: "Research paper exploring integrated service management approaches using service oriented architecture principles for improved business process integration.",
        pdf: "/papers/service-management-2012.pdf",
      },
    ])

    // Seed ResearchPaper data
    await ResearchPaper.insertMany([
      {
        title: "Enterprise Architecture Patterns for Digital Transformation",
        authors: ["Aarti M. Karande"],
        description: "Research on enterprise architecture patterns supporting digital transformation initiatives",
        publishDate: new Date("2020-11-10"),
        doi: "10.1234/research.2020.001",
        url: "https://researchrepository.edu/enterprise-patterns",
        abstract: "This research paper explores various enterprise architecture patterns that facilitate successful digital transformation in organizations.",
        pdf: "/papers/ea-patterns-2020.pdf",
        keywords: ["Enterprise Architecture", "Digital Transformation", "Business Patterns", "Digital Strategy"],
      },
      {
        title: "Cloud Computing Adoption Framework for Educational Institutions",
        authors: ["Aarti M. Karande", "Research Team"],
        description: "Framework development for cloud computing adoption in higher educational institutions",
        publishDate: new Date("2019-08-15"),
        doi: "10.1234/research.2019.002",
        url: "https://researchrepository.edu/cloud-education",
        abstract: "Research paper presenting a comprehensive framework for cloud computing adoption in educational institutions with case studies.",
        pdf: "/papers/cloud-education-2019.pdf",
        keywords: ["Cloud Computing", "Education Technology", "Adoption Framework", "Institutional Planning"],
      },
    ])

    // Seed ConferencePaper data
    await ConferencePaper.insertMany([
      {
        title: "Business Process Agility in Enterprise Architecture Context",
        authors: ["Aarti M. Karande", "S.D. Sawarkar"],
        conference: "International Conference on Computing and Communication Systems",
        conferenceDate: new Date("2014-11-15"),
        location: "Kolkata, India",
        doi: "10.1109/ICCCS.2014.123",
        url: "https://icccs2014.org/papers/business-process-agility",
        abstract: "Conference paper presenting research on business process agility within enterprise architecture framework.",
        pdf: "/papers/business-agility-icccs-2014.pdf",
        proceedings: "Proceedings of ICCCS 2014",
      },
      {
        title: "Service Oriented Architecture for Integrated Management",
        authors: ["Aarti M. Karande"],
        conference: "National Conference on Advanced Computing",
        conferenceDate: new Date("2012-12-10"),
        location: "Mumbai, India",
        doi: "10.1234/NCAC.2012.045",
        url: "https://ncac2012.org/papers/soa-integrated-management",
        abstract: "Paper discussing service oriented architecture approaches for integrated service management systems.",
        pdf: "/papers/soa-management-ncac-2012.pdf",
        proceedings: "Proceedings of NCAC 2012",
      },
    ])

    // Seed BookChapter data
    await BookChapter.insertMany([
      {
        title: "Enterprise Architecture in Digital Era",
        authors: ["Aarti M. Karande"],
        bookTitle: "Advanced Computing and Communication Systems",
        publisher: "Springer Nature",
        chapterNumber: "8",
        pages: "145-162",
        publishDate: new Date("2021-03-15"),
        isbn: "978-3-031-12345-0",
        url: "https://link.springer.com/chapter/10.1007/978-3-031-12345-0_8",
        abstract: "This chapter explores the evolution of enterprise architecture in the digital era and its impact on business transformation.",
        pdf: "/papers/ea-digital-chapter-2021.pdf",
      },
      {
        title: "Cloud Computing Frameworks for Academic Institutions",
        authors: ["Aarti M. Karande"],
        bookTitle: "Emerging Technologies in Education",
        publisher: "Taylor & Francis",
        chapterNumber: "5",
        pages: "89-105",
        publishDate: new Date("2019-08-20"),
        isbn: "978-1-138-56789-0",
        url: "https://taylorandfrancis.com/books/emerging-tech-education",
        abstract: "Book chapter discussing cloud computing frameworks specifically designed for academic and educational institutions.",
        pdf: "/papers/cloud-academic-chapter-2019.pdf",
      },
    ])

    // Seed GalleryImage data
    await GalleryImage.insertMany([
      {
        title: "Guest Lecture at National Conference",
        description: "Delivering technical session on machine learning and enterprise architecture",
        image: "https://picsum.photos/seed/5/600/400",
        category: "Speaking",
        date: new Date("2023-02-15"),
        featured: true,
        tags: ["Conference", "Speaking", "Machine Learning"],
      },
      {
        title: "Research Team with Award",
        description: "With research team after receiving best paper award",
        image: "https://picsum.photos/seed/6/600/400",
        category: "Awards",
        date: new Date("2014-11-20"),
        featured: true,
        tags: ["Research", "Award", "Team"],
      },
      {
        title: "Workshop on Cloud Computing",
        description: "Conducting workshop on cloud computing applications",
        image: "https://picsum.photos/seed/7/600/400",
        category: "Workshop",
        date: new Date("2022-08-20"),
        featured: true,
        tags: ["Workshop", "Cloud Computing", "Teaching"],
      },
      {
        title: "Faculty Development Program",
        description: "Participating in AI/ML faculty development program",
        image: "https://picsum.photos/seed/8/600/400",
        category: "Training",
        date: new Date("2022-05-10"),
        featured: false,
        tags: ["Training", "Faculty Development", "AI/ML"],
      },
      {
        title: "Student Project Guidance",
        description: "Mentoring students on academic projects",
        image: "https://picsum.photos/seed/9/600/400",
        category: "Mentoring",
        date: new Date("2023-04-15"),
        featured: true,
        tags: ["Mentoring", "Students", "Projects"],
      },
    ])

    // Seed Slider data
    await Slider.create({
      isEnabled: true,
      images: [
        {
          url: "https://picsum.photos/seed/10/1200/600",
          title: "Research and Innovation",
          description: "Advancing knowledge through cutting-edge research",
          order: 0,
        },
        {
          url: "https://picsum.photos/seed/11/1200/600",
          title: "Academic Excellence",
          description: "Inspiring minds through quality education",
          order: 1,
        },
        {
          url: "https://picsum.photos/seed/12/1200/600",
          title: "Technology and Innovation",
          description: "Building the future with technology",
          order: 2,
        },
        {
          url: "https://picsum.photos/seed/13/1200/600",
          title: "Collaboration and Learning",
          description: "Growing together as a community",
          order: 3,
        },
        {
          url: "https://picsum.photos/seed/14/1200/600",
          title: "Enterprise Architecture",
          description: "Designing scalable solutions for enterprise",
          order: 4,
        },
      ],
    })

    console.log("Database seeded successfully with Dr. Aarti Karande's data!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedData()
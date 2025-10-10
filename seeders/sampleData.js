const { Program, Year, Subject, Lecturer } = require('../models');

// Sample data seeder
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Create Programs
    const programs = await Promise.all([
      Program.create({
        name: 'Computer Science Engineering',
        description: 'Comprehensive program covering software development, algorithms, and computer systems',
        duration: 4
      }),
      Program.create({
        name: 'Electronics and Communication Engineering',
        description: 'Program focusing on electronic systems and communication technologies',
        duration: 4
      }),
      Program.create({
        name: 'Mechanical Engineering',
        description: 'Program covering mechanical systems, design, and manufacturing',
        duration: 4
      }),
      Program.create({
        name: 'Business Administration',
        description: 'Management and business studies program',
        duration: 3
      })
    ]);

    console.log('Programs created:', programs.length);

    // Create Lecturers
    const lecturers = await Promise.all([
      Lecturer.create({
        name: 'Dr. John Smith',
        email: 'john.smith@college.edu',
        department: 'Computer Science',
        qualification: 'Ph.D. in Computer Science',
        experience: 15
      }),
      Lecturer.create({
        name: 'Prof. Sarah Johnson',
        email: 'sarah.johnson@college.edu',
        department: 'Electronics',
        qualification: 'Ph.D. in Electronics Engineering',
        experience: 12
      }),
      Lecturer.create({
        name: 'Dr. Michael Brown',
        email: 'michael.brown@college.edu',
        department: 'Mechanical',
        qualification: 'Ph.D. in Mechanical Engineering',
        experience: 18
      }),
      Lecturer.create({
        name: 'Dr. Emily Davis',
        email: 'emily.davis@college.edu',
        department: 'Business',
        qualification: 'Ph.D. in Business Administration',
        experience: 10
      })
    ]);

    console.log('Lecturers created:', lecturers.length);

    // Create Years for Computer Science
    const csYears = await Promise.all([
      Year.create({ programId: programs[0].id, yearNumber: 1 }),
      Year.create({ programId: programs[0].id, yearNumber: 2 }),
      Year.create({ programId: programs[0].id, yearNumber: 3 }),
      Year.create({ programId: programs[0].id, yearNumber: 4 })
    ]);

    // Create Years for Electronics
    const ecYears = await Promise.all([
      Year.create({ programId: programs[1].id, yearNumber: 1 }),
      Year.create({ programId: programs[1].id, yearNumber: 2 }),
      Year.create({ programId: programs[1].id, yearNumber: 3 }),
      Year.create({ programId: programs[1].id, yearNumber: 4 })
    ]);

    // Create Years for Mechanical
    const meYears = await Promise.all([
      Year.create({ programId: programs[2].id, yearNumber: 1 }),
      Year.create({ programId: programs[2].id, yearNumber: 2 }),
      Year.create({ programId: programs[2].id, yearNumber: 3 }),
      Year.create({ programId: programs[2].id, yearNumber: 4 })
    ]);

    // Create Years for Business
    const baYears = await Promise.all([
      Year.create({ programId: programs[3].id, yearNumber: 1 }),
      Year.create({ programId: programs[3].id, yearNumber: 2 }),
      Year.create({ programId: programs[3].id, yearNumber: 3 })
    ]);

    console.log('Years created for all programs');

    // Create Subjects for Computer Science
    const csSubjects = await Promise.all([
      // Year 1
      Subject.create({ yearId: csYears[0].id, name: 'Programming Fundamentals', code: 'CS101', credits: 4, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[0].id, name: 'Mathematics for Engineers', code: 'CS102', credits: 3, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[0].id, name: 'Digital Logic Design', code: 'CS103', credits: 3, lecturerId: lecturers[0].id }),
      
      // Year 2
      Subject.create({ yearId: csYears[1].id, name: 'Data Structures and Algorithms', code: 'CS201', credits: 4, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[1].id, name: 'Computer Networks', code: 'CS202', credits: 3, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[1].id, name: 'Database Management Systems', code: 'CS203', credits: 3, lecturerId: lecturers[0].id }),
      
      // Year 3
      Subject.create({ yearId: csYears[2].id, name: 'Software Engineering', code: 'CS301', credits: 4, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[2].id, name: 'Operating Systems', code: 'CS302', credits: 3, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[2].id, name: 'Machine Learning', code: 'CS303', credits: 3, lecturerId: lecturers[0].id }),
      
      // Year 4
      Subject.create({ yearId: csYears[3].id, name: 'Artificial Intelligence', code: 'CS401', credits: 4, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[3].id, name: 'Cloud Computing', code: 'CS402', credits: 3, lecturerId: lecturers[0].id }),
      Subject.create({ yearId: csYears[3].id, name: 'Project Management', code: 'CS403', credits: 3, lecturerId: lecturers[0].id })
    ]);

    // Create Subjects for Electronics
    const ecSubjects = await Promise.all([
      // Year 1
      Subject.create({ yearId: ecYears[0].id, name: 'Basic Electronics', code: 'EC101', credits: 4, lecturerId: lecturers[1].id }),
      Subject.create({ yearId: ecYears[0].id, name: 'Circuit Analysis', code: 'EC102', credits: 3, lecturerId: lecturers[1].id }),
      
      // Year 2
      Subject.create({ yearId: ecYears[1].id, name: 'Digital Electronics', code: 'EC201', credits: 4, lecturerId: lecturers[1].id }),
      Subject.create({ yearId: ecYears[1].id, name: 'Communication Systems', code: 'EC202', credits: 3, lecturerId: lecturers[1].id }),
      
      // Year 3
      Subject.create({ yearId: ecYears[2].id, name: 'Microprocessors', code: 'EC301', credits: 4, lecturerId: lecturers[1].id }),
      Subject.create({ yearId: ecYears[2].id, name: 'Signal Processing', code: 'EC302', credits: 3, lecturerId: lecturers[1].id }),
      
      // Year 4
      Subject.create({ yearId: ecYears[3].id, name: 'VLSI Design', code: 'EC401', credits: 4, lecturerId: lecturers[1].id }),
      Subject.create({ yearId: ecYears[3].id, name: 'Wireless Communication', code: 'EC402', credits: 3, lecturerId: lecturers[1].id })
    ]);

    // Create Subjects for Business Administration
    const baSubjects = await Promise.all([
      // Year 1
      Subject.create({ yearId: baYears[0].id, name: 'Principles of Management', code: 'BA101', credits: 3, lecturerId: lecturers[3].id }),
      Subject.create({ yearId: baYears[0].id, name: 'Business Mathematics', code: 'BA102', credits: 3, lecturerId: lecturers[3].id }),
      
      // Year 2
      Subject.create({ yearId: baYears[1].id, name: 'Marketing Management', code: 'BA201', credits: 3, lecturerId: lecturers[3].id }),
      Subject.create({ yearId: baYears[1].id, name: 'Financial Management', code: 'BA202', credits: 3, lecturerId: lecturers[3].id }),
      
      // Year 3
      Subject.create({ yearId: baYears[2].id, name: 'Strategic Management', code: 'BA301', credits: 3, lecturerId: lecturers[3].id }),
      Subject.create({ yearId: baYears[2].id, name: 'Human Resource Management', code: 'BA302', credits: 3, lecturerId: lecturers[3].id })
    ]);

    console.log('Subjects created for all programs');
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;

const { Program, Year, Subject, Lecturer } = require('../models');

// Get all programs with their complete structure
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll({
      include: [
        {
          model: Year,
          as: 'years',
          include: [
            {
              model: Subject,
              as: 'subjects',
              include: [
                {
                  model: Lecturer,
                  as: 'lecturer',
                  attributes: ['id', 'name', 'email', 'department', 'qualification', 'experience']
                }
              ],
              attributes: ['id', 'name', 'code', 'credits']
            }
          ],
          attributes: ['id', 'yearNumber']
        }
      ],
      attributes: ['id', 'name', 'description', 'duration'],
      order: [
        ['name', 'ASC'],
        [{ model: Year, as: 'years' }, 'yearNumber', 'ASC'],
        [{ model: Year, as: 'years' }, { model: Subject, as: 'subjects' }, 'name', 'ASC']
      ]
    });

    res.json({
      success: true,
      data: programs,
      count: programs.length
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching programs',
      error: error.message
    });
  }
};

// Get a specific program by ID with complete structure
exports.getProgramById = async (req, res) => {
  try {
    const { programId } = parseInt(req.params.programId);

    const program = await Program.findByPk(programId, {
      include: [
        {
          model: Year,
          as: 'years',
          include: [
            {
              model: Subject,
              as: 'subjects',
              include: [
                {
                  model: Lecturer,
                  as: 'lecturer',
                  attributes: ['id', 'name', 'email', 'department', 'qualification', 'experience']
                }
              ],
              attributes: ['id', 'name', 'code', 'credits']
            }
          ],
          attributes: ['id', 'yearNumber']
        }
      ],
      attributes: ['id', 'name', 'description', 'duration']
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching program',
      error: error.message
    });
  }
};

// Get years for a specific program
exports.getProgramYears = async (req, res) => {
  try {
    const { programId } = parseInt(req.params.programId);

    const program = await Program.findByPk(programId, {
      include: [
        {
          model: Year,
          as: 'years',
          attributes: ['id', 'yearNumber'],
          order: [['yearNumber', 'ASC']]
        }
      ],
      attributes: ['id', 'name']
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: {
        program: {
          id: program.id,
          name: program.name
        },
        years: program.years
      }
    });
  } catch (error) {
    console.error('Error fetching program years:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching program years',
      error: error.message
    });
  }
};

// Get subjects for a specific year
exports.getYearSubjects = async (req, res) => {
  try {
    const { yearId } = parseInt(req.params.yearId);

    const year = await Year.findByPk(yearId, {
      include: [
        {
          model: Program,
          as: 'program',
          attributes: ['id', 'name']
        },
        {
          model: Subject,
          as: 'subjects',
          include: [
            {
              model: Lecturer,
              as: 'lecturer',
              attributes: ['id', 'name', 'email', 'department', 'qualification', 'experience']
            }
          ],
          attributes: ['id', 'name', 'code', 'credits']
        }
      ],
      attributes: ['id', 'yearNumber']
    });

    if (!year) {
      return res.status(404).json({
        success: false,
        message: 'Year not found'
      });
    }

    res.json({
      success: true,
      data: {
        program: year.program,
        year: {
          id: year.id,
          yearNumber: year.yearNumber
        },
        subjects: year.subjects
      }
    });
  } catch (error) {
    console.error('Error fetching year subjects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching year subjects',
      error: error.message
    });
  }
};

// Get all lecturers
exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.findAll({
      include: [
        {
          model: Subject,
          as: 'subjects',
          attributes: ['id', 'name', 'code', 'credits'],
          include: [
            {
              model: Year,
              as: 'year',
              attributes: ['id', 'yearNumber'],
              include: [
                {
                  model: Program,
                  as: 'program',
                  attributes: ['id', 'name']
                }
              ]
            }
          ]
        }
      ],
      attributes: ['id', 'name', 'email', 'department', 'qualification', 'experience'],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: lecturers,
      count: lecturers.length
    });
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lecturers',
      error: error.message
    });
  }
};

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    const { name, description, duration } = req.body;

    const program = await Program.create({
      name,
      description,
      duration
    });

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: program
    });
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating program',
      error: error.message
    });
  }
};

// Create a new year for a program
exports.createYear = async (req, res) => {
  try {
    const programId = parseInt(req.body.programId);
    const yearNumber = parseInt(req.body.yearNumber);
    // Check if program exists
    const program = await Program.findByPk(programId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    const year = await Year.create({
      programId,
      yearNumber
    });

    res.status(201).json({
      success: true,
      message: 'Year created successfully',
      data: year
    });
  } catch (error) {
    console.error('Error creating year:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating year',
      error: error.message
    });
  }
};

// Create a new subject for a year
exports.createSubject = async (req, res) => {
  try {
    const yearId = parseInt(req.body.yearId);
    const lecturerId = req.body.lecturerId ? parseInt(req.body.lecturerId) : null;

    const { name, code, credits } = req.body;

    // Check if year exists
    const year = await Year.findByPk(yearId);
    if (!year) {
      return res.status(404).json({
        success: false,
        message: 'Year not found'
      });
    }

    // Check if lecturer exists (if provided)
    if (lecturerId) {
      const lecturer = await Lecturer.findByPk(lecturerId);
      if (!lecturer) {
        return res.status(404).json({
          success: false,
          message: 'Lecturer not found'
        });
      }
    }

    const subject = await Subject.create({
      yearId,
      name,
      code,
      credits,
      lecturerId
    });

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject
    });
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating subject',
      error: error.message
    });
  }
};

// Create a new lecturer
exports.createLecturer = async (req, res) => {
  try {
    const { name, email, department, qualification, experience } = req.body;

    const lecturer = await Lecturer.create({
      name,
      email,
      department,
      qualification,
      experience
    });

    res.status(201).json({
      success: true,
      message: 'Lecturer created successfully',
      data: lecturer
    });
  } catch (error) {
    console.error('Error creating lecturer:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating lecturer',
      error: error.message
    });
  }
};

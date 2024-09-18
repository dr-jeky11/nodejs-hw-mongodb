import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';

const port = env('PORT', '3000');

const startServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    res.status(200).json({
      data: student,
    });
  });

  app.listen(port, () => console.log(`Server running on ${port} Port`));
};

export default startServer;

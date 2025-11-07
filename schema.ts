import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  password,
  relationship,
  timestamp,
  select,
  image
} from '@keystone-6/core/fields';

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password({ validation: { isRequired: true } }),
    },
  }),

  Department: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      students: relationship({ ref: 'Student.department', many: true }),
      teachers: relationship({ ref: 'Teacher.department', many: true }),
    },
  }),

  Teacher: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ isIndexed: 'unique' }),
      department: relationship({ ref: 'Department.teachers' }),
      students: relationship({ ref: 'Student.mentor', many: true }),
    },
  }),

  Student: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      rollNumber: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      department: relationship({ ref: 'Department.students' }),

      semester: select({
        options: [
          { label: '1st Semester', value: 'sem1' },
          { label: '2nd Semester', value: 'sem2' },
          { label: '3rd Semester', value: 'sem3' },
          { label: '4th Semester', value: 'sem4' },
          { label: '5th Semester', value: 'sem5' },
          { label: '6th Semester', value: 'sem6' },
          { label: '7th Semester', value: 'sem7' },
          { label: '8th Semester', value: 'sem8' },
        ],
      }),

      mentor: relationship({ ref: 'Teacher.students' }),

      subjects: relationship({
        ref: 'Subject.students',
        many: true,
      }),

      profilePhoto: image({ storage: 'studentImages' }),

      joinedAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),

  Subject: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      code: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      students: relationship({ ref: 'Student.subjects', many: true }),
      teacher: relationship({ ref: 'Teacher' }),
      department: relationship({ ref: 'Department' }),
    },
  }),

  Mark: list({
    access: allowAll,
    graphql: {
    plural: 'AllMarks', 
  },
    fields: {
      student: relationship({ ref: 'Student', many: false }),
      subject: relationship({ ref: 'Subject', many: false }),
      examType: select({
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'Semester', value: 'semester' },
        ],
      }),
      score: text({ validation: { isRequired: true } }),
      date: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),

  Attendance: list({
    access: allowAll,
    fields: {
      student: relationship({ ref: 'Student', many: false }),
      status: select({
        options: [
          { label: 'Present', value: 'present' },
          { label: 'Absent', value: 'absent' },
        ],
      }),
      date: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),
};

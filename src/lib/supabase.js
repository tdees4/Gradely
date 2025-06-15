import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for common operations
export const auth = {
  signUp: (email, password) => 
    supabase.auth.signUp({ email, password }),
  
  signIn: (email, password) => 
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => 
    supabase.auth.signOut(),
  
  getCurrentUser: () => 
    supabase.auth.getUser()
}

// Database helpers
export const db = {
  // Semesters
  getSemesters: () =>
    supabase.from('semesters').select('*').order('year', { ascending: false }),
  
  addSemester: (semester) =>
    supabase.from('semesters').insert([semester]),
  
  // Courses
  getCourses: (semesterId) =>
    supabase.from('courses')
      .select('*')
      .eq('semester_id', semesterId)
      .order('name'),
  
  addCourse: (course) =>
    supabase.from('courses').insert([course]),
  
  updateCourse: (id, updates) =>
    supabase.from('courses').update(updates).eq('id', id),
  
  // Grade categories
  getCategories: (courseId) =>
    supabase.from('grade_categories')
      .select('*')
      .eq('course_id', courseId),
  
  addCategory: (category) =>
    supabase.from('grade_categories').insert([category]),
  
  // Assignments
  getAssignments: (categoryId) =>
    supabase.from('assignments')
      .select('*')
      .eq('category_id', categoryId)
      .order('due_date'),
  
  addAssignment: (assignment) =>
    supabase.from('assignments').insert([assignment])
}
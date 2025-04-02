export interface ContactFormData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

const STORAGE_KEY = 'portfolio_contact_submissions';

/**
 * Save a new contact form submission
 */
export const saveContactSubmission = (data: Omit<ContactFormData, 'id' | 'date'>): ContactFormData => {
  // Get existing submissions
  const existingData = getContactSubmissions();
  
  // Create new submission with unique ID and timestamp
  const newSubmission: ContactFormData = {
    ...data,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  
  // Add to existing data and save
  const updatedData = [newSubmission, ...existingData];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  
  return newSubmission;
};

/**
 * Get all contact submissions
 */
export const getContactSubmissions = (): ContactFormData[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    return [];
  }
  
  try {
    return JSON.parse(storedData) as ContactFormData[];
  } catch (error) {
    console.error('Error parsing contact submissions:', error);
    return [];
  }
};

/**
 * Get a single submission by ID
 */
export const getContactSubmissionById = (id: string): ContactFormData | null => {
  const allSubmissions = getContactSubmissions();
  return allSubmissions.find(submission => submission.id === id) || null;
};

/**
 * Delete a submission by ID
 */
export const deleteContactSubmission = (id: string): boolean => {
  const allSubmissions = getContactSubmissions();
  const filteredSubmissions = allSubmissions.filter(submission => submission.id !== id);
  
  if (filteredSubmissions.length === allSubmissions.length) {
    return false; // Nothing was deleted
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSubmissions));
  return true;
};

/**
 * Clear all contact submissions
 */
export const clearAllContactSubmissions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
}; 
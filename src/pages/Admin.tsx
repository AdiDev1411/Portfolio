import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import IconWrapper from '../components/IconWrapper';
import { 
  ContactFormData, 
  getContactSubmissions, 
  deleteContactSubmission, 
  clearAllContactSubmissions 
} from '../utils/contactService';

const AdminContainer = styled.div`
  padding: 120px 0 80px;
`;

const AdminSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  color: var(--text-secondary);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AdminPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.color || 'var(--primary-color)'};
  color: #000;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ContactName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const ContactDate = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const ContactDetails = styled.div`
  margin-top: 1rem;
`;

const ContactDetail = styled.div`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  span {
    font-weight: bold;
    color: var(--primary-color);
    margin-right: 0.5rem;
  }
`;

const ContactActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const NoData = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const Admin: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactFormData[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated]);
  
  const loadSubmissions = () => {
    const data = getContactSubmissions();
    setSubmissions(data);
  };
  
  const handleToggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteContactSubmission(id);
      loadSubmissions();
    }
  };
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) {
      clearAllContactSubmissions();
      loadSubmissions();
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demonstration purposes only - in a real application, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <AdminContainer>
        <AdminSection>
          <PageHeader>
            <PageTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Admin <span>Login</span>
            </PageTitle>
          </PageHeader>
          
          <AdminPanel
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleLogin}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormInput 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <ActionButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </ActionButton>
            </form>
          </AdminPanel>
        </AdminSection>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminSection>
        <PageHeader>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact <span>Submissions</span>
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View and manage all contact form submissions.
          </PageDescription>
        </PageHeader>
        
        <AdminPanel
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ButtonContainer>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => loadSubmissions()}
            >
              Refresh
            </ActionButton>
            
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearAll}
              color="#ff3d00"
              disabled={submissions.length === 0}
            >
              <IconWrapper icon={FaTrash} /> Clear All
            </ActionButton>
          </ButtonContainer>
          
          {submissions.length === 0 ? (
            <NoData>No contact submissions yet.</NoData>
          ) : (
            <ContactList>
              {submissions.map((submission) => (
                <ContactCard 
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactHeader>
                    <ContactName>{submission.name}</ContactName>
                    <ContactDate>{formatDate(submission.date)}</ContactDate>
                  </ContactHeader>
                  
                  <ContactDetail>
                    <span>Email:</span> {submission.email}
                  </ContactDetail>
                  
                  <ContactDetail>
                    <span>Subject:</span> {submission.subject || 'No subject'}
                  </ContactDetail>
                  
                  {expandedId === submission.id && (
                    <ContactDetails>
                      <ContactDetail>
                        <span>Message:</span>
                        <p>{submission.message}</p>
                      </ContactDetail>
                    </ContactDetails>
                  )}
                  
                  <ContactActions>
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleExpand(submission.id)}
                    >
                      {expandedId === submission.id ? (
                        <>
                          <IconWrapper icon={FaEyeSlash} /> Hide
                        </>
                      ) : (
                        <>
                          <IconWrapper icon={FaEye} /> View
                        </>
                      )}
                    </ActionButton>
                    
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(submission.id)}
                      color="#ff3d00"
                    >
                      <IconWrapper icon={FaTrash} /> Delete
                    </ActionButton>
                  </ContactActions>
                </ContactCard>
              ))}
            </ContactList>
          )}
        </AdminPanel>
      </AdminSection>
    </AdminContainer>
  );
};

// Reuse some styled components from Contact page
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const FormInput = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 180, 216, 0.2);
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff3d00;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

export default Admin; 
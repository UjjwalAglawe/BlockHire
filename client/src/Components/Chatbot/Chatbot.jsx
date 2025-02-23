import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// Define chatbot steps
const steps = [
    {
      id: '1',
      message: 'Hi! How can I assist you today?',
      trigger: 'options',
    },
    {
      id: 'options',
      options: [
        { value: 'signup', label: 'Sign Up as a Freelancer or Client', trigger: 'signup' },
        { value: 'hire', label: 'How to Hire a Freelancer', trigger: 'hire' },
        { value: 'process', label: 'Understand the Hiring Process', trigger: 'process' },
      ],
    },
    {
      id: 'signup',
      message: 'To sign up, go to the Sign Up page and select whether you are a Freelancer or Client.',
      trigger: 'ask-again',
    },
    {
      id: 'hire',
      message: 'You can browse freelancers in the "Freelancers" section. Select a profile to view their details.',
      trigger: 'ask-again',
    },
    {
      id: 'process',
      message: 'The hiring process includes finding a freelancer, discussing terms, and using our contract system for secure payments.',
      trigger: 'ask-again',
    },
    {
      id: 'ask-again',
      message: 'Do you have more questions?',
      trigger: 'options',
    },
  ];

// Chatbot theme
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#0078d7',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#0078d7',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Chatbot = () => (
  <ThemeProvider theme={theme}>
    <ChatBot steps={steps} floating={true} />
  </ThemeProvider>
);

export default Chatbot;

export const mockKpis = {
    totalChats: 1248,
    totalLeads: 86,
    responseRate: '98%',
    avgResponseTime: '2s'
};

export const mockChartData = [
    { name: 'Mon', chats: 120 },
    { name: 'Tue', chats: 132 },
    { name: 'Wed', chats: 148 },
    { name: 'Thu', chats: 168 },
    { name: 'Fri', chats: 192 },
    { name: 'Sat', chats: 216 },
    { name: 'Sun', chats: 238 },
];

export const mockRecentConversations = [
    { id: '1', visitor: 'Alice S.', status: 'resolved', preview: 'Thanks for the help, the billing issue is fixed now.', time: '10 mins ago' },
    { id: '2', visitor: 'Bob M.', status: 'lead', preview: 'I would like to schedule a demo of the enterprise plan.', time: '25 mins ago' },
    { id: '3', visitor: 'Visitor 8923', status: 'open', preview: 'Where can I find the API documentation?', time: '1 hour ago' },
    { id: '4', visitor: 'Sarah L.', status: 'resolved', preview: 'Perfect, that solved it!', time: '2 hours ago' },
    { id: '5', visitor: 'John D.', status: 'lead', preview: 'Can you have someone call me about pricing?', time: '3 hours ago' },
];

export const mockLeads = [
    { id: '1', name: 'Bob M.', email: 'bob@example.com', company: 'TechCorp', date: 'Today, 2:30 PM' },
    { id: '2', name: 'John D.', email: 'john@startup.io', company: 'Startup.io', date: 'Today, 10:15 AM' },
    { id: '3', name: 'Emma W.', email: 'emma@agency.co', company: 'Creative Agency', date: 'Yesterday' },
];

export const mockTrainingData = [
    { id: '1', type: 'website', title: 'Pricing Page', content: 'https://example.com/pricing', status: 'trained' },
    { id: '2', type: 'document', title: 'Refund Policy.pdf', content: 'We offer a 30-day money-back guarantee...', status: 'trained' },
    { id: '3', type: 'faq', title: 'How to reset password?', content: 'Go to settings > security > reset password.', status: 'trained' },
];

export const mockMessages = {
    '1': [
        { id: 1, role: 'user', content: 'Hi, I need help with my billing.' },
        { id: 2, role: 'assistant', content: 'Hello Alice! I can help with that. What seems to be the issue with your billing?' },
        { id: 3, role: 'user', content: 'I was charged twice for the pro plan.' },
        { id: 4, role: 'assistant', content: 'I see. I have processed a refund for the duplicate charge. It should appear in your account in 3-5 business days.' },
        { id: 5, role: 'user', content: 'Thanks for the help, the billing issue is fixed now.' },
    ],
    '2': [
        { id: 1, role: 'user', content: 'What features are in the enterprise plan?' },
        { id: 2, role: 'assistant', content: 'The Enterprise plan includes unlimited chatbots, custom API access, and dedicated support. Would you like to schedule a demo?' },
        { id: 3, role: 'user', content: 'I would like to schedule a demo of the enterprise plan.' },
    ],
    '3': [
        { id: 1, role: 'user', content: 'Where can I find the API documentation?' },
    ]
};

export const mockLeadsChartData = [
    { name: 'Mon', leads: 8 },
    { name: 'Tue', leads: 12 },
    { name: 'Wed', leads: 10 },
    { name: 'Thu', leads: 16 },
    { name: 'Fri', leads: 14 },
    { name: 'Sat', leads: 9 },
    { name: 'Sun', leads: 17 },
];

export const mockCommonQuestions = [
    { id: 1, text: "How do I reset my password?", count: 145 },
    { id: 2, text: "What is your refund policy?", count: 98 },
    { id: 3, text: "Do you offer an API?", count: 87 },
    { id: 4, text: "How to invite team members?", count: 64 },
    { id: 5, text: "Are there yearly limits?", count: 42 },
];

// This is a placeholder for email service
// Since you mentioned no auto emails, this can be used for template generation
// or integrated later if manual email sending is needed

exports.generateCredentialsEmail = (userEmail, userName, tempPassword) => {
    const subject = 'Your Account Credentials - Product Access System';
    
    const body = `
Dear ${userName},

Your account has been created successfully.

Here are your login credentials:
Email: ${userEmail}
Temporary Password: ${tempPassword}

Please login and change your password immediately.

Login URL: ${process.env.FRONTEND_URL}/login

Note: This is a system generated message. Please do not reply to this email.

Best regards,
Product Access System Team
    `;

    return { subject, body };
};

exports.generateAccessGrantedEmail = (userName, productName, countryName) => {
    const subject = 'Access Granted - Product Access System';
    
    const body = `
Dear ${userName},

Your access request has been approved.

You can now access: ${productName} - ${countryName}

Login to your account to view the document: ${process.env.FRONTEND_URL}/login

Note: This is a system generated message. Please do not reply to this email.

Best regards,
Product Access System Team
    `;

    return { subject, body };
};
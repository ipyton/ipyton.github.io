const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({origin: true});
const mailjet = require('node-mailjet');
const functions = require("firebase-functions");
const {defineSecret} = require('firebase-functions/params');
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Define secrets
const mailjetPublicKey = defineSecret('MAILJET_PUBLIC_KEY');
const mailjetPrivateKey = defineSecret('MAILJET_PRIVATE_KEY');

setGlobalOptions({ maxInstances: 10 });

// Rate limiting function
async function checkRateLimit(senderEmail) {
  const rateLimitRef = db.collection('rateLimits').doc(senderEmail);
  const rateLimitDoc = await rateLimitRef.get();
  
  const now = Date.now();
  const thirtySecondsAgo = now - 30000; // 30 seconds in milliseconds
  
  if (rateLimitDoc.exists) {
    const lastSent = rateLimitDoc.data().lastSent;
    
    if (lastSent > thirtySecondsAgo) {
      const waitTime = Math.ceil((lastSent - thirtySecondsAgo) / 1000);
      return {
        allowed: false,
        waitTime: waitTime
      };
    }
  }
  
  // Update the last sent timestamp
  await rateLimitRef.set({
    lastSent: now,
    email: senderEmail
  }, { merge: true });
  
  return { allowed: true };
}

exports.sendEmail = onRequest({ 
  region: "australia-southeast1",
  timeoutSeconds: 60,
  memory: "256MB",
  secrets: [mailjetPublicKey, mailjetPrivateKey] // Bind secrets to function
}, async (request, response) => {
  return cors(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const {
        sender,
        content,
        email,
        recipientEmail,
        recipientName = "Recipient",
        subject = 'Resume'
      } = request.body;

      // Validate required parameters
      if (!sender || !content || !email) {
        return response.status(400).json({
          error: 'Missing required parameters: sender, content, email'
        });
      }

      // Check rate limit
      try {
        const rateLimitResult = await checkRateLimit(email);
        if (!rateLimitResult.allowed) {
          logger.info("Rate limit exceeded", { 
            email, 
            waitTime: rateLimitResult.waitTime,
            structuredData: true 
          });
          return response.status(429).json({
            error: 'Rate limit exceeded',
            message: `Please wait ${rateLimitResult.waitTime} seconds before sending another email`,
            waitTime: rateLimitResult.waitTime
          });
        }
      } catch (rateLimitError) {
        logger.error("Rate limit check failed", { 
          error: rateLimitError.message,
          email,
          structuredData: true 
        });
        // Continue with email sending if rate limit check fails
      }

      // Initialize Mailjet client inside the function
      let client;
      try {
        const publicKey = mailjetPublicKey.value();
        const privateKey = mailjetPrivateKey.value();
        
        if (!publicKey || !privateKey) {
          throw new Error('Missing Mailjet API keys in environment variables');
        }
        
        client = mailjet.apiConnect(publicKey, privateKey);
        logger.info("Mailjet client initialized successfully");
      } catch (error) {
        logger.error("Failed to initialize Mailjet client", { error: error.message });
        return response.status(500).json({
          error: 'Email service not properly configured'
        });
      }

      // Get current time
      const currentTime = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Use recipientEmail if provided, otherwise use the sender's email as recipient
      const finalRecipientEmail = recipientEmail || email;

      logger.info("Preparing to send email", {
        sender,
        recipientEmail: finalRecipientEmail,
        structuredData: true
      });

      // Send email using Mailjet
      const result = await client
        .post("send", {'version': 'v3.1'})
        .request({
          Messages: [
            {
              From: {
                Email: process.env.FROM_EMAIL || "noreply@yourdomain.com",
                Name: process.env.FROM_NAME || "Your App Name"
              },
              To: [
                {
                  Email: finalRecipientEmail,
                  Name: recipientName
                }
              ],
              Subject: subject,
              HTMLPart: `
                <h1>
                  ${sender} Said: ${content}
                </h1>
                <div>
                  Date: ${currentTime}
                </div>
                <div>
                  Sender Email: ${email}
                </div>
              `,
              TextPart: `
                ${sender} Said: ${content}
                
                Date: ${currentTime}
                Sender Email: ${email}
              `
            }
          ]
        });

      logger.info("Email sent successfully", {
        messageId: result.body.Messages[0].To[0].MessageID,
        structuredData: true
      });

      response.status(200).json({
        success: true,
        message: 'Email sent successfully',
        messageId: result.body.Messages[0].To[0].MessageID
      });

    } catch (error) {
      logger.error("Error sending email", {error: error.message, stack: error.stack, structuredData: true});
      
      response.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: error.message
      });
    }
  });
});

exports.sendEmailWithTemplate = onRequest({ 
  region: "australia-southeast1",
  timeoutSeconds: 60,
  memory: "256MB",
  secrets: [mailjetPublicKey, mailjetPrivateKey] // Bind secrets to function
}, async (request, response) => {
  return cors(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const {
        sender,
        content,
        email,

      } = request.body;
        const recipientEmail = "czh1278341834@gmail.com"
        const recipientName = "Noah"
        const templateId = 7102947
        const subject = 'New Message'

      if (!sender || !content || !email) {
        return response.status(400).json({
          error: 'Missing required parameters: sender, content, email'
        });
      }

      // Check rate limit
      try {
        const rateLimitResult = await checkRateLimit(email);
        if (!rateLimitResult.allowed) {
          logger.info("Rate limit exceeded for template email", { 
            email, 
            waitTime: rateLimitResult.waitTime,
            structuredData: true 
          });
          return response.status(429).json({
            error: 'Rate limit exceeded',
            message: `Please wait ${rateLimitResult.waitTime} seconds before sending another email`,
            waitTime: rateLimitResult.waitTime
          });
        }
      } catch (rateLimitError) {
        logger.error("Rate limit check failed for template email", { 
          error: rateLimitError.message,
          email,
          structuredData: true 
        });
        // Continue with email sending if rate limit check fails
      }

      // Initialize Mailjet client inside the function
      let client;
      try {
        const publicKey = mailjetPublicKey.value();
        const privateKey = mailjetPrivateKey.value();
        
        if (!publicKey || !privateKey) {
          throw new Error('Missing Mailjet API keys in environment variables');
        }
        
        client = mailjet.apiConnect(publicKey, privateKey);
        logger.info("Mailjet client initialized successfully");
      } catch (error) {
        logger.error("Failed to initialize Mailjet client", { error: error.message });
        return response.status(500).json({
          error: 'Email service not properly configured'
        });
      }

      const currentTime = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      logger.info("Preparing to send email with template", {
        templateId,
        sender,
        recipientEmail,
        structuredData: true
      });

      // Send email using Mailjet template
      const result = await client
        .post("send", {'version': 'v3.1'})
        .request({
          Messages: [
            {
              From: {
                Email: process.env.FROM_EMAIL || "noreply@vydeo.xyz",
                Name: process.env.FROM_NAME || "Queries"
              },
              To: [
                {
                  Email: recipientEmail,
                  Name: recipientName
                }
              ],
              Subject: subject,
              TemplateID: parseInt(templateId),
              TemplateLanguage: true,
              Variables: {
                sender: sender,
                content: content,
                time: currentTime,
                email: email
              }
            }
          ]
        });

      logger.info("Email sent successfully with template", {
        messageId: result.body.Messages[0].To[0].MessageID,
        templateId,
        structuredData: true
      });

      response.status(200).json({
        success: true,
        message: 'Email sent successfully with template',
        messageId: result.body.Messages[0].To[0].MessageID
      });

    } catch (error) {
      logger.error("Error sending email with template", {error: error.message, stack: error.stack, structuredData: true});
      
      response.status(500).json({
        success: false,
        error: 'Failed to send email with template',
        details: error.message
      });
    }
  });
});
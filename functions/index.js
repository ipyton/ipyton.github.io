const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({origin: true});
const mailjet = require('node-mailjet');
const functions = require("firebase-functions");


const { public_key, private_key } = functions.config().mailjet;

const client = mailjet.apiConnect(
  public_key,
  private_key
);


setGlobalOptions({ maxInstances: 10 });

exports.sendEmail = onRequest(  { region: "australia-southeast1" },async (request, response) => {
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
        recipientName = 'User',
        subject = 'New Message'
      } = request.body;

      // 验证必需参数
      if (!sender || !content || !email || !recipientEmail) {
        return response.status(400).json({
          error: 'Missing required parameters: sender, content, email, recipientEmail'
        });
      }

      // 获取当前时间
      const currentTime = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      logger.info("Preparing to send email", {
        sender,
        recipientEmail,
        structuredData: true
      });

      // 使用 Mailjet 发送邮件
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
                  Email: recipientEmail,
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
      logger.error("Error sending email", {error: error.message, structuredData: true});
      
      response.status(500).json({
        success: false,
        error: 'Failed to send email',
        details: error.message
      });
    }
  });
});

// 使用 Mailjet 模板发送邮件的函数
exports.sendEmailWithTemplate = onRequest(  { region: "australia-southeast1" }, async (request, response) => {
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
        recipientName = 'User',
        templateId=7102947,
        subject = 'New Message'
      } = request.body;

      if (!sender || !content || !email || !recipientEmail || !templateId) {
        return response.status(400).json({
          error: 'Missing required parameters: sender, content, email, recipientEmail, templateId'
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

      // 使用 Mailjet 模板发送邮件
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
      logger.error("Error sending email with template", {error: error.message, structuredData: true});
      
      response.status(500).json({
        success: false,
        error: 'Failed to send email with template',
        details: error.message
      });
    }
  });
});


import twilio from "twilio";

/**
 * Twilio Verify Service - Send & Check OTP via SMS
 * Uses Twilio Verify API which handles OTP generation, delivery & expiry automatically.
 */

let twilioClient = null;

const getTwilioClient = () => {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      console.warn("⚠️  Twilio credentials not found. SMS will fallback to dev console mode.");
      return null;
    }

    twilioClient = twilio(accountSid, authToken);
  }
  return twilioClient;
};

/**
 * Send OTP to a phone number via Twilio Verify Service
 * @param {string} phone - 10-digit Indian mobile number
 * @returns {{ success: boolean, message: string }}
 */
export const sendOtpViaTwilio = async (phone) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;
  const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
  const client = getTwilioClient();

  if (!client || !verifySid) {
    // Dev fallback: generate a random 4-digit OTP locally
    const devOtp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`📲 [DEV MODE] OTP for ${formattedPhone}: ${devOtp}`);
    return { success: true, provider: "dev", devOtp };
  }

  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({
        to: formattedPhone,
        channel: "sms",
      });

    console.log(`✅ [Twilio Verify] OTP sent to ${formattedPhone} | Status: ${verification.status}`);
    return { success: true, provider: "twilio", status: verification.status };
  } catch (err) {
    console.error("❌ [Twilio Verify] Send OTP Error:", err.message);
    throw new Error(err.message || "Failed to send verification SMS");
  }
};

/**
 * Verify the OTP entered by the user via Twilio Verify Service
 * @param {string} phone - 10-digit Indian mobile number
 * @param {string} code  - 4-6 digit OTP code entered by user
 * @returns {{ success: boolean, valid: boolean }}
 */
export const checkOtpViaTwilio = async (phone, code) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;
  const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
  const client = getTwilioClient();

  if (!client || !verifySid) {
    // Dev mode: can't verify, return error
    return { success: false, valid: false, provider: "dev" };
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: formattedPhone,
        code: code.toString().trim(),
      });

    const isApproved = verificationCheck.status === "approved";
    console.log(`${isApproved ? "✅" : "❌"} [Twilio Verify] Check for ${formattedPhone}: ${verificationCheck.status}`);
    return { success: true, valid: isApproved, status: verificationCheck.status };
  } catch (err) {
    console.error("❌ [Twilio Verify] Check OTP Error:", err.message);
    return { success: false, valid: false, message: err.message };
  }
};

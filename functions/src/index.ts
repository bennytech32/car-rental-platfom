// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Regex ya kudaka namba za simu (tarakimu 7 au zaidi mfululizo/zilizotenganishwa) na Links/URLs
const PHONE_REGEX = /(\b\d[\d\s\-\.]{6,}\b)/g;
const URL_REGEX = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/g;
const SOCIAL_MEDIA_WORDS = /(whatsapp|instagram|ig|facebook|fb|telegram|twitter|x)/gi;

export const chatMasker = functions.firestore
    .document('messages/{messageId}')
    .onCreate(async (snap: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => {
        const messageData = snap.data();
        let originalText = messageData.text;

        if (!originalText) return null;

        // Ficha Namba za Simu, Links, na Maneno ya Social Media
        let maskedText = originalText
            .replace(PHONE_REGEX, '*******')
            .replace(URL_REGEX, '[LINK REMOVED]')
            .replace(SOCIAL_MEDIA_WORDS, '*******');

        // Kama meseji imebadilishwa, update database na irekodi kwenye -Events
        if (originalText !== maskedText) {
            const db = admin.firestore();

            // Update the message document
            await snap.ref.update({
                text: maskedText,
                isMasked: true,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // Rekodi hili tukio (Security breach attempt) kwenye -Events
            await db.collection('-Events').add({
                action: 'CHAT_MASKING_TRIGGERED',
                details: {
                    originalText: originalText,
                    senderId: messageData.senderId,
                    bookingId: messageData.bookingId,
                },
                userId: 'system',
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
        }

        return null;
    });
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
  source: string;
}

export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Check if email already exists
    const q = query(
      collection(db, "newsletter-subscribers"),
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "This email is already subscribed to our newsletter.",
      };
    }

    // Add new subscription
    const docRef = await addDoc(collection(db, "newsletter-subscribers"), {
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      source: "website",
      isActive: true,
    });

    console.log("Newsletter subscription added with ID: ", docRef.id);

    return {
      success: true,
      message:
        "Thank you for subscribing! You'll receive updates about new insights.",
    };
  } catch (error) {
    console.error("Error adding newsletter subscription: ", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

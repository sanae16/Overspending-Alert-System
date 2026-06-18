/**
 * PIN Validation Service
 * Handles PIN verification with backend API
 */

interface PinValidationResponse {
  success: boolean
  message: string
}

/**
 * Validates user PIN against backend
 * Should be called from a secure context with proper authentication
 */
export async function validatePinWithBackend(
  pin: string,
  userId?: string
): Promise<boolean> {
  try {
    // In production, this should call your backend API endpoint
    // Example: POST /api/auth/validate-pin
    const response = await fetch("/api/auth/validate-pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include auth cookies
      body: JSON.stringify({
        pin,
        userId, // Optional: pass user ID if needed
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error("PIN validation failed:", response.statusText)
      return false
    }

    const data: PinValidationResponse = await response.json()
    return data.success
  } catch (error) {
    console.error("Error validating PIN:", error)
    return false
  }
}

/**
 * Optional: Client-side PIN validation for local testing
 * WARNING: This is NOT secure for production use
 * Always validate PIN on the backend
 */
export function validatePinLocally(pin: string, storedPin: string): boolean {
  if (!pin || !storedPin) return false
  // This is just for demo/testing - NEVER store plain PINs in production
  return pin === storedPin
}

/**
 * Session-based PIN validation
 * Tracks if user has already validated their PIN in this session
 */
class PinSessionManager {
  private sessionKey = "pin_verified_timestamp"
  private sessionTimeout = 30 * 60 * 1000 // 30 minutes in milliseconds

  isValidatedInSession(): boolean {
    if (typeof window === "undefined") return false

    const timestamp = sessionStorage.getItem(this.sessionKey)
    if (!timestamp) return false

    const elapsed = Date.now() - parseInt(timestamp, 10)
    if (elapsed > this.sessionTimeout) {
      sessionStorage.removeItem(this.sessionKey)
      return false
    }

    return true
  }

  markAsValidated(): void {
    if (typeof window === "undefined") return
    sessionStorage.setItem(this.sessionKey, Date.now().toString())
  }

  clearValidation(): void {
    if (typeof window === "undefined") return
    sessionStorage.removeItem(this.sessionKey)
  }

  getTimeRemaining(): number {
    if (typeof window === "undefined") return 0

    const timestamp = sessionStorage.getItem(this.sessionKey)
    if (!timestamp) return 0

    const elapsed = Date.now() - parseInt(timestamp, 10)
    const remaining = this.sessionTimeout - elapsed

    return remaining > 0 ? remaining : 0
  }
}

export const pinSessionManager = new PinSessionManager()

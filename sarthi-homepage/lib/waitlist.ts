import { supabase, type WaitlistEntry } from "./supabase"

export async function addToWaitlist(data: Omit<WaitlistEntry, "id" | "created_at" | "updated_at">) {
  try {
    const { data: result, error } = await supabase.from("waitlist").insert([data]).select().single()

    if (error) {
      // Handle duplicate email error gracefully
      if (error.code === "23505") {
        return {
          success: false,
          error: "This email is already on our waitlist!",
        }
      }
      throw error
    }

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error("Error adding to waitlist:", error)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

export async function getWaitlistCount() {
  try {
    const { count, error } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

    if (error) throw error

    return { success: true, count: count || 0 }
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return { success: false, count: 0 }
  }
}

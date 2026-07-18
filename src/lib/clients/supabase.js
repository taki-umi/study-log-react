import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  // import.meta.env.SUPABASE_URL,
  // import.meta.env.SUPABASE_PUBLISHABLE_KEY,
  "https://hzkrfdqsnmsnvtzgduzq.supabase.co",
  "sb_publishable_S03rpWw2jVvo88T7eJSs4Q_CfZKbayk",
)

export const getAllTodos = async () => {
  const todos = await supabase.from("study-record").select("*")
  return todos.data
}

import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)

export const getAllTodos = async () => {
  const { data, error } = await supabase.from("study-record").select("*")
  if (error) {
    console.log("getAllTodos error: ", error)
    return []
  }
  return data
}

export const insertTodo = async (title, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert({ title: title, time: time })
  if (error) {
    console.log(error)
  }
  return data
}

export const deleteTodo = async (id) => {
  const { data, error } = await supabase
    .from("study-record")
    .delete()
    .eq("id", id)
  return data
}

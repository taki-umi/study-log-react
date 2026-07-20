import { useEffect, useState } from "react"

import { deleteTodo, getAllTodos, insertTodo } from "./lib/clients/supabase"

export const App = () => {
  const [records, setRecords] = useState([])
  const [title, setTitle] = useState("")
  const [studyTime, setStudyTime] = useState(0)
  const [totalStudyTime, setTotalStudyTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // 初回表示時処理
  useEffect(() => {
    const fethchTodos = async () => {
      setIsLoading(true)
      const todos = await getAllTodos()
      setRecords(todos)
      setIsLoading(false)
    }
    fethchTodos()
  }, [])

  // 合計学習時間再計算
  useEffect(() => {
    const preIntTime = records.map((r) => parseInt(r.time))
    setTotalStudyTime(preIntTime.reduce((pre, cur) => pre + cur, 0))
  }, [records])

  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeStudyTitle = (e) => setStudyTime(e.target.value)

  const onClickAdd = async () => {
    if (title === "" || studyTime <= 0) {
      setError("入力されていない項目があります。")
      return
    }
    const addTodo = await insertTodo(title, studyTime)
    const newTodos = [...records, ...addTodo]
    setRecords(newTodos)
    setTitle("")
    setStudyTime(0)
    setError("")
  }

  const onClickRemove = async (id) => {
    const deleteTodoId = await deleteTodo(id)
    console.log(deleteTodoId)
    const newTodos = records.filter((todo) => todo.id !== id)
    setRecords(newTodos)
  }

  const [error, setError] = useState("")

  return (
    <>
      <h1>学習記録一覧</h1>
      {isLoading ? (
        <div>
          <p>ロード中</p>
        </div>
      ) : (
        <>
          <div>
            学習時間
            <input
              onChange={onChangeTitle}
              placeholder="学習内容"
              value={title}
            />
          </div>
          <div>
            学習時間
            <input
              type="number"
              onChange={onChangeStudyTitle}
              placeholder="学習時間"
              value={studyTime}
            />
          </div>
          <div>
            <p>入力されている学習内容：{title}</p>
            <p>入力されている学習時間：{studyTime}時間</p>
          </div>
          {records.map((record, index) => (
            <div
              key={record.id + index}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>
                {record.title} {record.time}時間
              </p>
              <button
                onClick={() => onClickRemove(record.id)}
                style={{ marginLeft: "8px", padding: "4px 8px" }}
              >
                削除
              </button>
            </div>
          ))}
          <button onClick={onClickAdd}>登録</button>
          <p>合計時間：{totalStudyTime} / 1000(h)</p>
          {error !== "" && <p>{error}</p>}
        </>
      )}
    </>
  )
}

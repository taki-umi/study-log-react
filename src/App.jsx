import { useEffect, useState } from "react"

import { getAllTodos, insertTodo } from "./lib/clients/supabase"

export const App = () => {
  const [records, setRecords] = useState([])
  const [title, setTitle] = useState("")
  const [studyTime, setStudyTime] = useState(0)
  const [totalStudyTime, setTotalStudyTime] = useState(0)

  // 初回表示時処理
  useEffect(() => {
    fethchTodos()
  }, [])

  const fethchTodos = async () => {
    const todos = await getAllTodos()
    if (todos) {
      setRecords(
        todos.map((t) => {
          return {
            title: t.title,
            time: t.time,
          }
        }),
      )

      const preIntTime = todos.map((r) => parseInt(r.time))
      setTotalStudyTime(preIntTime.reduce((pre, cur) => pre + cur, 0))
    }
  }

  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeStudyTitle = (e) => setStudyTime(e.target.value)

  const onClickAdd = () => {
    if (title === "" || studyTime <= 0) {
      setError("入力されていない項目があります。")
      return
    }
    addTodo(title, studyTime)
    const newRecords = [...records, { title: title, time: studyTime }]
    setRecords(newRecords)
    setTitle("")
    setStudyTime(0)
    setError("")

    setTotalStudyTime(() => {
      const newTotalTimes = [...newRecords.map((r) => parseInt(r.time))]
      return newTotalTimes.reduce((pre, cur) => pre + cur, 0)
    })
  }

  const addTodo = async (title, studyTime) => {
    insertTodo(title, studyTime)
  }

  const [error, setError] = useState("")

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        学習時間
        <input onChange={onChangeTitle} placeholder="学習内容" value={title} />
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
        <div key={record.title + index}>
          <p>
            {record.title} {record.time}時間
          </p>
        </div>
      ))}
      <button onClick={onClickAdd}>登録</button>
      <p>合計時間：{totalStudyTime} / 1000(h)</p>
      {error !== "" && <p>{error}</p>}
    </>
  )
}

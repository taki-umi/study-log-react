import { useEffect, useState } from "react"

import { getAllTodos } from "./lib/clients/supabase"

export const App = () => {
  // TODO: 仮テストデータ、Supabase接続後に削除
  const testRecords = [
    {
      id: 1,
      title: "React学習",
      time: 10,
    },
    {
      id: 2,
      title: "英語",
      time: 2,
    },
    {
      id: 3,
      title: "筋トレ座学",
      time: 4,
    },
  ]

  useEffect(() => {
    const todos = getAllTodos()
    console.log(todos)
  }, [])

  const [records, setRecords] = useState(testRecords)
  const [title, setTitle] = useState("")
  const [studyTime, setStudyTime] = useState(0)
  const [totalStudyTime, setTotalStudyTime] = useState(() => {
    const preIntTime = testRecords.map((r) => parseInt(r.time))
    return preIntTime.reduce((pre, cur) => pre + cur, 0)
  })

  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeStudyTitle = (e) => setStudyTime(e.target.value)

  const onClickAdd = () => {
    if (title === "" || studyTime <= 0) {
      setError("入力されていない項目があります。")
      return
    }
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

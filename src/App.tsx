import { SocketData } from './interfaces/Response';
import './App.css';
import Chatinput from './components/chat';
import { useEffect, useState } from 'react';

const ws = new WebSocket("ws://localhost:8080")

ws.onopen = (event) => {
  ws.send("hey server");
};

const App: React.FC = () => {

  const [name, setName] = useState<string>("")
  const [namesat, setNameSat] = useState<boolean>(false)
  const [data, setData] = useState<string>("")
  const [textList, setTextList] = useState<Array<SocketData>>([])

  ws.onmessage = function (event: any) {
    console.log(JSON.parse(event.data));

    const messageData: SocketData = JSON.parse(JSON.parse(event.data))

    setTextList(arr => [...arr, messageData])
  }

  function updatedata(tekst: string): void {
    setData(tekst)
  }

  function webSocketData(e: React.FormEvent<HTMLFormElement>, text: string): void {
    e.preventDefault()
    console.log(text);

    const toWebServer = { text, Client: name }

    ws.send(JSON.stringify(toWebServer))
    setData("")
  }

  const chatText = textList.map((item) => {
    return (
      <p key={item.Client}>{item.text} fra {item.Client}</p>
    )
  })

  function typedName(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setNameSat(true)
  }

  const nameSet = namesat ? (
    <div>
      <h4>your name is {name}</h4>
      <div>
        {chatText}
      </div>
      <Chatinput tekstdata={data} updatedata={updatedata} webSocketData={webSocketData} />
    </div>
  )
    : (
      <form onSubmit={e => typedName(e)}>
        <input onChange={e => setName(e.target.value)} placeholder="Name"></input>
      </form>
    )


  return (
    <div className="App">
      <header className="App-header">
        <p>Chatapp</p>
      {nameSet}
      </header>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { useState } from "react";

interface IProps {
    tekstdata: string
    updatedata: (args: string) => void
    webSocketData: (e: React.FormEvent<HTMLFormElement> , tekst:string) => void
}

const Chatinput: React.FC<IProps> = ({ tekstdata, updatedata, webSocketData }) => {
    const [data, setdata] = useState<string>("")

    useEffect(() => {
        setdata(tekstdata)
    }, [tekstdata])

    return (
        <div>
            <form onSubmit={e => webSocketData(e, data)}>
            <input value={data} onChange={e => updatedata((e.target as HTMLInputElement).value)}  placeholder="Skrive her"></input>
            </form>
        </div>
    )
}

export default Chatinput;

import { useEffect, useState } from 'react'
import {io, Socket} from 'socket.io-client'
export const StartSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        const test = io('http://localhost:5001')
        setSocket(test)
        test.on('connect', () => {
            console.log('connected')
        })
    }, [])
    function SendHello() {
        socket!.emit("hello")
    }
    
    function Disconnect() {
        socket!.disconnect()
    }
    return {SendHello}
}
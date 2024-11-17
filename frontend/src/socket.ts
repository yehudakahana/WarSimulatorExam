import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const connectWebSocket = () => {
  socket = io('http://localhost:5001'); 

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
  });

  socket.on('connect_error', (err) => {
    console.error('Connection failed:', err);
  });

  socket.on('reconnect_attempt', () => {
    console.log('Attempting to reconnect...');
  });
};

export const emitUserDetails = (data: any) => {
  socket.emit('userDetails', data);
}
export const onMissilesData = (callback: (data: any) => void) => {
  socket.on('missilesData', callback);
};


export const onRocketIntercepted = (callback: (data: any) => void) => {
  socket.on('rocketIntercepted', callback);
};

export const launchRocket = (data: any) => {
  socket.emit('launchRocket', data);
};

export const onRocketLaunched = (callback: (data: any) => void) => {
  socket.on('rocketLaunched', callback);
};

export const interceptRocket = (data: any) => {
  socket.emit('interceptRocket', data);
};







// import { useEffect, useState } from 'react'
// import {io, Socket} from 'socket.io-client'
// export const StartSocket = () => {
//     const [socket, setSocket] = useState<Socket | null>(null)
//     useEffect(() => {
//         const test = io('http://localhost:5001')
//         setSocket(test)
//         test.on('connect', () => {
//             console.log('connected')
//         })
//     }, [])
//     function SendHello() {
//         socket!.emit("hello")
//     }
    
//     function Disconnect() {
//         socket!.disconnect()
//     }
//     return {SendHello}
// }
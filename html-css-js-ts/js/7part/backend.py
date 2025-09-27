from fastapi import FastAPI,WebSocket

app=FastAPI()

active_connections=[]

@app.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept() #alguien se conecta
    active_connections.append(websocket) #añade el cliente

    try:
        while True:
            message=await websocket.receive_text() #el cliente envia msg a otros clientes
            #enviar msg a otros clientes
            for connection in active_connections:
                if connection != websocket:
                    await connection.send_text(message)

    finally:
        active_connections.remove(websocket) #elimina el cliente que se fue
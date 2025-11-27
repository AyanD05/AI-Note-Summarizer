from ollama import chat, ChatResponse
from flask import Flask,request,jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

@app.route("/ai",methods=["GET","POST"])

def ai():
    if request.method=="POST":
        notes=request.get_json() #converts it to a dictionary
        if notes and "notes" in notes: # checks if notes key is present in that dictionary
            response: ChatResponse=chat(model="llama3",messages=[
                {
                    'role':'user',
                    'content':f'ONLY Return With Summarized Notes:{notes}'
                }
            ])
            if response:
                return jsonify(response.message.content)
            
if __name__=="__main__":
    app.run(debug=True)
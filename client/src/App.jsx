import { useState } from 'react'
import './App.css'

function App() {
  const [notes,setNotes]=useState("");
  const [summarizedNotes,setSummarizedNotes]=useState(null);
  async function generateAINotes() {
    setSummarizedNotes("Summarizing...");
    const response=await fetch("http://localhost:5000/ai",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({notes:notes})
    });

    if(response.ok){
      const data=await response.json();
      setSummarizedNotes(data);
    }
  }
  return(
    <>
    <div>
      <h3>AI Notes Summarizer</h3>
      <textarea onChangeCapture={(e)=>{
        setNotes(e.target.value);
      }}
      rows={25}
      cols={50}> 

      </textarea>
      <br />
      <button onClick={generateAINotes}>Summarize Notes</button>
      <div>
        {summarizedNotes!=null?(<p>{summarizedNotes}</p>):null}
      </div>
    </div>
    </>
  )
}

export default App
